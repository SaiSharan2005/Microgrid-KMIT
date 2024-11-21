import React, { useEffect, useState } from "react";
import ProsumerNavbar from "./navbar.js";
import { decryptAES } from "../hooks/encryption.js";

function ProsumerAllPlans() {
  const [plans, getPlans] = useState([]);

  useEffect(() => {
    const takingPlans = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_BackendUrl}/getAllPlans`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            microGridId: Number(decryptAES(localStorage.getItem("microGridId"))),
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      getPlans(data);
    };
    takingPlans();
  }, []);

  const styles = {
    container: {
      backgroundColor: "#010c0e",
      color: "#fff",
      padding: "20px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    card: {
      backgroundColor: "#001c20",
      border: "1px solid #02ffff",
      borderRadius: "20px",
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
      marginBottom: "20px",
      transition: "transform 0.3s ease",
    },
    cardHover: {
      transform: "translateY(-5px)",
    },
    cardImg: {
      height: "200px",
      width: "100%",
      objectFit: "cover", // Ensures proper image scaling
      borderBottom: "2px solid #02ffff",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
    },
    cardBody: {
      padding: "20px",
      textAlign: "center",
    },
    cardTitle: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    cardText: {
      fontSize: "1rem",
      marginBottom: "5px",
    },
    button: {
      background: "#005d63",
      border: "none",
      borderRadius: "20px",
      color: "#02ffff",
      padding: "10px 20px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      background: "linear-gradient(45deg, #02ffff, #005d63)",
      color: "#fff",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      width: "100%",
      maxWidth: "1200px",
    },
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={styles.container}>
      <ProsumerNavbar />
      <h1 className="mb-5">Available Plans</h1>
      <div style={styles.grid}>
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              ...(hoveredCard === index ? styles.cardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img
              style={styles.cardImg}
              src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
              alt="Plan Thumbnail"
            />
            <div style={styles.cardBody}>
              <h5 style={styles.cardTitle}>Units: {plan.units}</h5>
              <p style={styles.cardText}>Timespan: {plan.timespan}</p>
              <p style={styles.cardText}>Mobile: {plan.mobile_number}</p>
              <p style={styles.cardText}>Company: {plan.company_name}</p>
              <button
                style={styles.button}
                onMouseEnter={(e) =>
                  (e.target.style.background = styles.buttonHover.background)
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = styles.button.background)
                }
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProsumerAllPlans;
