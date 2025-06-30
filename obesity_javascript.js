document.getElementById('predictForm3').addEventListener('submit', async function (e) {
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

  

  const response = await fetch('http://localhost:3000/obesity_process', {
    method: 'POST',
    body: uploadForm
  });

  const data = await response.json();
  document.getElementById('result').innerText = 
  'in state of ' + data.classs  + '\n'+'confidence :'+data.confidence*100;

});
