import React, { useContext, useState } from "react";
import { FarmerContext } from "./FarmerContext";
import "bootstrap/dist/css/bootstrap.min.css";

export function FarmerProfile() {
  const { farmerState, updateFarmerProfile } = useContext(FarmerContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: farmerState.name,
    contact: farmerState.contact,
    location: farmerState.location,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    updateFarmerProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="container mt-4 ">
      <div className="card p-4 w-50 ">
        <h3>Farmer Profile</h3>
        <div className="mt-3">
          {!isEditing ? (
            <div>
              <p><strong>Name:</strong> {farmerState.name}</p>
              <p><strong>Contact:</strong> {farmerState.contact}</p>
              <p><strong>Location:</strong> {farmerState.location}</p>
              <button
                className="btn btn-success mt-2"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            </div>
            
          ) : (
            <div>
              <div className="mb-3 text-start">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3 text-start">
                <label className="form-label">Contact</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3 text-start">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <button className="btn btn-success me-2" onClick={handleSave}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div><br/><br/><br/><br/><br/>
    </div>
  );
}
