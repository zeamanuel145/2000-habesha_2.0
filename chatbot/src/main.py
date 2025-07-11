from fastapi import FastAPI,HTTPException
from typing import Dict, Any
import uuid
import asyncio
from chatbot import initialize_chatbot_agent
from models import *

app = FastAPI(title="2000Habesha Restaurant Chatbot API",
              description="API for 2000Habesha Cultural Restaurant",
              version="1.0.0")
active_sessions: Dict[str, Any] = {} #Will store each active chat session's chatbot brain

@app.get("/") #This is the landing page
async def root():
    return {"message": "Hello!"}

@app.post("/chat", response_model=ChatResponse, summary="Send a message to the chatbot and get a response") #This is the endpoint for sending prompts
async def chat_endpoint(request: ChatRequest):
    # Send a prompt to the chatbot
    session_id = request.session_id if request.session_id else str(uuid.uuid4())
    user_message = request.message #This is the user's message

    if session_id not in active_sessions:
        print("Creating a new storage for session ID {session_id}")
        active_sessions[session_id] = initialize_chatbot_agent()

    agent_executor = active_sessions[session_id]

    try:
        response = await asyncio.to_thread(agent_executor.invoke, {"input": user_message})
        chatbot_response = response['output']

        history_messages = agent_executor.memory.load_memory_variables({})['history']
        formatted_history = []

        for msg in history_messages:
            sender = 'user' if msg.type == "human" else "bot"
            formatted_history.append(ChatMessage(sender=sender, text=msg.content))

        return ChatResponse(
            session_id = session_id,
            response=chatbot_response,
            chat_history=formatted_history
        )
    except Exception as e:
        print(f"Sorry! An error occurred:{session_id}: {e}")
        raise HTTPException(status_code=500,detail=f"Internal Server error: {e}")
    

    ## This endpoint allows us to get the full chat history
@app.get("/chat/history/{session_id}", response_model=HistoryResponse, summary="Retrieves conversation history for specified session")
async def get_chat_history(session_id: str):
    if session_id not in active_sessions:
        # If not, send a 404 (Not Found) error.
        raise HTTPException(status_code=404, detail="Session not found.")
     #Get the chat memory for this session
    agent_executor = active_sessions[session_id]
    #Retrieve full conversation history from memory
    history_messages = agent_executor.memory.load_memory_variables({})['history']
    formatted_history = []
    for msg in history_messages:
        sender = 'user' if msg.type == 'human' else 'bot'
        formatted_history.append(ChatMessage(session_id=session_id, text=msg.content))

    return HistoryResponse(session_id=session_id, chat_history=formatted_history)



