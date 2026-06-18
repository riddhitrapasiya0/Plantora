import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddFarmProduct } from "./AddFarmProduct";
import api from "../api";

const StyledCard = styled.div`
  background-color: ${(props) =>
    props.category?.toLowerCase().includes("vegetable")
      ? "#81c784"
      : props.category?.toLowerCase().includes("fruit")
      ? "#ef5350"
      : props.category?.toLowerCase().includes("grain")
      ? "#ffeb3b"
      : "#90a4ae"};
  color: ${(props) => (props.category?.toLowerCase().includes("grain") ? "#000" : "#fff")};
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  height: 100%;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

export const FarmInventory = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await api.get("/api/crops/get-all");
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const dataToSend = {
        ...newProduct,
        cropName: newProduct.productName
      };
      delete dataToSend.productName;
      await api.post(`/api/farmers/${newProduct.farmerId}/crops`, dataToSend);
      await fetchData();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Farm Inventory Manager</h1>

      <div className="row">
        {product.length > 0 ? (
          product.map((item) => (
            <div className="col-md-4 mb-4" key={item.cropId}>
              <StyledCard category={item.category}>
                <h5>{item.farmerId ? `Farmer: ${item.farmerName} (${item.farmerId})` : 'No Farmer'}</h5>
                <h6>{item.cropName}</h6>
                <p>
                  <strong>Category:</strong> {item.category} <br />
                  <strong>Quantity:</strong> {item.quantity} {item.unit} <br />
                  <strong>Price:</strong> ${item.pricePerUnit} <br />
                  {item.harvestDate && <><strong>Harvest Date:</strong> {new Date(item.harvestDate).toLocaleDateString()} <br /></>}
                  {item.storageConditions && <><strong>Storage Conditions:</strong> {item.storageConditions} <br /></>}
                  <strong>Organic:</strong> {item.organicCertification ? "Yes" : "No"} <br />
                  {item.pesticideUse && <><strong>Pesticide Use:</strong> {item.pesticideUse} <br /></>}
                  {item.notes && <><strong>Notes:</strong> {item.notes}</>}
                </p>
              </StyledCard>
            </div>
          ))
        ) : (
          <p className="text-center">No products available</p>
        )}
      </div>

      <div className="mt-5">
        <AddFarmProduct onAddProduct={handleAddProduct} />
      </div>
    </div>
  );
};