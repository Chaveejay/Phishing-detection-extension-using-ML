window.addEventListener('load', () => {
  hideLoadingAnimation(); // Hide the loader when all resources are loaded
});

const form = document.getElementById('phish-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior (Page Reload)
  // Extract the URL input value from the form
  const input = document.getElementById('text').value;
  clearPredictionResult();
  showLoadingAnimation();
  try {
  // Send a POST request to the Flask backend for prediction
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: input}), //Sends the URL input as JSON data
    });

    if (response.ok) {
    // If the response is successful, parse the JSON response
      const prediction = (await response.json()).prediction; //Prediction result is parsed from the JSON response
      const resultDiv = document.getElementById('prediction-result');
      resultDiv.innerText = prediction === 1 ? 'This website is legitimate' : 'This website is not legitimate';
    } else {
    // If the response is not successful, log the error
      console.error('Request failed:', response.status);
    }
  } catch (error) {
   // If an error occurs during the request, log the error
    console.error('Request failed:', error);
  } finally {
    hideLoadingAnimation(); // Hide loading animation after receiving the response
  }
});

function showLoadingAnimation() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('loader-hidden');
}

function hideLoadingAnimation() {
  const loader = document.querySelector('.loader');
  loader.classList.add('loader-hidden');
}

function clearPredictionResult() {
  const resultDiv = document.getElementById('prediction-result');
  resultDiv.innerText = ''; // Clear the content of the prediction result
}
