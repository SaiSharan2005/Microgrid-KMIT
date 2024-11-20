import React, { useRef, useState } from "react";
import axios from "axios";

const AddFace = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoCaptured, setPhotoCaptured] = useState(false);
  const [photoData, setPhotoData] = useState(null);
  const [aadharNumber, setAadharNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  // Capture photo and convert to Base64
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

      const base64Image = canvas.toDataURL("image/png"); // Convert to Base64
      setPhotoData(base64Image);
      setPhotoCaptured(true);
    }
  };

  // Send photo and data to backend
  const handleSubmit = async () => {
    if (!aadharNumber || !phoneNumber || !photoData) {
      alert("Please fill in all fields and capture a photo!");
      return;
    }

    try {
      const response = await axios.post(process.env.REACT_APP_BackendUrl+"/addAadharFace", {
        aadharnumber: aadharNumber,
        phonenumber: phoneNumber,
        image: photoData,
      });

      if (response.status === 200) {
        alert("Face added successfully!");
      }
    } catch (error) {
      console.error("Error adding face: ", error);
      alert("Failed to add face.");
    }
  };

  return (
    <div className="container">
        {"test"}{process.env.REACT_APP_BackendUrl}
      <h1>Add Face</h1>
      <div className="form-group">
        <label>Aadhar Number:</label>
        <input
          type="text"
          className="form-control"
          value={aadharNumber}
          onChange={(e) => setAadharNumber(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number:</label>
        <input
          type="text"
          className="form-control"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div className="camera">
        <video ref={videoRef} autoPlay></video>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
        <button onClick={startCamera} className="btn btn-primary">
          Start Camera
        </button>
        <button onClick={capturePhoto} className="btn btn-secondary">
          Capture Photo
        </button>
      </div>

      {photoCaptured && (
        <div>
          <h3>Captured Photo:</h3>
          <img src={photoData} alt="Captured" style={{ width: "300px" }} />
        </div>
      )}

      <button onClick={handleSubmit} className="btn btn-success">
        Submit
      </button>
    </div>
  );
};

export default AddFace;
