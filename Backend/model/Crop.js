import mongoose from "mongoose";

const CropSchema = new mongoose.Schema({

    cropId:{
        type: Number,
        required: [true, "Crop ID is required"]
    },

    cropName:{
        type: String,
        required: [true, "Crop Name is required"]
    },

    category:{
        type: String,
        required: [true, "Category is required"]
    },

    quantity:{
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
    },

    unit:{
        type: String,
        required: [true, "Unit is required"]
    },

    pricePerUnit:{
        type: Number,
        required: [true, "Price per unit is required"],
        min: [1, "Price per unit must be greater than or equal to 1"],
    },

    harvestSeason:{
        type: String,
        default: null
    },

    harvestDate:{
        type: Date,
        default: null
    },

    storageConditions:{
        type: String,
        default: null
    },

    organicCertification:{
        type: Boolean,
        default: false
    },

    pesticideUse:{
        type: String,
        default: null
    },

    notes:{
        type: String,
        default: null
    }
});

// const Crop = mongoose.model("Crop", CropSchema);
export default CropSchema;