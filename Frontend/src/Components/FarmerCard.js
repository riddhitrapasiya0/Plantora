import React from "react";
import { Farmer } from "./Farmer";

export function FarmerCard()
{
    return(
        <>
        <h1>Farmer</h1>
        <div className="farmer-list">
        <Farmer name="Rajendra Patel" age = {60} location="Gujarat"/>
        <Farmer name= 'Mayank Parmar' age= {35} location= 'Punjab'/>
        <Farmer name= 'Raj Patel' age = {40} location='Hariyana'/>
        <Farmer name= 'Ashokbhai Sangani' age= {50} location = 'Maharashtra'/>
        <Farmer name= 'Akash Kumar' age= {30} location= 'Uttar Pradesh'/>
        <Farmer name= 'Mehul Patel' age= {45} location= 'Rajasthan'/>    
        </div>
        </>
    );
}