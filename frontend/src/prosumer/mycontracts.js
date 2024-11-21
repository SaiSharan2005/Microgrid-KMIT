import React, { useEffect, useState } from "react";
import ProsumerNavbar from "./navbar.js";
import { decryptAES } from "../hooks/encryption.js";

function ProsumerMyContracts() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BackendUrl + "/getAllPlans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            gst_number: decryptAES(localStorage.getItem("gstNumber")),
          }),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div style={styles.pageContainer}>
      <ProsumerNavbar />
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {plans.length > 0 ? (
            plans.map((plan, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                <div className="card h-100" style={styles.card}>
                  <img
                    src="https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"
                    className="card-img-top"
                    alt="Plan Thumbnail"
                    style={styles.cardImage}
                  />
                  <div className="card-body" style={styles.cardBody}>
                    <h5 style={styles.cardTitle}>
                      {plan.units} Units
                    </h5>
                    <p style={styles.cardText}>
                      Timespan: {plan.timespan}
                    </p>
                    <p style={styles.cardText}>
                      Mobile: {plan.mobile_number}
                    </p>
                    <p style={styles.cardText}>
                      Company: {plan.company_name}
                    </p>
                    <BuyButton buttonText="Buy Now" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noPlansMessage}>No plans available currently.</p>
          )}
        </div>
      </div>
    </div>
  );
}

const BuyButton = ({ buttonText }) => (
  <button
    className="btn"
    style={styles.buyButton}
    onMouseEnter={(e) => (e.target.style.background = "#02ffff")}
    onMouseLeave={(e) => (e.target.style.background = "#005d63")}
  >
    <span style={styles.buyButtonText}>{buttonText}</span>
  </button>
);

const styles = {
  pageContainer: {
    backgroundColor: "#010c0e",
    width: "100vw",
    minHeight: "100vh",
    paddingBottom: "20px",
  },
  card: {
    background: "linear-gradient(145deg, #001c20, #00282c)",
    borderRadius: "20px",
    border: "none",
    overflow: "hidden",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s, box-shadow 0.3s",
  },
  cardImage: {
    height: "200px",
    objectFit: "cover",
  },
  cardBody: {
    padding: "20px",
    color: "white",
    textAlign: "center",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: "1.3rem",
    marginBottom: "10px",
  },
  cardText: {
    fontSize: "1rem",
    margin: "5px 0",
    color: "#cce7e8",
  },
  buyButton: {
    display: "inline-block",
    border: "none",
    borderRadius: "25px",
    background: "#005d63",
    padding: "10px 25px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  buyButtonText: {
    color: "#02ffff",
    fontWeight: "bold",
  },
  noPlansMessage: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: "1.5rem",
    marginTop: "50px",
  },
};

export default ProsumerMyContracts;
