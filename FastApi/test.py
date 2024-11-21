from deepface import DeepFace

def compare_faces(image1_path, image2_path):
    try:
        # Perform face comparison
        result = DeepFace.verify(image1_path, image2_path)
        
        # Check similarity
        if result["verified"]:
            print("The two faces are similar!")
        else:
            print("The two faces are NOT similar.")
        
        # Print the result details
        print("Similarity Score:", result["distance"])
        print("Threshold:", result["threshold"])
    except Exception as e:
        print("Error:", str(e))

# Provide paths to the two images
image1 = "./images/dam7695601179.jpeg"
image2 = "./images/dam7148977127.jpeg"
print("i am sai")
compare_faces(image1, image2)

