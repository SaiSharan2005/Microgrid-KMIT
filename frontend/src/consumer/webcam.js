import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';

// Reusable Button Component
const CapturePhotoButton = ({ text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyles = {
    alignItems: 'center',
    backgroundImage: 'linear-gradient(144deg, #02ffff, #005b60 50%, #00DDEB)',
    border: '0',
    borderRadius: '10px',
    boxSizing: 'border-box',
    color: '#FFFFFF',
    display: 'flex',
    fontSize: 'large',
    justifyContent: 'center',
    lineHeight: '1em',
    maxWidth: '100%',
    minWidth: '140px',
    padding: '3px',
    textDecoration: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    touchAction: 'manipulation',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    transition: 'all .3s',
    outline: '0',
    transform: isHovered ? 'scale(0.99)' : 'scale(1)',
  };

  const spanStyles = {
    background: isHovered
      ? 'linear-gradient(144deg, #02ffff, #005056, #005b60 50%, #00DDEB)'
      : '#001317',
    padding: '16px 24px',
    borderRadius: '6px',
    width: '100%',
    height: '100%',
    transition: '300ms',
  };

  return (
    <button
      style={buttonStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span style={spanStyles}>{text}</span>
    </button>
  );
};

// Main Component for Image Capture and Comparison
function ShowImage({ webRef, aadharnumber, navigate }) {
  const [imageInBase64, setImageInBase64] = useState("");
  const [showWebcam, setShowWebcam] = useState(true);

  // Capture the image from the webcam
  const captureImage = () => {
    const base64Data = webRef.current.getScreenshot();
    setImageInBase64(base64Data);
    setShowWebcam(false); // Hide webcam after capturing image
  };

  // Send captured image and Aadhar number to the backend
  const sendDataToServer = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_FastApiUrl}/compare-faces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageInBase64, aadharnumber }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Server response:', responseData);

      // Navigate to OTP page on successful match
      if (responseData.match ) {
        navigate("/consumer/otp");
      } else {
        alert("Face match failed. Please try again.");
      }
    } catch (error) {
      console.error('Error sending data to server:', error.message);
      alert('An error occurred while communicating with the server.');
    }
  };

  return (
    <div>
      {showWebcam ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Webcam ref={webRef} style={{ width: '100%', height: 'auto' }} />
          <CapturePhotoButton text="Capture Photo" onClick={captureImage} />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {imageInBase64 && <img src={imageInBase64} alt="Captured" style={{ width: '100%', height: 'auto' }} />}
          <CapturePhotoButton text="Compare Photo" onClick={sendDataToServer} />
        </div>
      )}
    </div>
  );
}

// Wrapper Component
function Compare({ aadhar }) {
  const webRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div>
      <ShowImage webRef={webRef} aadharnumber={aadhar} navigate={navigate} />
    </div>
  );
}

export default Compare;
