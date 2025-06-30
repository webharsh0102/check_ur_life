document.getElementById('predictForm2').addEventListener('submit', async function (e) {
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

  
  const response = await fetch('http://localhost:3000/heart_process', {
    method: 'POST',
    body: uploadForm
  });

  const data = await response.json();
  document.getElementById('result').innerText = 
  'Prediction: ' + ((data.confidence) >= 0.5  ? 'High Risk of heart disease' : 'Low Risk of heart disease') +
  '\nrisk : ' + Math.round(data.confidence * 100) + '%';

});
