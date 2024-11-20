import React, { useState } from "react";

const CreateProducerUser = () => {
  const [formData, setFormData] = useState({
    registrant: "",
    name: "",
    designation: "",
    password: "",
    microGridId: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(process.env.REACT_APP_BackendUrl+"/createProducerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Producer user created successfully!");
        setFormData({
          registrant: "",
          name: "",
          designation: "",
          password: "",
          microGridId: "",
        });
      } else {
        setError(result.message || "Failed to create producer user.");
      }
    } catch (err) {
      setError("An error occurred while creating the producer user.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1>Create Producer User</h1>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="registrant">Registrant</label>
          <input
            type="text"
            id="registrant"
            name="registrant"
            value={formData.registrant}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="designation">Designation</label>
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          >
            <option value="">Select Designation</option>
            <option value="Chief Engineer">Chief Engineer</option>
            <option value="Superintendent Engineer">Superintendent Engineer</option>
            <option value="Divisional Engineer">Divisional Engineer</option>
            <option value="Assistant Director">Assistant Director</option>
            <option value="Assistant Engineer">Assistant Engineer</option>
            <option value="Assistant Sub-Engineer">Assistant Sub-Engineer</option>
            <option value="Foreman">Foreman</option>
            <option value="Line Inspector">Line Inspector</option>
            <option value="Lineman">Lineman</option>
            <option value="Junior Lineman">Junior Lineman</option>
            <option value="Assistant Lineman">Assistant Lineman</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="microGridId">MicroGrid ID</label>
          <input
            type="number"
            id="microGridId"
            name="microGridId"
            value={formData.microGridId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "blue",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Producer User
        </button>
      </form>
    </div>
  );
};

export default CreateProducerUser;
