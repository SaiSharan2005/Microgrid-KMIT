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

# Data model for the incoming request
class FaceComparisonRequest(BaseModel):
    aadharnumber: str
    image: str  # Base64 string of the user's image

# Save base64 string as an image
# Save base64 string as an image
def save_image(base64_image: str) -> str:
    try:
        # Ensure the base64 string is correctly formatted
        # if not base64_image.startswith("data:image/jpeg;base64,"):
        #     raise ValueError("Base64 string is not in the expected format.")

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

        # face_encoding_1 = face_recognition.face_encodings(face_recognition.load_image_file(face1_path))
        # face_encoding_2 = face_recognition.face_encodings(face_recognition.load_image_file(face2_path))

        # # Check if faces were detected in both images
        # if not face_encoding_1 or not face_encoding_2:
        #     raise HTTPException(status_code=400, detail="No faces detected in one or both images.")

        # # Compare the faces
        # results = face_recognition.compare_faces([face_encoding_1[0]], face_encoding_2[0])
        # return results[0]
        return result["verified"]
    except Exception as e:
        # return False
        raise HTTPException(status_code=500, detail=f"Error comparing faces: {str(e)}")


@app.post("/compare-faces")
async def compare_faces_endpoint(request: FaceComparisonRequest):
    try:
        # Fetch stored base64 image from MongoDB using Aadhar number
        stored_record = collection.find_one({"aadharnumber": request.aadharnumber})
        print(stored_record)
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
        raise e  # Forward HTTPExceptions with the original status code
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")
