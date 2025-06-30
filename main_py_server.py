# heart_api.py
from flask import Flask, request, jsonify
import numpy as np
import joblib
from tensorflow import keras
import re
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load model and scaler
model = keras.models.load_model('diab_model.h5')
scaler = joblib.load('scaler_diab.save')
#load heart model 
model2 = keras.models.load_model('heart_model.h5')
scaler2 = joblib.load('scaler_heart.save')
model3 = keras.models.load_model('obesity_model.h5')
scaler3 = joblib.load('obesity_scaler.save')

def extract_value(text, key):
    match = re.search(rf"{key}[:\s]*([\d.]+)", text, re.IGNORECASE)
    return float(match.group(1)) if match else -1

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['input']
    scaled = scaler.transform([data])
    # prediction = model.predict(scaled)
    probability = model.predict(scaled)[0][0]
    # result = int(prediction[0][0] >= 0.5)
    return jsonify({
        'confidence': round(float(probability), 4)  # Optional: round to 4 decimals
    })
@app.route('/predict2', methods=['POST'])
def predict2():
    data = request.json['input']
    scaled = scaler2.transform([data])
    # prediction = model2.predict(scaled)
    probability = model2.predict(scaled)[0][0]
    # result = int(prediction[0][0] >= 0.5)
    return jsonify({
        'confidence': round(float(probability), 4)  # Optional: round to 4 decimals
    })    
@app.route('/predict3', methods=['POST'])
def predict3():
    data = request.json['input']
    scaled = scaler3.transform([data])
    # prediction = model2.predict(scaled)
    probability = model3.predict(scaled)
    pred_index = np.argmax(probability[0])
    class_mapping = {
        0: "Insufficient_Weight",
        1: "Normal_Weight",
        2: "Overweight_Level_I",
        3: "Overweight_Level_II",
        4: "Obesity_Type_I",
        5: "Obesity_Type_II",
        6: "Obesity_Type_III"
    }

    predicted_label = class_mapping[pred_index]
    
    # result = int(prediction[0][0] >= 0.5)
    return jsonify({
        'output': round(float(probability[0][pred_index]),4) , 'classs' : predicted_label
    })       
#  can add here parser logic

if __name__ == '__main__':
    app.run(port=5000)
