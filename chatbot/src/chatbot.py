from langchain.prompts import PromptTemplate
from pinecone_db import knowledge_base
import requests
import json
query = "Where is the restaurant located?"

data = knowledge_base.similarity_search(query=query, k=3)
# print("Result:", data)

# prompt_template = """
# Context: {context}

# Question : {question}

# Provide a straight-forward answer to the question based on the provided context.Do NOT include any conversational phrases, introductions, or additional information. If the answer is not in the context, state "Information not available."
# """
prompt_template = """
Extract the exact answer from the restaurant information below.

Restaurant Information:
{context}

Question: {question}
YOU ARE A CHATBOT ASSISTANT FOR HABESHA RESTAURANT WHOSE WORK IS TO ENHANCE USER EXPERIENCE BY ANSWERING QUESTIONS ASKED. ANSWER QUESTIONS ONLY FROM CONTENT PROVIED. ANSWER QUESTIONS INTELLIGENTLY. 
Provide only the direct answer. For location: give the full address. For hours: give exact times. For reservations: list the steps. Be DIRECT and MINIMIZE PROVIDING UNNECESSARY INFORMATION. ANSWER WHAT IS ASKED, DIRECTLY AND AS STRAIGHTFORWARD AS POSSIBLE. DON'T SHOW THE CHAT DIALOGUE, JUST PROVIDE THE ANSWER, NOTHING MORE, NOTHING LESS!

Answer:
"""
PROMPT = PromptTemplate(template=prompt_template,input_variables=["context", "question"])
chain_type_kwargs = {"prompt": PROMPT}
context = "\n".join([doc.page_content for doc in data])
final_prompt = prompt_template.format(context=context,question=query)

response = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": "tinyllama",
        "prompt": final_prompt,
        "stream": False,
        "options": {
            "temperature":0.0,
            "top_p": 0.1,
            "repeat_penalty": 1.1,
            "num_predict": 50
        }
    }
).json()
print(response['response'])