import React from 'react'; // Import useContext hook
import { Link } from 'react-router-dom'; // Use Link for navigation
import './styles.css'; // Add your custom styles for the Header
import "bootstrap/dist/css/bootstrap.min.css";


export function Header() {

   // State to manage dropdown visibility
  //  const [isDropdownVisible, setDropdownVisible] = useState(false);

     // Toggle dropdown visibility
  // const toggleDropdown = () => {
  //   setDropdownVisible(!isDropdownVisible);
  // };

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
      </nav>
    </div>
  );
}
