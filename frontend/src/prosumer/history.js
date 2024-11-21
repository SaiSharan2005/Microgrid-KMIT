import React, { useState, useEffect } from "react";
import myImage from "../images/5.jpg";
import CryptoJS from "crypto-js";
import ProsumerNavbar from "./navbar";

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: "#001518",
    padding: "20px",
    color: "white",
  },
  card: {
    width: "70%",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px",
    background: "linear-gradient(45deg, #001e20, #003d46)",
    border: "2px solid #02ffff",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "20px",
  },
  cardSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
  },
  pre: {
    color: "white",
    margin: 0,
    fontSize: "1rem",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#02ffff",
  },
};

const encryptionKey =
  "00112233445566778899AABBCCDDEEFF00112233445566778899AABBCCDDEEFF";

export default function ProsumerHistory() {
  const [Dictionary, setDictionary] = useState([]);

  function decryptAES(encryptedText) {
    return CryptoJS.AES.decrypt(encryptedText, encryptionKey).toString(
      CryptoJS.enc.Utf8
    );
  }

  async function fetchData(microGridId) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BackendUrl}/getAllTransaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ microGridId }),
        }
      );
      const data = await response.json();
      console.log("Server response:", data);
      setDictionary(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    const microGridId = decryptAES(localStorage.getItem("microGridId"));
    fetchData(microGridId);
  }, []);

  return (
    <div style={styles.container}>
      <ProsumerNavbar />
      <h1 style={styles.title}>Transaction History</h1>
      {Dictionary.map((item, outerIndex) => (
        <div key={outerIndex} style={styles.card}>
          <div style={styles.cardSection}>
            <pre style={styles.pre}>Name: {item["name"]}</pre>
            <pre style={styles.pre}>Micro Meter ID: {item["microid"]}</pre>
            <pre style={styles.pre}>Balance: {item["units"]} Units</pre>
            <pre style={styles.pre}>From Battery: {item["fromBattery"]}</pre>
          </div>
          <div style={styles.cardSection}>
            <pre style={styles.pre}>
              From Green Energy: {item["fromGE"]}
            </pre>
            <pre style={styles.pre}>From Grid: {item["fromGrid"]}</pre>
            <pre style={styles.pre}>
              Amount: {Number(item["amount"].hex)} WEI
            </pre>
            <pre style={styles.pre}>Date Time: {item["dateTime"]}</pre>
          </div>
        </div>
      ))}
    </div>
  );
}
