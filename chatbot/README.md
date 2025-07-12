# Habesha Cultural Restaurant Chatbot Backend (FastAPI)
This repository contains the FastAPI backend for the "2000 Habesha Cultural Restaurant" chatbot. It is responsible for processing user queries, interacting with the Pinecone vector database for retrieval, and leveraging Google Gemini 2.0 Flash for generating conversational responses.

### Deployed backend URL: 
https://two000-habesha-2-0.onrender.com

## Features
- Intelligent Q&A: Answers questions about restaurant's details, menu, reservations and more
Retrieval Augmented Generation (RAG): Integrates with Pinecone for factual information retrieval to enhance LLM responses.

- Conversational AI: Utilizes Google Gemini 2.0 Flash for robust natural language understanding and generation.

- Robust API: Built with FastAPI, providing a high-performance and easy-to-use API.

- Containerized Deployment: Dockerfile provided for consistent and reliable deployments.

#Setup and Local Development
Follow these instructions to set up and run the backend locally.

### Prerequisites
- Python 3.10+
- Docker(for building and running the Docker image)
- A Google Gemini API key
- A Pinecone API Key 

1. Clone the repository by running:
`git clone https://github.com/zeamanuel145/2000-habesha_2.0.git`
`cd 2000-habesha_2.0/chatbot`

2. Environment Variables
Create a .env file in the chatbot/ directory to store your Gemini and Pinecone API keys.

3. Build and Run with Docker
Navigate to the root of your 2000-habesha_2.0 repository (where the Dockerfile is located) and run the Docker container using:
`docker run -p 8000:8000 --env-file ./chatbot/.env habesha-chatbot-backend`

4. Local Running
First install all requirements using:
`pip install -r requirements.txt`
Then run:
`uvicorn src.main:app --reload --host 0.0.0.0 --port 8000`

# API Documentation
The FastAPI application automatically generates interactive API documentation.

Swagger UI: Access the API documentation at http://localhost:8000/docs when running locally.

## Endpoints
`POST /chat`: The primary endpoint for chatbot interaction.
- Request Body:
```
{
  "session_id": "optional_string_for_conversation_history",
  "message": "string_user_query"
}

```
- Response Body:
```
{
  "session_id": "string_unique_session_id",
  "response": "string_chatbot_response",
  "chat_history": [
    {"sender": "user", "text": "string_user_message"},
    {"sender": "bot", "text": "string_bot_response"}
    // ... more messages
  ]
}
```
Functionality: Processes the user's message, retrieves relevant information from Pinecone, queries the Google Gemini 2.0 Flash model, and returns a comprehensive response including updated chat history. All API endpoints are designed to respond without errors, and the model loads successfully on startup.

# ☁️ Deployment Guide (Render)
This backend is designed for deployment as a Web Service on Render.

Prepare your Backend Repository:

Ensure your Dockerfile (at the root of 2000-habesha_2.0/) is correct and functional.

Ensure chatbot/src/main.py has the CORSMiddleware configured to allow your desired origins.

Ensure chatbot/src/chatbot.py uses CustomGeminiLLM and reads GEMINI_API_KEY from environment variables.

Commit and push all these changes to your GitHub repository (e.g., to a chatbot branch).

Create a New Web Service on Render:

Go to Render Dashboard and click "New" -> "Web Service".

Connect your GitHub repository

Branch: Select the branch containing your backend code (e.g., chatbot).

Root Directory: Leave empty (or .) as your Dockerfile is at the repo root.

Language: Select "Docker".

Name: habesha-chatbot-api (or your preferred service name).

Region: Choose a region (e.g., Oregon (US West)).

Plan: Select a paid plan (e.g., Starter). The free tier has limitations that might affect API performance and uptime, and is not recommended for continuous operation.

Environment Variables:

GEMINI_API_KEY: Your Google Gemini API Key.

PINECONE_API_KEY: Your Pinecone API Key.


Click "Create Web Service". Monitor the build and deploy logs on Render. The service should go "Live" without missing files or server errors.


