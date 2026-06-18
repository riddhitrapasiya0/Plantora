# Plantora 🌱

A full-stack farm management application to manage farmers and their crops!

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Farmers](#farmers)
  - [Crops](#crops)
  - [Hospitals & Patients](#hospitals--patients)
- [Project Structure](#project-structure)
- [License](#license)

## Features
- 🧑‍🌾 Manage farmers with details like name, contact, and farm location
- 🥕 Add, update, and delete crops linked to farmers
- 📊 View complete farm inventory with all crops
- 🏥 Manage hospitals and patients (additional features)
- 📱 Responsive UI using React and Bootstrap
- 🔒 Centralized API client with Axios interceptors

## Tech Stack
### Backend
- Node.js with Express
- MongoDB with Mongoose
- CORS enabled
- Nodemon for development

### Frontend
- React with Create React App
- Axios for API calls
- Bootstrap and Styled Components
- React Router
- React Bootstrap

## Installation
### Prerequisites
- Node.js (v20 or later)
- npm or yarn
- MongoDB Atlas account or local MongoDB server

### Backend Setup
1. Navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Variables](#environment-variables)

4. Start the server:
```bash
npm start
```
The backend will run on http://localhost:2005

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables

4. Start the development server:
```bash
npm start
```
The frontend will run on http://localhost:3000

## Environment Variables
### Backend (`Backend/.env`)
```env
PORT=2005
ATLAS_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/plantora?retryWrites=true&w=majority
```

### Frontend (`Frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:2005
```

## API Endpoints
### Farmers
- `POST /api/farmers` - Add a new farmer
- `GET /api/farmers/get-farmers` - Get all farmers
- `GET /api/farmers/:farmerId` - Get a single farmer
- `PUT /api/farmers/:farmerId` - Update a farmer
- `DELETE /api/farmers/:farmerId` - Delete a farmer

### Crops
- `POST /api/farmers/:farmerId/crops` - Add a crop to a farmer
- `GET /api/crops/get-all` - Get all crops from all farmers
- `DELETE /api/farmers/:farmerId/crops/:cropId` - Delete a crop from a farmer
- `PUT /api/farmers/:farmerId/crops/:cropId` - Update a crop

### Hospitals & Patients
- `GET /api/hospitals/get-hospitals` - Get all hospitals
- `POST /api/hospitals` - Add a new hospital
- `GET /api/patients/get-patients` - Get all patients
- `POST /api/patients` - Add a new patient

## Project Structure
```
Plantora/
├── Backend/
│   ├── model/
│   │   ├── Book.js
│   │   ├── Crop.js
│   │   ├── Farmer.js
│   │   ├── Hospital.js
│   │   └── Patient.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── Frontend/
    ├── public/
    ├── src/
    │   ├── Components/
    │   ├── api.js
    │   ├── App.js
    │   └── index.js
    ├── .env
    └── package.json
```