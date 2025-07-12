from langchain.prompts import PromptTemplate
from pinecone_db import knowledge_base
from langchain.memory import ConversationBufferMemory
from langchain.agents import AgentExecutor, Tool,  create_react_agent
from langchain.llms.base import LLM
import requests
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s' 
)
logger = logging.getLogger(__name__)


## LLM Wrapper for Ollama
class CustomOllamaLLM(LLM):
    #Custom Langchain wrapper for interacting with a local Ollama server
    model_name : str = "tinyllama"
    ollama_url : str= "http://localhost:11434/api/generate"

    generation_options: dict = {
        "temperature" : 0.0,
        "top_p": 0.1,
        "stop": ["\nObservation:", "\nFinal Answer:"],
        "repeat_penalty": 1.1,
        "n_predict":512
    }

    @property
    def _llm_type(self) -> str:
        return "custom_ollama"
    
    def _call(self, prompt: str, stop=None) -> str:
        #Make a call to the Ollama API to generate a response

        payload = {
            "model" : self.model_name,
            "prompt": prompt,
            "stream" : False,
            "options": self.generation_options
        }
        if stop is not None:
            if "stop" in payload["options"]:
                payload["options"]["stop"].extend(stop)
            else:
                payload["options"]["stop"] = stop

        try:
            response = requests.post(self.ollama_url, json=payload)
            response.raise_for_status() # Raise an exception for HTTP errors
            result = response.json()
            return result.get('response', 'No response generated.')
        except requests.exceptions.RequestException as e:
            logger.error(f"Error calling Ollama API for model '{self.model_name}': {e}", exc_info=True)
            return f"Error: Could not connect to Ollama or generate response. {e}"
        except Exception as e:
            logger.error(f"An unexpected error occurred during Ollama call for model: {self.model_name} : {e}")
            return f"Error: An unexpected error occurred during response generation. --> {e}"



#Prompt template for the RAG direct answers
RAG_TOOL_PROMPT_TEMPLATE = """

Extract the exact answer from the restaurant information below.

Restaurant Information:
{context}

Question: {question}
Provide only the direct answer. For location: give the full address. For hours: give exact times. For reservations: list the steps. Be DIRECT and MINIMIZE PROVIDING UNNECESSARY INFORMATION. ANSWER WHAT IS ASKED, DIRECTLY AND AS STRAIGHTFORWARD AS POSSIBLE. DON'T SHOW THE CHAT DIALOGUE, JUST PROVIDE THE ANSWER, NOTHING MORE, NOTHING LESS!

Answer:
"""


RAG_TOOL_PROMPT = PromptTemplate(template=RAG_TOOL_PROMPT_TEMPLATE, input_variables=["context", "question"])

#Prompt template for the agent

AGENT_PROMPT_TEMPLATE = """
You are an AI assistant.
You have access to the following tools:
{tools}

Use the following format:

Question: the input question you must answer
Thought: You must always think step-by-step about what to do next.
Action: the action to take, should be one of [{tool_names}]
Action Input: the input to the action
Observation: the result of the action
... (this Thought/Action/Action Input/Observation can repeat multiple times if needed)
Thought: I now know the final answer.
Final Answer: the final answer to the original input question.

Begin!

Previous conversation history:
{history}

Question: {input}
Thought:{agent_scratchpad}
"""

##This is where the tools are built

try:
    rag_tool_llm = CustomOllamaLLM(model_name="tinyllama", generation_options={"temperature": 0.0, "top_p": 0.1, "repeat_penalty": 1.1})
    agent_llm = CustomOllamaLLM(model_name="tinyllama", generation_options={"temperature": 0.0, "top_p": 0.1, "repeat_penalty": 1.1, "n_predict": 50})
    logger.info("Ollama LLM instances (rag_tool_llm, agent_ll) initialized.")
except Exception as e:
    logger.error(f"Failed to initialize Ollama LLM instances: {e}", exc_info=True)



def get_restaurant_info(query: str) -> str:
    """
    Answers questions about 2000 Habesha Cultural Restaurant using its knowledge base.
    This tool should be used for any question related to the restaurant's location,
    opening hours, menu, reservations, student discounts, unique features, contact info, etc.
    Input should be the user's question.
    """
    try:
        data = knowledge_base.similarity_search(query=query, k=1)
        if not data:
            logger.warning(f"No relevant documents found in knowledge base for query: {query}")
        context_parts = []
        source_info = []
        for doc in data:
            context_parts.append(doc.page_content)
            if doc.metadata and 'source' in doc.metadata:
                source_info.append(f"Source: {doc.metadata['source']}")
            
        context = "\n".join(context_parts)
        if source_info:
            context += "\n\n" + "\n".join(source_info)
        final_prompt_for_tool = RAG_TOOL_PROMPT.format(context=context, question=query)

        #Calling the LLM with the formatted prompt for rag tool
        response_from_tool_llm = rag_tool_llm._call(final_prompt_for_tool)
        return response_from_tool_llm
    except Exception as e:
        logger.error(f"Error during loading restaurant details. \n{e}")
        return f"An error occurred while retrieving restaurant information. \n{e}"


#Creating a tool
try:
    tools = [
        Tool(
            name="Restaurant Information",
            func=get_restaurant_info,
            description="""
            Useful for answering questions about 2000 Habesha Cultural Restaurant.
            This includes questions about its location, opening hours, menu items, prices,
            reservation process, student discount policy, unique features, contact details,
            and general information about the restaurant.
            Input should be the specific question the user is asking about the restaurant.
            """
        )

    ]
    logger.info("Langchain tools initialized successfully")
except Exception as e:
    logger.error("Failed to initialize Langchain tools, \n{e}")

def initialize_chatbot_agent() -> AgentExecutor:
    # Initializes and returns a LangChain AgentExecutioner for the chatbot.
    try:
        session_memory = ConversationBufferMemory(memory_key="history", return_messages=True)
        session_agent_prompt = PromptTemplate.from_template(AGENT_PROMPT_TEMPLATE)
        session_agent = create_react_agent(agent_llm, tools, session_agent_prompt)
        session_executor = AgentExecutor(
            agent=session_agent,
            tools=tools,
            memory=session_memory,
            verbose=True,
            handle_parsing_errors=True
        )
        logger.info("Chatbot AgentExecutor initialized for new session")
        return session_executor
    except Exception as e:
        logger.error(f"Failed to initialize chatbot agent. \n{e}", exc_info=True)
        raise RuntimeError(f"Could not create chatbot agent. \n{e}")

