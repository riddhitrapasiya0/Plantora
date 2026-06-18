import mongoose from "mongoose";

const hospitalSchema = mongoose.Schema({

    name:{
        type:String,
        required: true,
    },

    date:
    {
        type:String,
        unique: true
    }
});

const Hospital = mongoose.model("Hospital",hospitalSchema);

export default Hospital;