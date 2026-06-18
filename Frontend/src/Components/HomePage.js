import React from 'react';
import './styles.css'; // Add your custom styles for the Home Page
import { Link } from 'react-router-dom'; // Import Link

export function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to the Farm Management System</h1>
      <p>
        This system helps manage farmers and their products, making it easier
        to track farm operations and maintain data about farm produce.
      </p>
      <div className="home-links">
        <Link to="/farmercard">View Farmers</Link>
        <Link to="/farmproductcard">View Products</Link>
      </div>
    </div>
  );
}
