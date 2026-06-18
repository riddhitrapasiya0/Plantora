import React, { useContext } from "react";
import { FarmerContext } from "./FarmerContext";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddFarmProduct } from "./AddFarmProduct";


// Styled component for dynamic background color
const StyledCard = styled.div`
  background-color: ${(props) =>
    props.type === "vegetable"
      ? "#81c784" // Green
      : props.type === "fruit"
      ? "#ef5350" // Red
      : "#ffeb3b"}; // Yellow
  color: ${(props) => (props.type === "grain" ? "#000" : "#fff")}; // Black text for grain, white for others
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 300px;
  &:hover {
    transform: scale(1.05); /* Adds a hover effect */
    transition: transform 0.2s;
  }
`;

export function FarmProductList() {
  const { farmerState, removeFarmProduct, addFarmProduct } = useContext(FarmerContext);

  // Callback to add a new product
  const handleAddProduct = (newProduct) => {
    const newId = farmerState.farmProducts.length
      ? farmerState.farmProducts[farmerState.farmProducts.length - 1].id + 1
      : 1; // Generate a new unique ID

    addFarmProduct({ ...newProduct, id: newId }); // Add product via context
  };

  return (
    <div className="container mt-4">
      <div className="farm-product-list">
        <center>
          <h3>Farm Products List</h3>
        </center>
        <div className="row">
          {farmerState.farmProducts.length > 0 ? (
            farmerState.farmProducts.map((product) => (
              <div key={product.id} className="col-md-4 col-sm-6 col-lg-3 mb-4">
                <StyledCard
                  type={product.category}
                  className="card text-center p-3 h-100"
                >
                  <div className="card-body">
                    <div className="product-item">
                      <h5 className="card-title">
                        <strong >{product.id}</strong>
                      </h5>
                      <p><strong>{product.name}</strong> ({product.category})</p>
                      <p className="card-text">Quantity: {product.quantity} kg</p>
                      <p className="card-text">Price: {product.pricePerUnit} per unit</p>
                      <p className="card-text">Harvest Date: {product.harvestDate}</p>
                      <p className="card-text">Storage: {product.storageConditions}</p>
                      <p className="card-text">Organic: {product.organicCertification}</p>
                      <p className="card-text">Pesticide Use: {product.pesticideUse}</p>
                      <p className="card-text">Notes: {product.notes}</p>
                      <button
                        className="btn btn-danger mt-3"
                        onClick={() => removeFarmProduct(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </StyledCard>
              </div>
            ))
          ) : (
            <center>
              <p className="text-muted">No products available.</p>
            </center>
          )}
        </div>
        <center className="mt-5">
          <AddFarmProduct onAddProduct={handleAddProduct} />
        </center>
      </div>
    </div>
  );
}
