


import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';


const StyledCard = styled.div`
  background-color: ${(props) =>
    props.type === 'vegetable'
      ? '#81c784'
      : props.type === 'fruit'
      ? '#ef5350'
      : '#ffeb3b'};
  color: ${(props) =>
    props.type === 'grain' ? '#000' : '#fff'};
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 270px;
  &:hover {
    transform: scale(1.05); /* Adds a hover effect */
    transition: transform 0.2s;
  }
`;

export function FarmProduct(props) {
  return (
    <center>
    <div className="col-md-3 my-3">
      <StyledCard type={props.type} className="card text-center p-3">
        <div className="card-body">
          <h5 className="card-title">{props.pname}</h5>
          <p className="card-text">
            <strong>Type:</strong> {props.type}
          </p>
          <p className="card-text">
            <strong>Quantity:</strong> {props.quantity}
          </p>
        </div>
      </StyledCard>
    </div>
    </center>
  );
}


FarmProduct.propTypes = {
  quantity: (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value !== 'number') {
      return new Error(`${propName} in ${componentName} must be a number.`);
    }

    if (value < 1 || value > 10) {
      return new Error(`${propName} in ${componentName} must be between 1 and 10.`);
    }
    return null;
  },
  type: (props, propName, componentName) => {
    const value = props[propName];
    const types = ['vegetable', 'fruit', 'grain'];
    if (!types.includes(value)) {
      return new Error(`${propName} in ${componentName} must be one of: ${types.join(', ')}.`);
    }
    return null;
  },
};
