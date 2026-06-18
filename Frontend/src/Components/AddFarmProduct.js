// import React, { useState, useContext } from "react";
// import { FarmerContext } from "./FarmerContext";

// export function AddFarmProduct() {
//   const { addFarmProduct } = useContext(FarmerContext);

//   const [productName, setProductName] = useState("");
//   const [productType, setProductType] = useState("vegetable");
//   const [quantity, setQuantity] = useState(1);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newProduct = {
//       id: Date.now(),
//       name: productName,
//       type: productType,
//       quantity: quantity
//     };
//     addFarmProduct(newProduct);
//     setProductName("");
//     setQuantity(1);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3>Add Farm Product</h3>
//       <input
//         type="text"
//         value={productName}
//         onChange={(e) => setProductName(e.target.value)}
//         placeholder="Product Name"
//         required
//       />
//       <select value={productType} onChange={(e) => setProductType(e.target.value)}>
//         <option value="vegetable">Vegetable</option>
//         <option value="fruit">Fruit</option>
//         <option value="grain">Grain</option>
//       </select>
//       <input
//         type="number"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//         min="1"
//         max="10"
//         required
//       />
//       <button type="submit">Add Product</button>
//     </form>
//   );
// }


import React, { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../api";

const FormSection = styled.div`
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
`;

export const AddFarmProduct = ({ onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({
    farmerId: "",
    productName: "",
    category: "",
    quantity: "",
    unit: "",
    pricePerUnit: "",
    harvestSeason: "",
    harvestDate: "",
    storageConditions: "",
    organicCertification: false,
    pesticideUse: "",
    notes: "",
  });

  const [farmers, setFarmers] = useState([]);

  useEffect(() => {
    const fetchFarmers = async () => {
      const response = await api.get("/api/farmers/get-farmers");
      setFarmers(response.data.data);
    };
    fetchFarmers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    onAddProduct(newProduct);
    setNewProduct({
      farmerId: "",
      productName: "",
      category: "",
      quantity: "",
      unit: "",
      pricePerUnit: "",
      harvestSeason: "",
      harvestDate: "",
      storageConditions: "",
      organicCertification: false,
      pesticideUse: "",
      notes: "",
    });
  };

  return (
    <div>
      <FormSection>
      <h2>Add New Product</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Select Farmer</label>
            <select
              name="farmerId"
              value={newProduct.farmerId}
              onChange={handleInputChange}
              className="form-control"
              required
            >
              <option value="">Select Farmer</option>
              {farmers.map(farmer => (
                <option key={farmer.farmerId} value={farmer.farmerId}>
                  {farmer.farmerId} - {farmer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={newProduct.productName}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Category</label>
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="form-control"
              required
            >
              <option value="">Select Category</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Grain">Grain</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label>Unit</label>
            <select
              name="unit"
              value={newProduct.unit}
              onChange={handleInputChange}
              className="form-control"
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
          <div className="col-md-3 mb-3">
            <label>Price Per Unit</label>
            <input
              type="number"
              name="pricePerUnit"
              value={newProduct.pricePerUnit}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label>Harvest Season</label>
            <input
              type="text"
              name="harvestSeason"
              value={newProduct.harvestSeason}
              onChange={handleInputChange}
              className="form-control"
              placeholder="e.g., Winter 2024"
            />
          </div>
          <div className="col-md-3 mb-3">
            <label>Harvest Date</label>
            <input
              type="date"
              name="harvestDate"
              value={newProduct.harvestDate}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Storage Conditions</label>
            <select
              name="storageConditions"
              value={newProduct.storageConditions}
              onChange={handleInputChange}
              className="form-control"
            >
              <option value="">Select Storage Condition</option>
              <option value="Cool and dry">Cool and dry</option>
              <option value="Refrigerated">Refrigerated</option>
              <option value="Room temperature">Room temperature</option>
              <option value="Cool and dark">Cool and dark</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label>Organic Certification</label>
            <input
              type="checkbox"
              name="organicCertification"
              checked={newProduct.organicCertification}
              onChange={handleInputChange}
              className="form-check-input"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Pesticide Use</label>
            <input
              type="text"
              name="pesticideUse"
              value={newProduct.pesticideUse}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Notes</label>
            <textarea
              name="notes"
              value={newProduct.notes}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="col-md-12">
            <button type="submit" className="btn btn-success">
              Add Product
            </button>
          </div>
        </div>
      </form>
      </FormSection>
    </div>
  );
};


