import mongoose from "mongoose";

const patientSchema = mongoose.Schema({
    patientId: Number,
    name: String,
    age: Number,
    gender: String,
    contactNumber: String,
    address: String
    
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;