window.addEventListener('load', () => {
  // Hide the loader when all resources are loaded
  hideLoadingAnimation();

  // Check if auto mode is enabled and trigger prediction
  chrome.storage.sync.get(['autoModeEnabled'], (result) => {
    if (result.autoModeEnabled) {
      autoModeCheckbox.checked = true;
      triggerPrediction();
    }
  });
});

// Get the checkbox element
const autoModeCheckbox = document.getElementById('auto-mode-checkbox');

// Add event listener to the checkbox
autoModeCheckbox.addEventListener('change', () => {
  // Update the auto mode state in storage
  chrome.storage.sync.set({ autoModeEnabled: autoModeCheckbox.checked });

  // If auto mode is enabled, trigger the prediction process
  if (autoModeCheckbox.checked) {
    triggerPrediction();
  } else {
    // If auto mode is disabled, clear the prediction result and hide the loader immediately
    clearPredictionResult();
    hideLoadingAnimation();
  }
});

// Function to trigger the prediction process
async function triggerPrediction() {
  // Get the current tab URL using Chrome extension APIs
  const tab = await getCurrentTab();
  const tabURL = tab.url;

  // Display the URL
  document.getElementById('auto-mode-url').innerText = `Predicting: ${tabURL}`;

  // Show loading animation
  showLoadingAnimation();

  try {
    // Make a request to Flask application for prediction
    // Send a POST request to the Flask backend containing tab URL
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: tabURL }),
    });

    if (response.ok) {
      // Parse the prediction result
      const { prediction } = await response.json();

      // Display the prediction result
      const resultMessage = prediction === 1 ? 'This website is legitimate' : 'This website is not legitimate';
      document.getElementById('auto-mode-status').innerText = resultMessage;

      // Show a popup message if it's a phishing site
      if (prediction === 0) {
        alert('Warning: Phishing Site Detected!');
      }
    } else {
      console.error('Request failed:', response.status);
    }
  } catch (error) {
    console.error('Request failed:', error);
  } finally {
    // Hide loading animation after receiving the response
    hideLoadingAnimation();
  }
}

// Function to get the current tab using Chrome extension APIs
async function getCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        resolve(tabs[0]);
      } else {
        reject(new Error('No active tab found'));
      }
    });
  });
}

// Function to show loading animation
function showLoadingAnimation() {
  const loader = document.querySelector('.loader');
  loader.classList.remove('loader-hidden');
}

// Function to hide loading animation
function hideLoadingAnimation() {
  const loader = document.querySelector('.loader');
  loader.classList.add('loader-hidden');
}

// Function to clear prediction result
function clearPredictionResult() {
  document.getElementById('auto-mode-status').innerText = ''; // Clear the prediction status
  document.getElementById('auto-mode-url').innerText = ''; // Clear the predicting URL
}
