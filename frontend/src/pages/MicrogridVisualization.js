import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(BarElement, ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const MicrogridVisualization = () => {
  const [microgridData, setMicrogridData] = useState(null);

  // Fetch data from backend every 1 second
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/simulation/MicrogridData");
        const data = await response.json();
        setMicrogridData(data);
      } catch (err) {
        console.error("Error fetching microgrid data:", err);
      }
    };

    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 1000); // Fetch every 1 second

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
      {microgridData === null ? (
        <p>Loading data...</p>
      ) : Object.keys(microgridData).length === 0 ? (
        <p>No microgrid data available.</p>
      ) : (
        Object.entries(microgridData).map(([microgridKey, microgridValue]) => (
          <Card key={microgridKey} style={{ marginBottom: "20px" }}>
            <Card.Header style={{ background: "#f8f9fa", fontWeight: "bold" }}>
              Microgrid: {microgridKey}
            </Card.Header>
            <Card.Body>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "space-between",
                }}
              >
                {/* Battery Data */}
                <div style={{ flex: "1 1 45%", maxWidth: "45%" }}>
                  {microgridValue.battery && Object.keys(microgridValue.battery).length > 0 ? (
                    <>
                      <h6 style={{ textAlign: "center" }}>Battery Data</h6>
                      <Bar
                        data={{
                          labels: Object.keys(microgridValue.battery).map((id) => `Battery ${id}`),
                          datasets: [
                            {
                              label: "Charge (kWh)",
                              data: Object.values(microgridValue.battery).map((b) => b.charge),
                              backgroundColor: "rgba(75, 192, 192, 0.6)",
                              borderColor: "rgba(75, 192, 192, 1)",
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: true,
                          plugins: { legend: { display: false } },
                          scales: { x: { ticks: { font: { size: 10 } } } },
                        }}
                        height={200}
                      />
                    </>
                  ) : (
                    <p style={{ textAlign: "center" }}>No Battery Data Available</p>
                  )}
                </div>

                {/* Green Energy Data */}
                <div style={{ flex: "1 1 45%", maxWidth: "45%" }}>
                  {microgridValue.green_energy && Object.keys(microgridValue.green_energy).length > 0 ? (
                    <>
                      <h6 style={{ textAlign: "center" }}>Green Energy Data</h6>
                      <Doughnut
                        data={{
                          labels: Object.keys(microgridValue.green_energy).map(
                            (id) => `Green Energy Source ${id}`
                          ),
                          datasets: [
                            {
                              data: Object.values(microgridValue.green_energy).map((g) => g.charge),
                              backgroundColor: [
                                "rgba(255, 99, 132, 0.6)",
                                "rgba(54, 162, 235, 0.6)",
                                "rgba(255, 206, 86, 0.6)",
                              ],
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: true,
                          plugins: { legend: { display: false } },
                        }}
                        height={200}
                      />
                    </>
                  ) : (
                    <p style={{ textAlign: "center" }}>No Green Energy Data Available</p>
                  )}
                </div>

                {/* Grid Data */}
                <div style={{ flex: "1 1 45%", maxWidth: "45%" }}>
                  {microgridValue.grid && Object.keys(microgridValue.grid).length > 0 ? (
                    <>
                      <h6 style={{ textAlign: "center" }}>Grid Data</h6>
                      <Bar
                        data={{
                          labels: Object.keys(microgridValue.grid).map((id) => `Grid ${id}`),
                          datasets: [
                            {
                              label: "Charge (kWh)",
                              data: Object.values(microgridValue.grid).map((g) => g.charge),
                              backgroundColor: "rgba(153, 102, 255, 0.6)",
                              borderColor: "rgba(153, 102, 255, 1)",
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: true,
                          plugins: { legend: { display: false } },
                          scales: { x: { ticks: { font: { size: 10 } } } },
                        }}
                        height={200}
                      />
                    </>
                  ) : (
                    <p style={{ textAlign: "center" }}>No Grid Data Available</p>
                  )}
                </div>

                {/* Load Data */}
                <div style={{ flex: "1 1 45%", maxWidth: "45%" }}>
                  {microgridValue.load && Object.keys(microgridValue.load).length > 0 ? (
                    <div>
                      <h6 style={{ textAlign: "center" }}>Load Data</h6>
                      <p>Load data visualization goes here.</p>
                    </div>
                  ) : (
                    <p style={{ textAlign: "center" }}>No Load Data Available</p>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
};

export default MicrogridVisualization;
