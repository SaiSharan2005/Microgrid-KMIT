import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import ConsumerNavbar from "./navbar";

const encryptionKey =
  "00112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF";

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#001518",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "white",
  },
  title: {
    textAlign: "center",
    fontSize: "1.8rem",
    marginBottom: "20px",
    color: "#02ffff",
  },
  card: {
    width: "70%",
    margin: "20px auto",
    padding: "20px",
    background: "linear-gradient(45deg, #001e20, #003d46)",
    border: "2px solid #02ffff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  section: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  text: {
    margin: "0",
    fontSize: "1rem",
  },
  noDataMessage: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginTop: "20px",
    color: "#ccc",
  },
};

export default function ConsumerHistory() {
  const [Dictionary, setDictionary] = useState([]);

  function decryptAES(encryptedText) {
    return CryptoJS.AES.decrypt(encryptedText, encryptionKey).toString(
      CryptoJS.enc.Utf8
    );
  }

  async function fetchTransactions(id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BackendUrl}/getAllTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ microid: id }),
        }
      );
      const responseData = await response.json();
      console.log("Server response:", responseData);
      setDictionary(responseData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  useEffect(() => {
    const micrometerId = decryptAES(localStorage.getItem("micrometerid"));
    fetchTransactions(micrometerId);
  }, []);

  return (
    <div style={styles.container}>
      <ConsumerNavbar />
      <h1 style={styles.title}>Transaction History</h1>
      {Dictionary.length > 0 ? (
        Dictionary.map((item, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.section}>
              <p style={styles.text}>
                <strong>Name:</strong> {item.name}
              </p>
              <p style={styles.text}>
                <strong>Micro Meter ID:</strong> {item.microid}
              </p>
              <p style={styles.text}>
                <strong>Balance:</strong> {item.units} Units
              </p>
              <p style={styles.text}>
                <strong>From Battery:</strong> {item.fromBattery}
              </p>
            </div>
            <div style={styles.section}>
              <p style={styles.text}>
                <strong>From Green Energy:</strong> {item.fromGE}
              </p>
              <p style={styles.text}>
                <strong>From Grid:</strong> {item.fromGrid}
              </p>
              <p style={styles.text}>
                <strong>Amount:</strong> {Number(item.amount.hex)} WEI
              </p>
              <p style={styles.text}>
                <strong>Date Time:</strong> {item.dateTime}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p style={styles.noDataMessage}>No transactions available.</p>
      )}
    </div>
  );
}
