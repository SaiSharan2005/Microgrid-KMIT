import React, { useState } from "react";

const EnhancedButton = ({ buttonText, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    button: {
      border: "none",
      width: "180px",
      height: "50px",
      borderRadius: "25px",
      background: isHovered
        ? "linear-gradient(90deg, #00c6ff, #0072ff)"
        : "linear-gradient(90deg, #005d63, #003740)",
      color: "#ffffff",
      fontWeight: "bold",
      fontSize: "16px",
      cursor: "pointer",
      boxShadow: isHovered
        ? "0 8px 20px rgba(0, 198, 255, 0.6)"
        : "0 4px 10px rgba(0, 0, 0, 0.3)",
      transition: "all 0.3s ease-in-out",
      position: "relative",
      overflow: "hidden",
    },
    glowEffect: {
      content: '""',
      position: "absolute",
      top: "-50%",
      left: "-50%",
      width: "200%",
      height: "200%",
      background: "radial-gradient(circle, rgba(0,198,255,0.4), rgba(0,0,0,0))",
      transform: isHovered ? "scale(1)" : "scale(0)",
      transition: "transform 0.5s ease-in-out",
      zIndex: 0,
    },
    text: {
      zIndex: 1,
      position: "relative",
    },
  };

  return (
    <button
      style={styles.button}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={styles.glowEffect}></div>
      <span style={styles.text}>{buttonText}</span>
    </button>
  );
};

export default EnhancedButton;
