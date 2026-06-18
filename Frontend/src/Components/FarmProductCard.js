import React from "react";
import { FarmProduct } from "./FarmProduct";


export function FarmProductCard()
{
    return(

      <>
       
        <h1>Product</h1><br/><br/>
        <div className="farmer-product-list">
        <FarmProduct pname="Carrot" type="vegetable" quantity={5} />
        <FarmProduct pname="Tomato" type="vegetable" quantity={7} />
        <FarmProduct pname="Apple" type="fruit" quantity={8} />
        <FarmProduct pname="Banana" type="fruit" quantity={6} />
        <FarmProduct pname="Wheat" type="grain" quantity={4} />
        <FarmProduct pname="Rice" type="grain" quantity={9} />
        <FarmProduct pname="Potato" type="vegetable" quantity={3} />
        <FarmProduct pname="Cucumber" type="vegetable" quantity={10} />
        <FarmProduct pname="Mango" type="fruit" quantity={2} />
        <FarmProduct pname="Pumpkin" type="vegetable" quantity={1} />
  
      </div>
      
      </>
    );
}