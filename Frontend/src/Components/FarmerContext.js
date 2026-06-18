import React, { createContext, useState } from "react";

// Creating a context for farmer
export const FarmerContext = createContext();

export function FarmerProvider({ children }) {
  const [farmerState, setFarmerState] = useState({
    id: "F001",
    name: "Rajendra Patel",
    contact: "+91 9876543210",
    location: "Gujarat",
    farmProducts: [
      {
        id: 1,
        name: "Rice", // Updated product name
        category: "grain",
        quantity: 500,
        pricePerUnit: 50, // Updated price
        harvestDate: "2024-10-01",
        storageConditions: "Cool and dry",
        organicCertification: "Yes",
        pesticideUse: "None",
        notes: "Premium quality golden rice, ideal for baking.",
      },
      {
        id: 2,
        name: "Orange", // Updated product name
        category: "fruit",
        quantity: 300,
        pricePerUnit: 180, // Updated price
        harvestDate: "2024-09-20",
        storageConditions: "Refrigerated",
        organicCertification: "No",
        pesticideUse: "Yes",
        notes: "Crisp and sweet orange from the valleys of Kashmir.",
      },
      {
        id: 3,
        name: "Potato", // Updated product name
        category: "vegetable",
        quantity: 40,
        pricePerUnit: 25, // Updated price
        harvestDate: "2024-09-20",
        storageConditions: "Cool",
        organicCertification: "Yes",
        pesticideUse: "No",
        notes: "King of all vegetables, rich in fiber and nutrients.",
      },
    ],
  });

  const addFarmProduct = (newProduct) => {
    const newId = farmerState.farmProducts.length
      ? farmerState.farmProducts[farmerState.farmProducts.length - 1].id + 1
      : 1;
  
    setFarmerState((prevState) => ({
      ...prevState,
      farmProducts: [
        ...prevState.farmProducts,
        {
          ...newProduct,
          id: newId,
          name: newProduct.productName, // Map productName to name
          organicCertification: newProduct.organicCertification ? "Yes" : "No", // Normalize boolean to string
        },
      ],
    }));
  };
  
  // Function to remove a product
  const removeFarmProduct = (productId) => {
    const productExists = farmerState.farmProducts.some(
      (product) => product.id === productId
    );
    if (!productExists) {
      alert("Product not found.");
      return;
    }

    setFarmerState((prevState) => ({
      ...prevState,
      farmProducts: prevState.farmProducts.filter(
        (product) => product.id !== productId
      ),
    }));
  };

  // Function to update farmer profile
  const updateFarmerProfile = (updatedInfo) => {
    if (!updatedInfo.name || !updatedInfo.contact || !updatedInfo.location) {
      alert("Name, contact, and location are required fields!");
      return;
    }

    setFarmerState((prevState) => ({
      ...prevState,
      ...updatedInfo,
    }));
  };

  return (
    <FarmerContext.Provider
      value={{
        farmerState,
        addFarmProduct,
        removeFarmProduct,
        updateFarmerProfile,
      }}
    >
      {children}
    </FarmerContext.Provider>
  );
}
