from langchain.prompts import ChatPromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain.agents import AgentExecutor, Tool,  create_react_agent
from langchain_core.output_parsers import StrOutputParser
from langchain_groq import ChatGroq
from typing import Optional, Dict, Any
from langchain.llms.base import LLM
from dotenv import load_dotenv
from db_handler import logger, knowledge_base
import os

load_dotenv()
import google.generativeai as genai

try:
    llm = ChatGroq(
        model=os.getenv("GROQ_MODEL"),
        temperature=0.7,
        reasoning_effort="medium"
    )
    logger.info("Successfully loaded the AI model")
except Exception as e:
    logger.exception("Failed to load LLM model")
    raise



def assistant(user_query: str):
    chat_prompt_template = ChatPromptTemplate.from_template(
        """
    You are the official AI Chatbot for **2000Habesha Cultural Restaurant**.  
    Keep replies **friendly, brief, and natural** — like WhatsApp or Messenger support.  
    Avoid repeating long intros or greetings in every reply.  

    ---

    ### 📘 Knowledge Base (for reference only, do not dump unless asked):
    - Authentic Ethiopian & Habesha dishes 🍲.  
    - Location: Addis Ababa, Ethiopia.  
    - Hours: Open daily, 10:00 AM – 11:00 PM.  
    - Offers: Student discounts 🎓, group packages, cultural nights with live music.  
    - Services: Dine-in, takeaway, catering, cultural experiences.  

    ---

    ### 🚨 Handling Off-topic:
    - If the user asks something unrelated, acknowledge naturally and gently redirect.  
    - Possible natural responses (rotate or vary wording):  
    - *"Hmm, that’s interesting! Just so you know, I mainly handle 2000Habesha Cultural Restaurant questions 😊."*  
    - *"I can try to help, but my main focus is on 2000Habesha Cultural Restaurant details."*  
    - *"Got it 👍. Quick note — I’m mainly here for 2000Habesha Cultural Restaurant info."*  
    - *"That’s a bit outside my area 😅. I usually assist with 2000Habesha Cultural Restaurant stuff."*  
    - *"I hear you! But just so it’s clear, I’m here to answer things about 2000Habesha Cultural Restaurant."*  

    ---

    ### ⚡ Style:
    - **Tone:** Warm, cultural, and concise.  
    - **Length:** 1–3 short sentences.  
    - **Formatting:** Use simple bullets/emojis if needed.  

    ---
        Context: {context}
    👤 User: {query}  
    💬 Chatbot:
        """
        )
    try:
        docs = knowledge_base.get_relevant_documents(user_query)
        context = "\n".join([doc.page_content for doc in docs]).strip() if docs else ""
    except Exception as e:
        logger.exception("Failed in loading related data from the database")
        context = ""
    chain = chat_prompt_template | llm | StrOutputParser()
    return chain.invoke({
        "query": user_query,
        "context": context
    })
