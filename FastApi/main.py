from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from PIL import Image
import base64
import io
import os
import random
import face_recognition
import time

app = FastAPI()

# MongoDB setup
mongo_client = MongoClient("mongodb+srv://duginisaisharan:Dhoni@2005@cluster0.h4tlhz1.mongodb.net")
db = mongo_client["test"]  # Replace with your database name
collection = db["adharauthentics"]  # Replace with your collection name

# Data model for the incoming request
class FaceComparisonRequest(BaseModel):
    aadharnumber: str
    # phonenumber: str
    image: str  # Base64 string of the user's image

# Save base64 string as an image
def save_image(base64_image: str) -> str:
    binary_data = base64.b64decode(base64_image)
    image = Image.open(io.BytesIO(binary_data))
    if not os.path.exists("images"):
        os.makedirs("images")
    random_text = random.randint(1000000000, 9999999999)
    image_path = f"./images/dam{random_text}.jpeg"
    image.save(image_path)
    time.sleep(1)
    return image_path

# Compare two faces
def compare_faces(face1_path: str, face2_path: str) -> bool:
    try:
        face_encoding_1 = face_recognition.face_encodings(face_recognition.load_image_file(face1_path))[0]
        face_encoding_2 = face_recognition.face_encodings(face_recognition.load_image_file(face2_path))[0]
        results = face_recognition.compare_faces([face_encoding_1], face_encoding_2)
        return results[0]
    except IndexError:
        raise HTTPException(status_code=400, detail="No face detected in one or both images.")

@app.post("/compare-faces")
async def compare_faces_endpoint(request: FaceComparisonRequest):
    try:
        # Fetch stored base64 image from MongoDB using aadharnumber
        stored_record = collection.find_one({"aadharnumber": request.aadharnumber})
        if not stored_record or "image" not in stored_record:
            raise HTTPException(status_code=404, detail="Aadhar record not found or missing image.")

        # Decode and save images
        stored_image_path = save_image(stored_record["image"].split(",")[-1])
        user_image_path = save_image(request.image.split(",")[-1])

        # Compare faces
        match = compare_faces(stored_image_path, user_image_path)

        # Cleanup saved images
        os.remove(stored_image_path)
        os.remove(user_image_path)

        # Respond with the result
        return {"match": match}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
