import React, { useEffect, useState } from "react";
import ConnectToMetaMask from "../hooks/MetaMaskConnection";
import { Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { decryptAES, encryptAES } from "../hooks/encryption";
const flatted = require('flatted');

function AvailableMicrogrid(props) {
  const navigate = useNavigate()
  const [microGridData, setMicroGridData] = useState(null);

  const addConsumerToMicroGrid = async(id) => {
    console.log("add consumer to Microgrid",id,props.metaMaskAddress)
    const data1 = await props.sendContract.addConsumerToMicroGrid(Number(id),props.metaMaskAddress);
    try {
      const response = await fetch(
        process.env.REACT_APP_BackendUrl+"/UpdateConsumer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "microid":decryptAES(localStorage.getItem("micrometerid")),
            "microGridId":Number(id)
          })
        }
      );
      const data = await response.json();
      console.log(microGridData)
      setMicroGridData(data);
    } catch (err) {
      console.log("Something went wrong error: ", err);
    }
    
    navigate("/consumer/login")
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          process.env.REACT_APP_BackendUrl+"/simulation/MicrogridData",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(microGridData)
        setMicroGridData(data);
      } catch (err) {
        console.log("Something went wrong error: ", err);
      }
    }

    // setMicroGridData({
    //   0: {
    //     battery: {
    //       0: {
    //         charge: 100,
    //         efficiency: 0.7,
    //         max_Charge: 100,
    //         charge_per_unit: 10,
    //       },
    //       1: {
    //         charge: 100,
    //         efficiency: 0.7,
    //         max_Charge: 100,
    //         charge_per_unit: 10,
    //       },
    //     },
    //     green_energy: {
    //       0: {
    //         charge_produced: 100,
    //         charge_per_unit: 10,
    //         max_Charge: 1000,
    //       },
    //       1: {
    //         charge_produced: 100,
    //         charge_per_unit: 10,
    //         max_Charge: 1000,
    //       },
    //     },
    //     grid: {
    //       0: {
    //         charge: 1000,
    //         max_export: 1000,
    //         max_import: 500,
    //       },
    //       1: {
    //         charge: 700,
    //         max_export: 900,
    //         max_import: 500,
    //       },
    //     },
    //     load: {
    //       0: { energyRequired: 0 },
    //     },
    //   },
    //   1: {
    //     battery: {
    //       0: {
    //         charge: 100,
    //         efficiency: 0.7,
    //         max_Charge: 100,
    //         charge_per_unit: 10,
    //       },
    //       1: {
    //         charge: 100,
    //         efficiency: 0.7,
    //         max_Charge: 100,
    //         charge_per_unit: 10,
    //       },
    //     },
    //     green_energy: {
    //       0: {
    //         charge_produced: 100,
    //         charge_per_unit: 10,
    //         max_Charge: 1000,
    //       },
    //       1: {
    //         charge_produced: 100,
    //         charge_per_unit: 10,
    //         max_Charge: 1000,
    //       },
    //     },
    //     grid: {
    //       0: {
    //         charge: 1000,
    //         max_export: 1000,
    //         max_import: 500,
    //       },
    //       1: {
    //         charge: 700,
    //         max_export: 900,
    //         max_import: 500,
    //       },
    //     },
    //     load: {
    //       0: { energyRequired: 0 },
    //     },
    //   },
    // });

    fetchData(); // Call the async function inside useEffect
  }, []); // Empty dependency array to run once on mount


  return (
    <div>
      {(microGridData===null || Object.keys(microGridData).length===0)? (
        <p>Sorry Microgrid are not Available  !</p>
      ) : (
          <div class="microgrid-card-details"  >
            {/* <button onClick={connect}>Connect</button> */}
          {Object.entries(microGridData).map(([microgridKey, microgridValue]) => (
            <div key = {microgridKey}onClick={() => addConsumerToMicroGrid(microgridKey)} className="micro-grid">
              <Card key={microgridKey} style={{ width: '18rem', marginBottom: '20px' }}>
                <Card.Body>
                  <Card.Title>Microgrid: {microgridKey}</Card.Title>
                  {Object.entries(microgridValue).map(([key, value]) => (
                    <Card.Text key={key}>
                      {key}: {Object.keys(value).length}
                    </Card.Text>
                  ))}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AvailableMicrogrid;