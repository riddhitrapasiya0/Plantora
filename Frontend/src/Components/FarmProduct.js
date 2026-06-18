// import React from 'react'
// import propTypes from 'prop-types'
// import './styles.css';
// import styled from 'styled-components';

// const ProductCard = styled.div`
//   background-color: ${props => 
//     props.type === 'vegetable' ? '#81c784' :
//     props.type === 'fruit' ? '#ef5350' :
//     '#ffeb3b'};  /* Green, Red, Yellow based on product type */
//     padding: 10px;
//     margin: 10px;
//     width: calc(22.33% - 40px);
//     /* width: 300px; Adjust width of each card */
//     height: 350px;
//     box-sizing: border-box;
//     text-align: center;
//     border-radius: 15px;
//     box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
//     justify-content: center; /* Center items vertically */
//     align-items: center; /* Center items horizontally */
//     display: flex; /* Enable Flexbox */
// `;


// export function FarmProduct(props)
// {
   
//     return(
//         <ProductCard type = {props.type}>
//             {/* <h1>Product</h1> */}
//             {props.pname}
//             <br/>
//             {props.type}
//             <br/>
//             {props.quantity}
//             <br/>
//             <br/>
//         </ProductCard>
//     );
// }




// //FarmProduct component validation
// FarmProduct.propTypes = 
// {
//     // quantity:propTypes.number.isRequired,
//     quantity: (props, propName, componentName) =>
//     {
//         const value = props[propName];
//         if (typeof value !== 'number' ) 
//         {
//             return new Error(`${propName} in ${componentName} must be number.`);
//         }
        
//         if (value < 1 || value > 10)
//         {
//             return new Error(`${propName} in ${componentName} must be between 1 and 10.`);
//         }
//         return null;
//     },

//     type: (props, propName, componentName) =>
//     {
//         const value = props[propName];
//         const types = ['vegetable', 'fruit', 'grain'];
//         if (!types.includes(value))
//         {
//             return new Error(`${propName} in ${componentName} must be one of: ${types.join(', ')}.`);
//         }
//         return null;
//     },

// };


import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

// Styled component for dynamic background color
const StyledCard = styled.div`
  background-color: ${(props) =>
    props.type === 'vegetable'
      ? '#81c784' // Green
      : props.type === 'fruit'
      ? '#ef5350' // Red
      : '#ffeb3b'}; // Yellow
  color: ${(props) =>
    props.type === 'grain' ? '#000' : '#fff'}; // Black text for grain, white for others
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  height: 100%; /* Ensure card takes full height */
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

// FarmProduct component validation
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
