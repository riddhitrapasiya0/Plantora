import React, { useState, useEffect } from "react";
import api from "../api";

export function CropForm() {
  const [farmers, setFarmers] = useState([]);
  const [formData, setFormData] = useState({
    farmerId: "",
    cropName: "",
    category: "",
    quantity: "",
    unit: "",
    pricePerUnit: "",
    harvestSeason: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchFarmers = async () => {
      const response = await api.get("/api/farmers/get-farmers");
      setFarmers(response.data.data);
    };
    fetchFarmers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData.cropName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.farmerId || !formData.cropName || !formData.category) {
      setMessage("All fields are required.");
      return;
    }

    try {
      const response = await api.post(`/api/farmers/${formData.farmerId}/crops`, formData);
      setMessage(response.data.message);
      setFormData({
        farmerId: "",
        cropName: "",
        category: "",
        quantity: "",
        unit: "",
        pricePerUnit: "",
        harvestSeason: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to add crop.");
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Add Crop</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="farmerId">Select Farmer</label>
          <select
            name="farmerId"
            value={formData.farmerId}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Farmer</option>
            {farmers.map((farmer) => (
              <option key={farmer.farmerId} value={farmer.farmerId}>
                {farmer.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="cropName">Crop Name</label>
          <input
            style={styles.input}
            type="text"
            name="cropName"
            id="cropName"
            placeholder="Crop Name"
            value={formData.cropName}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="category">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Category</option>
            <option value="Grains">Grains</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
          </select>
        </div>

        {formData.category === "Grains" && (
          <div style={styles.inputContainer}>
            <label style={styles.label} htmlFor="harvestSeason">Harvest Season</label>
            <input
              style={styles.input}
              type="text"
              name="harvestSeason"
              id="harvestSeason"
              placeholder="Harvest Season"
              value={formData.harvestSeason}
              onChange={handleChange}
            />
          </div>
        )}

        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="quantity">Quantity</label>
          <input
            style={styles.input}
            type="number"
            name="quantity"
            id="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="unit">Unit</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Unit</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="liters">Liters</option>
            <option value="ml">Milliliters (ml)</option>
            <option value="dozen">Dozen</option>
            <option value="pieces">Pieces</option>
          </select>
        </div>


        <div style={styles.inputContainer}>
          <label style={styles.label} htmlFor="pricePerUnit">Price Per Unit</label>
          <input
            style={styles.input}
            type="number"
            name="pricePerUnit"
            id="pricePerUnit"
            placeholder="Price Per Unit"
            value={formData.pricePerUnit}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={styles.submitButton}>Add Crop</button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

// Styling object for the components
const styles = {
  formContainer: {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "30px",
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
    padding: "12px",
    fontSize: "1rem",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "100%",
    boxSizing: "border-box",
  },
  submitButton: {
    padding: "14px",
    backgroundColor: "#40916c",
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  submitButtonHover: {
    backgroundColor: "#2c6e4d",
  },
  message: {
    textAlign: "center",
    marginTop: "20px",
    color: "#40916c",
    fontSize: "1.1rem",
  },
};