# Stage 1: Builder - Install dependencies and build artifacts
# Use a slightly more robust Python slim image for the build stage if needed for complex packages
FROM python:3.10-slim-buster AS builder

# Set environment variables to prevent Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory for the build stage
WORKDIR /app

# Copy only the requirements file first to leverage Docker layer caching.
# If requirements.txt doesn't change, this layer is cached, speeding up rebuilds.
COPY chatbot/requirements.txt .

# Install Python dependencies into a virtual environment.
# Using --no-cache-dir prevents pip from storing downloaded packages, reducing image size.
# We install into a venv within the builder stage, which will then be copied.
RUN python -m venv /opt/venv && \
    /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

# Stage 2: Production - Create a lean runtime image
# Use the same slim base image for consistency and minimal footprint
FROM python:3.10-slim-buster AS production

# Set the working directory for the production stage
WORKDIR /app

# Copy the virtual environment from the builder stage
# This brings only the installed Python packages, not the build tools or pip cache
COPY --from=builder /opt/venv /opt/venv

# Add the virtual environment's bin directory to the PATH
ENV PATH="/opt/venv/bin:$PATH"

# Copy your application code from the host to the production image
# This assumes your 'chatbot' directory is relative to the Dockerfile's context (repo root)
COPY chatbot/ /app/chatbot/

# Set the PYTHONPATH to include the 'src' directory within 'chatbot'.
ENV PYTHONPATH=/app/chatbot/src:$PYTHONPATH

# Expose the port that FastAPI will run on.
EXPOSE 8000

# Command to run the FastAPI application using Uvicorn.
# The path to main.py is correctly specified relative to the /app directory
# because 'chatbot' was copied into '/app/chatbot'.
CMD ["uvicorn", "chatbot.src.main:app", "--host", "0.0.0.0", "--port", "8000"]
