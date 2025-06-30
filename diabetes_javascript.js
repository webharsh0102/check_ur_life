document.getElementById('predictForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const jsonBody = {};
  formData.forEach((value, key) => {
   jsonBody[key] = value;
  });

  

  const uploadForm = new FormData();
  Object.entries(jsonBody).forEach(([key, value]) => {
    uploadForm.append(key, value);
  });

  const response = await fetch('http://localhost:3000/diabetes_process', {
    method: 'POST',
    body: uploadForm
  });

  const data = await response.json();
  
  document.getElementById('result').innerText = 
  'Prediction: ' + ((data.confidence) >= 0.5  ? 'High Risk of Diabetes' : 'Low Risk of Diabetes') +
  '\nrisk : ' + Math.round(data.confidence * 100) + '%';

});
