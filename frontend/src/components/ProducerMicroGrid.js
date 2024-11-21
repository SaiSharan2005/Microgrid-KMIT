import React, { useEffect, useState } from "react";
import ConnectToMetaMask from "../hooks/MetaMaskConnection";
import { Card, ListGroup, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { encryptAES, decryptAES } from "../hooks/encryption.js";
import "./AvailableMicrogrid.css"; // Add a custom CSS file for extra styling

function AvailableMicrogrid() {
  const navigate = useNavigate();
  const [tem, setTem] = useState("");
  const [microGridData, setMicroGridData] = useState(null);

  // Function to connect to MetaMask and set contract instance
  async function connect() {
    try {
      const { sendDataContract } = await ConnectToMetaMask();
      setTem(sendDataContract);
    } catch (error) {
      console.error("Error connecting to MetaMask: ", error);
    }
  }

  // Fetch microgrid data from the backend
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BackendUrl}/simulation/MicrogridData`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Retrieve selected microgrid using localStorage decryption
        const selectedMicroGridId = decryptAES(localStorage.getItem("microGridId"));
        setMicroGridData(data[Number(selectedMicroGridId)] || data);

        console.log("Fetched Microgrid Data: ", data);
      } catch (err) {
        console.error("Error fetching microgrid data: ", err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      {/* Check if microgrid data is unavailable */}
      {microGridData === null || Object.keys(microGridData).length === 0 ? (
        <div className="text-center no-data">
          <h4>No Microgrids Available</h4>
          <p>Be the first to create a microgrid and explore its potential!</p>
        </div>
      ) : (
        <div className="row">
          {/* Map through each microgrid and display its data */}
          {Object.entries(microGridData).map(([microgridKey, microgridValue]) => (
            <div className="col-lg-4 col-md-6 mb-4" key={microgridKey}>
              <Card className="shadow microgrid-card">
                <Card.Header className="bg-dark text-white">
                  <h5>Microgrid ID: <Badge bg="info">{microgridKey}</Badge></h5>
                </Card.Header>
                <Card.Body>
                  {Object.entries(microgridValue).map(([sectionKey, sectionValue]) => (
                    <div key={sectionKey} className="mb-3">
                      <h6 className="section-title">{sectionKey.toUpperCase()}</h6>
                      {Object.keys(sectionValue).length > 0 ? (
                        <ListGroup variant="flush">
                          {Object.entries(sectionValue).map(([key, value]) => (
                            <ListGroup.Item key={key} className="list-item">
                              <strong>{key}:</strong>{" "}
                              {typeof value === "object"
                                ? JSON.stringify(value, null, 2)
                                : value}
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      ) : (
                        <p className="text-muted">No data available for {sectionKey}.</p>
                      )}
                    </div>
                  ))}
                </Card.Body>
                <Card.Footer className="text-center bg-light">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/microgrid/${microgridKey}`)}
                  >
                    View Details
                  </button>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AvailableMicrogrid;
