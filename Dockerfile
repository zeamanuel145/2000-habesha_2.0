# Use an official Python runtime as a parent image.
# We choose a slim-buster image for a smaller size.
FROM python:3.10-slim-buster

# Set the working directory inside the container.
# All subsequent commands will run from this directory.
WORKDIR /app

# Copy the requirements.txt file first to leverage Docker's build cache.
# This means if requirements.txt doesn't change, these layers won't be rebuilt.
# AFTER (CORRECT):
COPY chatbot/requirements.txt .

# Install Python dependencies.
# Using --no-cache-dir to avoid storing pip's cache in the image, reducing size.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire 'chatbot' directory into the container.
# This includes your 'src' folder (main.py, chatbot.py, etc.) and 'restaurant_details'.
COPY chatbot/ /app/chatbot/

# Set the PYTHONPATH to include the 'src' directory within 'chatbot'.
# This ensures Python can find your modules like 'chatbot.py', 'models.py', etc.
ENV PYTHONPATH=/app/chatbot/src:$PYTHONPATH

# Expose the port that FastAPI will run on.
# This tells Docker that the container listens on this port.
EXPOSE 8000

# Command to run the FastAPI application using Uvicorn.
# We specify the module and application object: chatbot/src/main.py -> app
# --host 0.0.0.0 makes the server accessible from outside the container.
# --port 8000 specifies the port.
# Note: We remove --reload for production containers as it's for development.
CMD ["sh", "-c", "uvicorn chatbot.src.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
