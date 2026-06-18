import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Farmer from './model/Farmer.js';
import Crop from './model/Crop.js';
import Hospital from './model/Hospital.js';
import Patient from './model/Patient.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "http://localhost:8000",
      process.env.RENDER_DOMAIN,
      process.env.VERCEL_DOMAIN,
    ],
    credentials: true,
  }),
);

// mongodb://localhost:27017

mongoose.connect(process.env.ATLAS_URI, {
    tlsAllowInvalidCertificates: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("MongoDB connection error: ", err));


//[1] POST: Add a new Farmer
app.post('/api/farmers', async (req, res) => {
    try {
        const { name, contact, farmLocation } = req.body;
        // const body = req.body;
        // console.log("Request Body:", req.body);

        // Input validation
        if (!name || !contact.phone || !contact.email) {
            return res.status(400).json({ error: "Name, Phone, and Email are required." });
        }

        // Generate new farmer ID
        // const newFarmerId = farmers.length > 0 ? farmers[farmers.length - 1].farmerId + 1 : 1;

        const lastFarmer = await Farmer.findOne().sort({ farmerId: -1 }); // Find the farmer with the highest ID
        const newFarmerId = lastFarmer ? lastFarmer.farmerId + 1 : 1; // Increment the ID or start with 1


        // Create a new farmer object
        const newFarmer = new Farmer({
            farmerId: newFarmerId,
            name,
            contact: {
                phone: contact.phone,
                email: contact.email
            },
            farmLocation: farmLocation || "Not specified",
            producedCrops: [] // Initialize with an empty crop list
        });

        await newFarmer.save();

        res.status(201).json({ status: "success", farmer: newFarmer });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add farmer." });
    }

});


// [2] GET: Retrieve all farmers
app.get("/api/farmers/get-farmers", async (req, res) => {
    try {
        const farmers = await Farmer.find();
        res.status(200).json({ success: true, data: farmers });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// GET: Retrieve all crops from all farmers for inventory
app.get("/api/crops/get-all", async (req, res) => {
    try {
        const farmers = await Farmer.find();
        // Flatten all crops into one array, adding farmerId and farmerName for reference
        const allCrops = farmers.flatMap(farmer => 
            farmer.producedCrops.map(crop => ({
                ...crop.toObject(),
                farmerId: farmer.farmerId,
                farmerName: farmer.name
            }))
        );
        res.status(200).json({ success: true, data: allCrops });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.get("/api/hospitals/get-hospitals", async (req, res) => {
    try{
        const hospitals = await Hospital.find();
        res.status(200).json({ success: true, data: hospitals });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
        }
})

// POST: Add a new Hospital
app.post('/api/hospitals', async (req, res) => {
    try {
        const { name, date } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Hospital name is required." });
        }
        const newHospital = new Hospital({ name, date });
        await newHospital.save();
        res.status(201).json({ status: "success", hospital: newHospital });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add hospital." });
    }
});

// GET: Retrieve all patients
app.get("/api/patients/get-patients", async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json({ success: true, data: patients });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// POST: Add a new Patient
app.post('/api/patients', async (req, res) => {
    try {
        const { patientId, name, age, gender, contactNumber, address } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Patient name is required." });
        }
        const newPatient = new Patient({ patientId, name, age, gender, contactNumber, address });
        await newPatient.save();
        res.status(201).json({ status: "success", patient: newPatient });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add patient." });
    }
});


// [3] GET: Retrieve a farmer by ID

app.get('/api/farmers/:farmerId', async (req, res) => {
    const id = Number(req.params.farmerId);
    try {
        const farmer = await Farmer.findOne({ farmerId: Number(req.params.farmerId) });
        // console.log("Requested Farmer ID:", id);

        if (!farmer) {
            return res.status(404).json({ error: "Farmer Detail not found" });
        }

        res.json(farmer);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve farmer details.' });
    }
});


// [4] POST: Add a crop to a specific farmer
app.post('/api/farmers/:farmerId/crops', async (req, res) => {
    try {
        const farmerId = Number(req.params.farmerId);
        const { cropName, category, quantity, unit, pricePerUnit, harvestSeason, harvestDate, storageConditions, organicCertification, pesticideUse, notes } = req.body;


        // Validate crop details
        if (!cropName || !category || !quantity || !pricePerUnit) {
            return res.status(400).json({ error: 'Crop name, category, quantity, and price are required.' });
        }

        // Validate category
        const validCategories = ['Grains', 'Vegetables', 'Fruits', 'Grain', 'Vegetable', 'Fruit'];
        if (!validCategories.includes(category)) {
            return res.status(400).json({ error: 'Invalid category. Valid categories are Grains, Vegetables, Fruits, Grain, Vegetable, Fruit.' });
        }

        // Find the farmer by ID
        const farmer = await Farmer.findOne({ farmerId });
        if (!farmer) {
            return res.status(404).json({ error: 'Farmer not found.' });
        }

        // Generate the cropId based on farmerId
        const nextCropIndex = farmer.producedCrops.length + 1; // Incremental index for crops
        const newCropId = farmerId * 100 + nextCropIndex; // Crop ID starts with farmerId

        // Create a new crop object
        const newCrop = {
            cropId: newCropId,
            cropName,
            category,
            quantity,
            unit: unit || 'kg', // Default unit to 'kg' if not provided
            pricePerUnit,
            harvestSeason: harvestSeason || 'Not specified', // Default harvest season
            harvestDate: harvestDate || null,
            storageConditions: storageConditions || null,
            organicCertification: organicCertification || false,
            pesticideUse: pesticideUse || null,
            notes: notes || null
        };

        // Add the new crop to the farmer's crop list
        farmer.producedCrops.push(newCrop);
        await farmer.save();

        res.status(201).json({ message: 'Crop added successfully.', farmer });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add crop.' });
    }
});


// [5]

app.delete('/api/farmers/:farmerId/crops/:cropId', async (req, res) => {
    try {
        const farmerId = Number(req.params.farmerId);
        const cropId = Number(req.params.cropId);
        // console.log("Requested Farmer ID:", farmerId);
        // console.log("Requested Crop ID:", cropId);

        // Find the farmer by ID
        const farmer = await Farmer.findOne({ farmerId });

        if (!farmer) {
            res.status(404).json({ error: 'Farmer not found.' });
        }

        // // Ensure that producedCrops is initialized
        // if (!farmer.producedCrops) {
        //     farmer.producedCrops = [];
        // }

        // Find the index of the crop to delete
        const cropIndex = farmer.producedCrops.findIndex(crop => crop.cropId === cropId);
        if (cropIndex === -1) {
            return res.status(404).json({ error: 'Crop not found.' });
        }

        // Remove the crop from the array
        farmer.producedCrops.splice(cropIndex, 1);
        await farmer.save();
        return res.json({ status: "success", message: `Crop with ID ${cropId} deleted` });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete crop.' })
    }
});


// 6. Delete a Farmer

app.delete('/api/farmers/:farmerId', async (req, res) => {
    try {
        const id = Number(req.params.farmerId);
        const result = await Farmer.deleteOne({ farmerId: id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Farmer not found.' });
        }

        return res.json({ status: "success", message: `Farmer with ID ${id} deleted` });

    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete farmer.' });
    }
});


// update farmer detail
app.put('/api/farmers/:farmerId', async (req, res) => {
    const farmerId = Number(req.params.farmerId); // Extract Farmer ID from the URL

    console.log(farmerId);
     // Validate farmerId
     if (isNaN(farmerId)) {
        return res.status(400).json({ error: "Invalid farmerId provided. Must be a valid number." });
    }

    try {
        // Check if the farmer exists
        const farmer = await Farmer.findOne({ farmerId });
        if (!farmer) {
            return res.status(404).json({ error: "Farmer not found" });
        }

        // Update farmer details
        const updatedData = req.body;
        const updatedFarmer = await Farmer.findOneAndUpdate(
            { farmerId },        // Find the farmer by farmerId
            { $set: updatedData }, // Update the fields with new data
            { new: true, runValidators: true } // Return the updated document and run validations
        );

        res.status(200).json({ status: "success", farmer: updatedFarmer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update farmer details." });
    }
});

// update specific crop detail
app.put('/api/farmers/:farmerId/crops/:cropId', async (req, res) => {
    const farmerId = Number(req.params.farmerId); // Farmer ID from URL
    const cropId = Number(req.params.cropId);    // Crop ID from URL

    try {
        // Find the farmer and update the specific crop
        const farmer = await Farmer.findOneAndUpdate(
            { farmerId, "producedCrops.cropId": cropId }, // Match farmerId and cropId
            { 
                $set: { 
                    "producedCrops.$": { ...req.body, cropId } // Update the matched crop
                } 
            },
            { new: true, runValidators: true } // Return updated document and validate
        );

        if (!farmer) {
            return res.status(404).json({ error: "Farmer or Crop not found." });
        }

        res.status(200).json({ status: "success", farmer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update crop details." });
    }
});

// [7] Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Something went wrong!' });
});

// app.use((err, req, res, next) => {
//     console.error("Error Details:", err); // Log full error details for debugging
//     if (err.name === 'ValidationError') {
//         return res.status(400).json({ error: err.message }); // Handle validation errors specifically
//     }
//     res.status(500).json({ error: err.message || 'Internal Server Error.' });
// });


app.listen(PORT, () => {    
    console.log(`Server start on port: ${PORT}`);
});