from fastapi import FastAPI,HTTPException, status
from typing import Dict, Any
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging
import os
from .models import ChatMessage, ChatRequest, ChatResponse, HistoryResponse
from .chatbot import assistant


logging.basicConfig(level=logging.INFO,format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', handlers=[logging.StreamHandler()])
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("FastAPI application starting...")

    yield
    logger.info("FastAPI backend stopped.")

app = FastAPI(title="2000Habesha Restaurant Chatbot API",
              description="API for 2000Habesha Cultural Restaurant",
              version="2.0",
              lifespan=lifespan)
origins = [
    "https://2000-habesha.netlify.app",
    "http://localhost:3000",            
    "http://127.0.0.1:8000",
    "http://localhost:5173",
    "http://127.0.0.1:8003"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers = ["*"],
    allow_methods=["*"]
)

@app.get("/") 
async def root():
    logger.info("Loaded root page")
    return {"message": "Hello! Visit /docs to test various endpoints"}

@app.post("/chat", response_model=ChatResponse,summary="Send a message to the chatbot and get a response")
async def chatbot(request: ChatRequest):
    try:
        response_text = assistant(request.message)
        if response_text:
            logger.info("Chatbot returned an answer!")
        return ChatResponse(response=response_text)
    except Exception as e:
        logger.exception("The chatbot failed to respond")
        raise HTTPException(status_code=500, detail="Chatbot failed to respond.")


# @app.post("/chat", response_model=ChatResponse, summary="Send a message to the chatbot and get a response")
# async def chat_endpoint(request: ChatRequest):
#     # Send a prompt to the chatbot
#     session_id = request.session_id if request.session_id else str(uuid.uuid4())
#     user_message = request.message #This is the user's message

#     if session_id not in active_sessions:
#         logger.info(f"Creating a new storage for session ID {session_id}")
#         try:
#             active_sessions[session_id] = initialize_chatbot_agent()
#         except Exception as e:
#             logger.error("Failed to initialize chatbot agent for session {session_id} : {e}")
#             raise HTTPException(
#                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#                 detail=f"Failed to start chat session due to internal error: {e}"
#             )

#     agent_executor = active_sessions[session_id]

#     try:
#         response = await asyncio.to_thread(agent_executor.invoke, {"input": user_message})
#         chatbot_response = response['output']

#         history_messages = agent_executor.memory.load_memory_variables({})['history']
#         formatted_history = []

#         for msg in history_messages:
#             sender = 'user' if msg.type == "human" else "bot"
#             formatted_history.append(ChatMessage(sender=sender, text=msg.content))

#         return ChatResponse(
#             session_id = session_id,
#             response=chatbot_response,
#             chat_history=formatted_history
#         )
#     except Exception as e:
#         logger.error(f"Error during chat processing for session {session_id}: {e}", exc_info=True)
#         raise HTTPException(status_code=500,detail=f"Internal Server error: {e}")
    

    ## This endpoint allows us to get the full chat history
# @app.get("/chat/history/{session_id}", response_model=HistoryResponse, summary="Retrieves conversation history for specified session")
# async def get_chat_history(session_id: str):
#     logger.info(f"Received history request for session: {session_id}")
#     if session_id not in active_sessions:
#         # If not, send a 404 (Not Found) error.
#         raise HTTPException(status_code=404, detail="Session not found.")
#      #Get the chat memory for this session
#     agent_executor = active_sessions[session_id]
#     #Retrieve full conversation history from memory
#     try:
#         history_messages = agent_executor.memory.load_memory_variables({})['history']
#         formatted_history = []
#         for msg in history_messages:
#             sender = 'user' if msg.type == 'human' else 'bot'
#             formatted_history.append(ChatMessage(sender=sender, text=msg.content))

#         logger.info(f"Successfully received history for session {session_id} ")
#         return HistoryResponse(session_id=session_id, chat_history=formatted_history)
#     except Exception as e:
#         logger.error(f"Error retrieving history for session {session_id} : {e}",exc_info=True)
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail=f"Failed to retrieve chat history due to internal error: {e}"
#         )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)