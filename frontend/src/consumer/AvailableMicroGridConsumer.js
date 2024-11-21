import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decryptAES } from "../hooks/encryption";

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#1c1c1e",
    minHeight: "100vh",
    color: "#f5f5f5",
    fontFamily: "'Poppins', sans-serif",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#eaeaea",
    marginBottom: "30px",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#2a2a2e",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    color: "#ffffff",
  },
  cardHovered: {
    transform: "scale(1.05)",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#79b4f7",
  },
  cardText: {
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "#d0d0d0",
  },
  noData: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#888",
    marginTop: "50px",
  },
};

function AvailableMicrogrid(props) {
  const navigate = useNavigate();
  const [microGridData, setMicroGridData] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const addConsumerToMicroGrid = async (id) => {
    console.log("Adding consumer to Microgrid:", id, props.metaMaskAddress);
    await props.sendContract.addConsumerToMicroGrid(Number(id), props.metaMaskAddress);

    try {
      const response = await fetch(process.env.REACT_APP_BackendUrl + "/UpdateConsumer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          microid: decryptAES(localStorage.getItem("micrometerid")),
          microGridId: Number(id),
        }),
      });

      const data = await response.json();
      console.log(data);
      setMicroGridData(data);
    } catch (err) {
      console.error("Something went wrong:", err);
    }

    navigate("/consumer/login");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(process.env.REACT_APP_BackendUrl + "/simulation/MicrogridData", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setMicroGridData(data);
      } catch (err) {
        console.error("Something went wrong:", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Available Microgrids</h1>
      {microGridData === null || Object.keys(microGridData).length === 0 ? (
        <p style={styles.noData}>Sorry, no Microgrids are available!</p>
      ) : (
        <div style={styles.gridContainer}>
          {Object.entries(microGridData).map(([microgridKey, microgridValue]) => (
            <div
              key={microgridKey}
              style={{
                ...styles.card,
                ...(hoveredCard === microgridKey ? styles.cardHovered : {}),
              }}
              onClick={() => addConsumerToMicroGrid(microgridKey)}
              onMouseEnter={() => setHoveredCard(microgridKey)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div>
                <div style={styles.cardTitle}>Microgrid: {microgridKey}</div>
                {Object.entries(microgridValue).map(([key, value]) => (
                  <div style={styles.cardText} key={key}>
                    <strong>{key}:</strong> {Object.keys(value).length}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AvailableMicrogrid;
