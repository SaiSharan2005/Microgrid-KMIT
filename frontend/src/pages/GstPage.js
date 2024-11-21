
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GstPage = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    gst_number: "",
    phone_number: "",
    company_name: "",
    address: "",
  });

  // State for storing GST users
  const [gstUsers, setGstUsers] = useState([]);

  // State for loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch GST users on component load
  useEffect(() => {
    fetchAllGstUsers();
  }, []);

  // Fetch all GST users
  const fetchAllGstUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(process.env.REACT_APP_BackendUrl+"/getAllGst"); // Adjust your endpoint
      if (!response.ok) throw new Error("Failed to fetch GST users.");
      const data = await response.json();
      setGstUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(process.env.REACT_APP_BackendUrl+"/addGst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to add GST user.");
      const newUser = await response.json();
      setGstUsers([...gstUsers, newUser]); // Add new user to the list
      setFormData({ gst_number: "", phone_number: "", company_name: "", address: "" }); // Reset form
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">GST User Management</h2>

      {/* Error Message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Add GST User Form */}
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label htmlFor="gst_number" className="form-label">
            GST Number
          </label>
          <input
            type="text"
            name="gst_number"
            value={formData.gst_number}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="company_name" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {loading ? "Adding..." : "Add GST User"}
        </button>
      </form>

      {/* Show All GST Users */}
      <h3>All GST Users</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>GST Number</th>
              <th>Phone Number</th>
              <th>Company Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {gstUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.gst_number}</td>
                <td>{user.phone_number}</td>
                <td>{user.company_name}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GstPage;