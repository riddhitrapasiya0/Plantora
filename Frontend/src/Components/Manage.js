// import React from "react";
// import { Link } from "react-router-dom";
// import { CropForm } from "./CropForm";
// import { FarmerForm } from "./FarmerForm";
// import { FarmerCropsList } from "./FarmerCropsList";

// export function ManageMenu() {
//   return (
//     <>
//     <div className="links">
//       <Link to="/addfarmer">Add Farmer</Link>
//       <Link to="/addcrop">Add Crops</Link>
//       <Link to="/farmercroplist">Farmer Product List</Link>
//     </div>
//     <CropForm />
//     <FarmerForm/>
//     <FarmerCropsList/>
//     <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
//     </>
//   );
// }


import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { CropForm } from "./CropForm";
import { FarmerForm } from "./FarmerForm";
import { FarmersList } from "./FarmersList";
// import { FarmerCropsList } from "./FarmerCropsList";
import './styles.css';

export function ManageMenu() {
  const [activeForm, setActiveForm] = useState(null);

  const handleFormSelection = (form) => {
    setActiveForm(form);
  };

  return (
    <>
      <div className="links">
        {/* Setting active form on button click */}
        <button onClick={() => handleFormSelection("farmer")}>Add Farmer</button>
        <button onClick={() => handleFormSelection("crop")}>Add Crop</button>
        <button onClick={() => handleFormSelection("list")}>Farmer Product List</button>
      </div>

      {/* Conditional rendering of forms */}
      <div className="form-container">
        {activeForm === "farmer" && <FarmerForm />}
        {activeForm === "crop" && <CropForm />}
        {activeForm === "list" && <FarmersList />}
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>
  );
}
