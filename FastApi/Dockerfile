FROM python:3.12-slim

# Update and install system dependencies
RUN apt update && apt install -y \
    gcc \
    g++ \
    make \
    cmake \
    libopenblas-dev \
    liblapack-dev \
    libboost-python-dev \
    libboost-thread-dev \
    libx11-dev \
    && apt clean

# Upgrade pip to ensure compatibility with the latest Python version
RUN pip install --upgrade pip

# Install face_recognition
RUN pip install face_recognition fastapi pymongo

# Set up the application
COPY . /app
WORKDIR /app

# Set the default command to run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
