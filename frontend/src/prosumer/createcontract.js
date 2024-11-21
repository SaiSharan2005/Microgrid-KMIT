import React, { useState } from "react";
import { decryptAES } from "../hooks/encryption";
import ProsumerNavbar from "./navbar";

export default function ProducerCreateContract() {
  const [isHovered, setIsHovered] = useState(false);

  // Styles
  const containerStyles = {
    backgroundColor: '#010c0e',
    color: 'white',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    maxWidth: '400px',
    margin: '50px auto',
  };

  const inputStyles = {
    width: '90%',
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #4CAF50',
    backgroundColor: '#1C1C1C',
    color: 'white',
    margin: '10px 0',
    textAlign: 'center',
  };

  const buttonStyles = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderRadius: '20px',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
  };

  const buttonHoverStyles = {
    transform: 'scale(1.05)',
    backgroundColor: '#388E3C',
  };

  // Add Plan Logic
  async function add() {
    const gstNumber = decryptAES(localStorage.getItem("gstNumber"));
    const units = document.getElementById("units").value;
    const timespan = document.getElementById("timespan").value;

    try {
      const gstResponse = await fetch(process.env.REACT_APP_BackendUrl + "/getGst", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gst_number: gstNumber }),
      });
      const gstData = await gstResponse.json();

      const addPlanResponse = await fetch(process.env.REACT_APP_BackendUrl + "/addPlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gst_number: gstNumber,
          microGridId: Number(decryptAES(localStorage.getItem("microGridId"))),
          units: Number(units),
          timespan: Number(timespan),
          mobile_number: Number(gstData.phone_number),
          company_name: gstData.company_name,
        }),
      });

      if (!addPlanResponse.ok) throw new Error("Failed to create plan");

      alert("Plan successfully created!");
    } catch (error) {
      console.error("Error creating plan:", error);
    }
  }

  return (
    <>
              <ProsumerNavbar />
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '20px' }}>

      <div style={containerStyles}>
        <h2>Create Plan</h2>
        <input
          type="number"
          id="units"
          placeholder="Enter Units"
          style={inputStyles}
          />
        <input
          type="number"
          id="timespan"
          placeholder="Enter Timespan (in days)"
          style={inputStyles}
        />
        <button
          style={isHovered ? { ...buttonStyles, ...buttonHoverStyles } : buttonStyles}
          onClick={add}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          >
          Add Plan
        </button>
      </div>
    </div>
          </>
  );
}
