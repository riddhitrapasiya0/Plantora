import React, { useState } from "react";
import api from "../api";

export function FarmerForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: {
      phone: "",
      email: "",
    },
    farmLocation: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "email") {
      setFormData({
        ...formData,
        contact: { ...formData.contact, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logging the form data for debugging
    console.log("Submitting Data:", formData);

    // Validation
    if (!formData.name || !formData.contact.phone || !formData.contact.email) {
      setMessage("Name, Phone, and Email are required.");
      return;
    }

    try {
      await api.post("/api/farmers", formData);
      setMessage("Farmer added successfully!");
      setFormData({
        name: "",
        contact: { phone: "", email: "" },
        farmLocation: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage(error.response?.data?.error || "An unexpected error occurred.");
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Add Farmer</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="name">Name</label>
          <input
            style={styles.input}
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="phone">Phone</label>
          <input
            style={styles.input}
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter Phone"
            value={formData.contact.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            style={styles.input}
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            value={formData.contact.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="farmLocation">Farm Location</label>
          <input
            style={styles.input}
            type="text"
            name="farmLocation"
            id="farmLocation"
            placeholder="Enter Farm Location"
            value={formData.farmLocation}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={styles.submitButton}>Add Farmer</button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

// Styling object for the components
const styles = {
  formContainer: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "100%",
    boxSizing: "border-box",
  },
  submitButton: {
    padding: "12px",
    backgroundColor: "#40916c",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  message: {
    textAlign: "center",
    marginTop: "20px",
    color: "#40916c",
    fontSize: "1.1rem",
  },
};