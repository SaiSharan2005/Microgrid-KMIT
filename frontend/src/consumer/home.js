import React, { useState } from "react";
import ConsumerNavbar from "./navbar.js";

export default function ConsumerHome() {
  const [isHovered, setHovered] = useState(false);

  const styles = {
    imgContainer: {
      backgroundImage:
        "url('https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    topSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "500px",
    },
    heading: {
      textAlign: "center",
      fontSize: "45px",
      fontFamily: "Mukta",
      margin: "0",
      color: "white",
    },
    subtext: {
      margin: "20px 0",
      textAlign: "center",
      color: "white",
    },
    getStartedLink: {
      textDecoration: "none",
      marginTop: "20px",
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "13rem",
      height: "3rem",
      borderRadius: "50px",
      border: "double 4px #001214",
      backgroundImage:
        "linear-gradient(#212121, #212121), linear-gradient(137.48deg, #ffdb3b 10%, #FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
      backgroundOrigin: "border-box",
      backgroundSize: "300% 300%",
      transform: isHovered ? "scale(1.1)" : "scale(1)",
      transition: "transform 0.5s",
      position: "relative",
    },
    buttonText: {
      zIndex: 2,
      fontSize: "15px",
      letterSpacing: "5px",
      color: "white",
    },
    glow: {
      position: "absolute",
      display: "flex",
      width: "12rem",
      height: "3rem",
    },
    circle: {
      width: "100%",
      height: "30px",
      filter: "blur(2rem)",
      zIndex: "-1",
    },
    circleDark: {
      background: "#003337",
    },
    circleLight: {
      background: "#02fffd",
    },
    bottomSection: {
      backgroundColor: "#001c20",
      padding: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    bottomHeading: {
      color: "white",
    },
    bottomImage: {
      maxWidth: "150px",
      borderRadius: "8px",
    },
  };

  return (
    <>
      <ConsumerNavbar />
      <div style={styles.imgContainer}>
        <div style={styles.topSection}>
          <h1 style={styles.heading}>Get Started with Lorem Ipsum</h1>
          <p style={styles.subtext}>
            Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
            ipsum Lorem ipsum
          </p>
          <a href="/consumer/form" style={styles.getStartedLink}>
            <button
              style={styles.button}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <strong style={styles.buttonText}>Get Started</strong>
              <div style={styles.glow}>
                <div style={{ ...styles.circle, ...styles.circleDark }}></div>
                <div style={{ ...styles.circle, ...styles.circleLight }}></div>
              </div>
            </button>
          </a>
        </div>
      </div>

      {/* <div style={styles.bottomSection}>
        <div>
          <h3 style={styles.bottomHeading}>Lorem Ipsum</h3>
        </div>
        <div>
          <img
            src="https://via.placeholder.com/150"
            alt="Placeholder"
            style={styles.bottomImage}
          />
        </div>
      </div> */}
    </>
  );
}
