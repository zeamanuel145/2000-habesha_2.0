from pydantic import BaseModel,Field
from typing import List, Dict, Any, Optional

# Model for a single chat message
class ChatMessage(BaseModel):
    sender : str = Field(...,example="user",description="Who sent the message")
    text : str = Field(..., example="What are your opening hours", description="The message content")

# Model for an incoming chat request from a user
class ChatRequest(BaseModel):
    session_id: Optional[str] = Field(None, description="Optional session ID")
    message: str = Field(...,example="Tell me about 2000Habesha",description="The user's message to the chatbot" )

# Model for the response we send back after a chat message
class ChatResponse(BaseModel):
    # session_id: str = Field(...,description="The ID of the chat session")
    response: str = Field(...,description="The chatbot's reponse.")
    # chat_history: List[ChatMessage] = Field(...,description="The updated conversation history for the session")

# Model for the response when someone asks for chat history
class HistoryResponse(BaseModel):
    session_id: str = Field(...,description="The ID of the chat session")
    chat_history: List[ChatMessage] = Field(...,description="The full conversation history for the session")
