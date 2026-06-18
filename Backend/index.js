// Import required modules
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import Patient from "./model/Patient.js"; // Adjust the path as necessary
import cors from "cors";



const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes

// 1. Get all patients
app.get("/patients", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving patients", error });
    }
});

// 2. Get a patient by ID
app.get("/patients/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findOne({ patientId: id });
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving patient", error });
    }
});

// 3. Create a new patient
app.post("/patients", async (req, res) => {
    const { patientId, name, age, gender, contactNumber, address } = req.body;
    const newPatient = new Patient({ patientId, name, age, gender, contactNumber, address });
    try {
        const savedPatient = await newPatient.save();
        // res.status(201).json(savedPatient);
        res.status(201).json({ status: "success", patient: savedPatient });
    } catch (error) {
        res.status(400).json({ message: "Error creating patient", error });
    }
});

// 4. Update a patient (PATCH)
app.patch("/patients/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedPatient = await Patient.findOneAndUpdate({ patientId: id }, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the updated fields
        });
        if (!updatedPatient) return res.status(404).json({ message: "Patient not found" });
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(400).json({ message: "Error updating patient", error });
    }
});

// 5. Replace a patient (PUT)
app.put("/patients/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const replacedPatient = await Patient.findOneAndReplace({ patientId: id }, req.body, {
            new: true, // Return the updated document
            runValidators: true // Validate the updated fields
        });
        if (!replacedPatient) return res.status(404).json({ message: "Patient not found" });
        res.status(200).json(replacedPatient);
    } catch (error) {
        res.status(400).json({ message: "Error replacing patient", error });
    }
});

// 6. Delete a patient
app.delete("/patients/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPatient = await Patient.findOneAndDelete({ patientId: id });
        if (!deletedPatient) return res.status(404).json({ message: "Patient not found" });
        res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting patient", error });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
