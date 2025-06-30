const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
const OCR_API_KEY = 'K86266403288957';

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/diabetes_process',  async (req, res) => {
  let diabetesDefaultInput = [2, 120, 70, 20, 85, 32.0, 0.45, 33];

const fieldToIndex = {
  Pregnancies: 0,
  Glucose: 1,
  BloodPressure: 2,
  SkinThickness: 3,
  Insulin: 4,
  BMI: 5,
  DiabetesPedigreeFunction: 6,
  Age: 7
};  
  let manualInput = req.body; // e.g., from a JSON object
  let results = [];
  //we can here extract text from image and update default values 
  // 1. Update default values based on manual inputs
  for (const key in manualInput) {
    if (fieldToIndex.hasOwnProperty(key) && parseFloat(manualInput[key])!= -1 ) {
      diabetesDefaultInput[fieldToIndex[key]] = parseFloat(manualInput[key]);
    }
  }

 

  // 3. Send final input to Python API
  try {
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: diabetesDefaultInput })
    });

    const prediction = await response.json();
    res.json({ confidence: prediction.confidence });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Failed to get prediction from Python API' });
  }
});

// for heart
app.post('/heart_process',  async (req, res) => {
  let heartDefaultInput = [63, 1, 3, 145, 233, 1, 0, 150, 0, 2.3, 0, 0, 1];


const fieldToIndex = {
  Age: 0,                       // age in years
  Sex: 1,                       // 1 = male, 0 = female
  ChestPainType: 2,            // 0–3 (typical angina to asymptomatic)
  RestingBP: 3,                // resting blood pressure (in mm Hg)
  Cholesterol: 4,              // serum cholesterol (mg/dl)
  FastingBS: 5,                // fasting blood sugar > 120 mg/dl (1 = true, 0 = false)
  RestingECG: 6,               // 0–2 (normal to ST-T wave abnormality)
  MaxHeartRate: 7,            // maximum heart rate achieved
  ExerciseAngina: 8,          // 1 = yes, 0 = no
  Oldpeak: 9,                  // ST depression induced by exercise
  Slope: 10,                   // slope of peak exercise ST segment (0–2)
  MajorVessels: 11,            // number of major vessels colored by fluoroscopy (0–3)
  Thal: 12                     // 0 = normal, 1 = fixed defect, 2 = reversible defect
};

  let manualInput = req.body; // e.g., from a JSON object
  let results = [];
  // 1. Update default values based on manual inputs
  for (const key in manualInput) {
    if (fieldToIndex.hasOwnProperty(key) && parseFloat(manualInput[key])!= -1 ) {
      heartDefaultInputDefaultInput[fieldToIndex[key]] = parseFloat(manualInput[key]);
    }
  }

 

  // 3. Send final input to Python API
  try {
    const response = await fetch('http://127.0.0.1:5000/predict2', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: heartDefaultInput })
    });

    const prediction = await response.json();
    res.json({ confidence: prediction.confidence });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Failed to get prediction from Python API' });
  }
});

app.post('/obesity_process', async (req, res) => {
 let obesityDefaultInput = [
  1,     // Gender: 0 = Male, 1 = Female
  21,    // Age
  1.70,  // Height in meters
  72,    // Weight in kg
  1,     // Family History with Overweight: 1 = yes, 0 = no
  1,     // FAVC (Frequent consumption of high caloric food): 1 = yes, 0 = no
  3,     // FCVC (Frequency of consumption of vegetables): 1–3
  3,     // NCP (Number of main meals): 1–4
  1,     // CAEC (Consumption of food between meals): 0 = no, 1 = sometimes, 2 = frequently, 3 = always
  0,     // SMOKE: 1 = yes, 0 = no
  2,     // CH2O (Water consumption in liters): float
  0,     // SCC (Monitor calories): 1 = yes, 0 = no
  2,     // FAF (Physical activity frequency): 0–3
  1,     // TUE (Time using technology daily): 0–2
  1,     // CALC (Alcohol consumption): 0 = no, 1 = sometimes, 2 = frequently, 3 = always
  3      // MTRANS (Transportation): 0 = Automobile, 1 = Motorbike, 2 = Bike, 3 = Public_Transportation, 4 = Walking
];



const fieldToIndex = {
  Gender: 0,
  Age: 1,
  Height: 2,
  Weight: 3,
  family_history_with_overweight: 4,
  FAVC: 5,
  FCVC: 6,
  NCP: 7,
  CAEC: 8,
  SMOKE: 9,
  CH2O: 10,
  SCC: 11,
  FAF: 12,
  TUE: 13,
  CALC: 14,
  MTRANS: 15
};


  let manualInput = req.body; // e.g., from a JSON object
  let results = [];

 
  // 1. Update default values based on manual inputs
  for (const key in manualInput) {
    if (fieldToIndex.hasOwnProperty(key) && parseFloat(manualInput[key])!= -1 ) {
      obesityDefaultInput[fieldToIndex[key]] = parseFloat(manualInput[key]);
    }
  }

 

  // 3. Send final input to Python API
  try {
    const response = await fetch('http://127.0.0.1:5000/predict3', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: obesityDefaultInput })
    });

    const prediction = await response.json();

    res.json({ confidence: prediction.output,classs: prediction.classs });
  } catch (error) {
    console.error('Prediction error:', error);
    res.status(500).json({ error: 'Failed to get prediction from Python API' });
  }
});

app.listen(PORT, () => {
  console.log(`Node.js server running on http://localhost:${PORT}`);
});
