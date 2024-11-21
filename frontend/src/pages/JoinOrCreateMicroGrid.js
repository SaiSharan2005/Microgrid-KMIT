import React from "react";
import AvailableMicrogrid from "../components/AvailableMicrogrid";
import EnhancedButton from "../components/EnhancedButton"; // Import the enhanced button
import myImage from "../images/3.jpg";
import { useNavigate } from "react-router-dom";

const JoinOrCreateMicroGrid = () => {
  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: `url(${myImage}) no-repeat center center/cover`,
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    content: {
      zIndex: 1,
      backgroundColor: "#001719",
      borderRadius: "20px",
      padding: "40px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      gap: "30px",
      width: "70%",
      maxWidth: "900px",
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
    },
    section: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      textAlign: "center",
    },
    title: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "2rem",
      color: "#ffffff",
      margin: 0,
    },
    subtitle: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: "1rem",
      color: "#d0d0d0",
      maxWidth: "250px",
    },
    divider: {
      width: "3px",
      backgroundColor: "#005d63",
      height: "200px",
    },
  };

  const handleCreateClick = () => {
    navigate("/addMicrogrid", { state: { redirectLogIn: true } });
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        {/* Join Section */}
        <div style={styles.section}>
          <h1 style={styles.title}>Join</h1>
          <AvailableMicrogrid />
        </div>

        {/* Divider */}
        <div style={styles.divider}></div>

        {/* Create Section */}
        <div style={styles.section}>
          <h1 style={styles.title}>Create</h1>
          <p style={styles.subtitle}>
            Create your own microgrid and take control of your energy needs.
          </p>
          <EnhancedButton buttonText="Connect" onClick={handleCreateClick} />
        </div>
      </div>
    </div>
  );
};

export default JoinOrCreateMicroGrid;
