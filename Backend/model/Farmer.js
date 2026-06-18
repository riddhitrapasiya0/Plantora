import mongoose from "mongoose";
import CropSchema from './Crop.js';

const FarmerSchema = new mongoose.Schema({

    farmerId:{
        type : Number,
        required : [true, "Farmer Id is required"],
        unique: true
    },

    name:{
        type : String,
        required : [true, "Farmer name is required"],
    },

    contact:{
        phone:{
            type : String,
            required: [true, "Contact No is required"],
            match: /^[6-9][0-9]{9}$/,
            minlength: [10, "Phone Number must be 10 digits"],
            maxlength: [10, "Phone Number must be 10 digits"],
        },
        email:{
            type : String,
            required: [true, "Email is required"],
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
        }
    },

    farmLocation:{
        type : String,
        required : [true, "Farm Location is required"],
    },

    producedCrops: [CropSchema]
});

const Farmer = mongoose.model("Farmer", FarmerSchema);
export default Farmer;