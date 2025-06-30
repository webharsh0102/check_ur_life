# 🩺 Disease Risk Predictor Web App

A lightweight AI-powered web application that predicts the risk of **Diabetes**, **Heart Disease**, and **Obesity** based on manually entered medical inputs.

---

## 🚀 Features

- 🔢 Manual input of health metrics
- 🧠 Backend AI models (Neural Networks using TensorFlow)
- 🔁 Real-time prediction with confidence score
- 🌐 Simple UI for each disease (HTML + CSS + JavaScript)
- 📊 Uses trained `.h5` models and pre-scaled inputs

---

## 🧱 Project Structure
```text
DiseasePredictor/
├── backend/
│   ├── diabetes_model.h5
│   ├── heart_model.h5
│   ├── obesity_model.h5
│   ├── scaler_diab.save
│   ├── scaler_heart.save
│   ├── scaler_obesity.save
│   ├── heartdis.py          # Python API for heart disease
│   ├── obesity_model.py     # Python model training for obesity
│   └── diabetes_model.py        # Python API for obesity
├── public/
│   ├── index.html           # Home page
│   ├── diabetes_html.html
│   ├── heart_html.html
│   ├── obesity_html.html
│   ├── diabetes_javascript.js
│   ├── heart_javascript.js
│   ├── obesity_javascript.js
│   ├── diabetes_style.css
│   ├── heart_style.css
│   └── obesity_style.css
├── main_js_server.js        # Node.js Express server
├── main_py_server.py        # Optional: to run Python APIs directly
├── package.json
└── README.md
```
---

## 📌 How It Works

1. The user selects a disease form (Diabetes, Heart, Obesity).
2. Enters medical test values manually (e.g., Glucose, Age, BMI).
3. On clicking **Predict**, data is sent to a Flask API.
4. Python model receives input, normalizes it using a pre-saved scaler.
5. Neural Network predicts the risk or class and returns a confidence score.
6. Results are displayed instantly.

---

## 🧠 AI Models

- Built using **Keras + TensorFlow**
- Models are trained on standard open datasets:
  - Diabetes: PIMA Indians dataset
  - Heart: UCI Heart Disease dataset
  - Obesity: Obesity Risk dataset (from Kaggle)
- Preprocessed using `StandardScaler` and saved with `joblib`.

---

## ⚙️ Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js (Express), Python (Flask)
- **AI:** TensorFlow, Scikit-learn, Pandas
- **Communication:** `fetch()` API from frontend → Flask server

---

## 📦 Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/disease-predictor.git

# 2. Install backend dependencies
cd DiseasePredictor
npm install

# 3. Start Node.js server
node app.js

# 4. Start Python Flask APIs (in separate terminals)
python backend/diabetes_api.py
python backend/heart_api.py
python backend/obesity_api.py

# 5. Visit http://localhost:3000 to use the web app

```

📄 License
This project is open source and available under the MIT License.

✍️ Author
Made with ❤️ by Harsh Sethi
