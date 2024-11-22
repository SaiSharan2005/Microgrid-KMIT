import numpy as np  # Use numpy properly
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from PIL import Image
import base64
import io
import os
import random
from urllib.parse import quote_plus
from fastapi.middleware.cors import CORSMiddleware
from deepface import DeepFace
from groq import Groq
import sqlite3
from sentence_transformers import SentenceTransformer

# Initialize the model
model = SentenceTransformer('all-MiniLM-L6-v2')  # Replace with your desired model


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # List of allowed origins (e.g., your React frontend URL)
    allow_credentials=True,                  # Allow cookies and credentials
    allow_methods=["*"],                     # Allow all HTTP methods
    allow_headers=["*"],                     # Allow all headers
)

# MongoDB setup with properly encoded credentials
username = quote_plus("duginisaisharan")
password = quote_plus("Dhoni@2005")
mongo_uri = f"mongodb+srv://{username}:{password}@cluster0.h4tlhz1.mongodb.net"
mongo_client = MongoClient(mongo_uri)
db = mongo_client["test"]  # Replace with your database name
collection = db["adharauthentics"]  # Replace with your collection name

client = Groq(api_key="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")

# Data model for the incoming request
class FaceComparisonRequest(BaseModel):
    aadharnumber: str
    image: str  # Base64 string of the user's image

class Query(BaseModel):
    query: str

import sqlite3

def connect_to_database(db_name: str):
    """Establish a connection to the SQLite database."""
    try:
        conn = sqlite3.connect(db_name)
        return conn
    except sqlite3.Error as e:
        raise Exception(f"Error connecting to database: {str(e)}")

# Save base64 string as an image
def save_image(base64_image: str) -> str:
    try:
        binary_data = base64.b64decode(base64_image.split(",")[-1])
        image = Image.open(io.BytesIO(binary_data))
        
        # Convert to RGB if the image has an alpha channel (RGBA)
        if image.mode == "RGBA":
            image = image.convert("RGB")
        
        if not os.path.exists("images"):
            os.makedirs("images")
        
        random_text = random.randint(1000000000, 9999999999)
        image_path = f"./images/dam{random_text}.jpeg"
        image.save(image_path)
        return image_path
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error decoding or saving image: {str(e)}")

# Compare two faces
def compare_faces(face1_path: str, face2_path: str) -> bool:
    try:
        result = DeepFace.verify(face1_path, face2_path)
        return result["verified"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error comparing faces: {str(e)}")
from sklearn.metrics.pairwise import cosine_similarity

def retrieve_embeddings_from_db(conn, query):
    """Retrieves embeddings and their corresponding chunks for a specific collection name from the SQLite database."""
    c = conn.cursor()
    c.execute('''SELECT chunk_text, embedding FROM embeddings''')
    rows = c.fetchall()

    chunks = []
    embeddings = []

    for row in rows:
        chunk_text, emb_str = row
        emb = np.frombuffer(base64.b64decode(emb_str), dtype=np.float32)
        chunks.append(chunk_text)
        embeddings.append(emb)

    # Encoding the query using your model (e.g., SentenceTransformer)
    query_embedding = model.encode(query)  # Encoding the query

    # Calculate cosine similarity
    similarities = cosine_similarity([query_embedding], embeddings)[0]

    # Get the indices of the top 3 most similar chunks
    top_k = 3
    top_k_indices = np.argpartition(-similarities, top_k)[:top_k]

    # Sort the top_k indices by similarity in descending order
    top_k_indices = top_k_indices[np.argsort(-similarities[top_k_indices])]

    # Get the top 3 closest chunks
    closest_chunks = [chunks[idx] for idx in top_k_indices]

    return f"Question: {query} Context: {closest_chunks[0]} {closest_chunks[1]} {closest_chunks[2]}"

@app.post("/compare-faces")
async def compare_faces_endpoint(request: FaceComparisonRequest):
    try:
        # Fetch stored base64 image from MongoDB using Aadhar number
        stored_record = collection.find_one({"aadharnumber": request.aadharnumber})
        if not stored_record or "image" not in stored_record:
            raise HTTPException(status_code=404, detail="Aadhar record not found or missing image.")

        # Decode and save images
        stored_image_path = save_image(stored_record["image"])
        user_image_path = save_image(request.image)

        # Compare faces
        match = compare_faces(stored_image_path, user_image_path)

        # Cleanup saved images
        os.remove(stored_image_path)
        os.remove(user_image_path)

        # Respond with the result
        return {"match": match}
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@app.post("/llama3")
async def get_response(query: Query):
    try:
        # Initialize messages list
        messages = []
        
        # Database interaction and query retrieval (uncomment and modify as needed)
        conn = connect_to_database('final.db')
        queryFinal = retrieve_embeddings_from_db(conn, query.query)
        print(queryFinal)
        # Add query to the messages
        messages.append({
            "role": "user", 
            "content": f"""remember uPlease answer the question in as much detail as possible based on the provided context.
  Ensure to include all relevant details. If the answer is not available in the provided context,
  kindly respond with "The answer is not available in the context." Please avoid providing incorrect answers.
\n\n
  Context:\n ${queryFinal}?\n"""
            # "content": "remember u are an llm which is used for icar-crida work so please dont mention abt context just give a simple answer .this are" + queryFinal + "based on the context give me the answer and just give answer dont mention abt the data given to you"
        })
        
        chat_completion = client.chat.completions.create(
            messages=messages,
            model="llama3-8b-8192",
        )
        result = chat_completion.choices[0].message.content
        return {"response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
