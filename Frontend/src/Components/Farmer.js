import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS



// Styled-component for the FarmerCard container
const StyledCard = styled.div`
  background-color: #74c69d;
  border-radius: 15px !important; /* Overrides Bootstrap default */
  color: black;
  width:250px;
  height:100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin: 15px;
  &:hover {
    transform: scale(1.05); /* Adds a hover effect */
    transition: transform 0.2s;
  }
`;

export function Farmer(props) {
  return (
    <center>
    <StyledCard className="card text-center ">
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">Age: {props.age}</p>
        <p className="card-text">Location: {props.location || "Not Specified"}</p>
      </div>
    </StyledCard>
    </center>
  );
}

// Farmer component validation
Farmer.propTypes = {
  name: propTypes.string.isRequired,
  age: propTypes.number.isRequired,
  location: propTypes.string,
};
