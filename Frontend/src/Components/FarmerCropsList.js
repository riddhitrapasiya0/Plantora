import React, { useState, useEffect } from "react";
import api from "../api";

export function FarmerCropsList() {
  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await api.get("/api/farmers/get-farmers");
        console.log("Fetched farmers data:", response.data);
        setFarmers(response.data.data);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };
    fetchFarmers();
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2 style={styles.heading}>Farmers and Their Crops</h2>
      {farmers.map((farmer) => (
        <div key={farmer.farmerId} style={styles.farmerContainer}>
          {/* Farmer Details */}
          <h3 style={styles.farmerName}>
            {farmer.name} (ID: {farmer.farmerId})
          </h3>
          <p><strong>Location:</strong> {farmer.farmLocation}</p>

          {/* Crops Table */}
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Crop ID</th>
                <th style={styles.tableHeader}>Crop Name</th>
                <th style={styles.tableHeader}>Category</th>
                <th style={styles.tableHeader}>Quantity</th>
                <th style={styles.tableHeader}>Unit</th>
                <th style={styles.tableHeader}>Price per Unit</th>
              </tr>
            </thead>
            <tbody>
              {farmer.producedCrops.map((crop) => (
                <tr key={crop.cropId} style={styles.tableRow}>
                  <td style={styles.tableData}>{crop.cropId}</td>
                  <td style={styles.tableData}>{crop.cropName}</td>
                  <td style={styles.tableData}>{crop.category}</td>
                  <td style={styles.tableData}>{crop.quantity}</td>
                  <td style={styles.tableData}>{crop.unit}</td>
                  <td style={styles.tableData}>₹{crop.pricePerUnit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

// Styling object for the components
const styles = {
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    color: "black",
    marginBottom: "20px",
  },
  farmerContainer: {
    marginBottom: "30px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  farmerName: {
    color: "#333",
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
  tableHeader: {
    backgroundColor: "#40916c",
    color: "#fff",
    padding: "10px 15px",
    textAlign: "left",
    fontSize: "1.1rem",
  },
  tableRow: {
    backgroundColor: "#f2f2f2",
    borderBottom: "1px solid #ddd",
  },
  tableData: {
    padding: "10px 15px",
    textAlign: "left",
    fontSize: "1rem",
  },
};