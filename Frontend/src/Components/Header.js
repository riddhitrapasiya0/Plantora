import React, { useState } from 'react'; // Import useContext hook
import { FarmerContext } from './FarmerContext'; // Import FarmerContext to access state
import { Link } from 'react-router-dom'; // Use Link for navigation
import './styles.css'; // Add your custom styles for the Header
import { Button } from 'bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";


export function Header() {
  // Access the context using useContext
  // const { farmerState, setFarmerState } = useContext(FarmerContext);  // Access farmer's state from context

  // // Function to update farmer's name
  // const updateFarmerName = () => {
  //   const newName = prompt('Enter new farmer name:', farmerState.name);
  //   if (newName) {
  //     setFarmerState(prevState => ({
  //       ...prevState,
  //       name: newName,
  //     }));
  //   }
  // };

  // // Function to update farmer's location
  // const updateFarmerLocation = () => {
  //   const newLocation = prompt('Enter new farm location:', farmerState.location);
  //   if (newLocation) {
  //     setFarmerState(prevState => ({
  //       ...prevState,
  //       location: newLocation,
  //     }));
  //   }
  // };

   // State to manage dropdown visibility
   const [isDropdownVisible, setDropdownVisible] = useState(false);

     // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-title">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Farmer Dashboard
        </div>
        <div className="navbar-menu">
          <Link to="/" className='Button'>Home</Link> {/* Link to Home */}
          <Link to="/farmercard">Farmers</Link> {/* Link to Farmers */}
          <Link to="/farmproductcard">Products</Link> {/* Link to Products */}
          <Link to="/farminventory">Inventory</Link> {/* Link to Inventory */}
          <Link to='/farmproductlist'>Farmer Product List</Link>
          <Link to="/manage">Manage</Link>
          {/* <Link to='/farmerprofile'>Update Profile</Link> */}
        </div>
        
        {/* Display farmer's name and location in the navbar if available */}
        {/* {farmerState.name && (
          <div className="farmer-info">
            <span>{farmerState.name}</span>
            <span>{farmerState.location}</span>
          </div>
        )} */}

        {/* Add buttons for updating farmer information */}
        {/* <div className="navbar-buttons">
          <button onClick={updateFarmerName}>Update Name</button>
          <button onClick={updateFarmerLocation}>Update Location</button>
        </div> */}
      </nav>
    </div>
  );
}
