

async function predictURL(url) {
  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: url }),
    });
    if (response.ok) {
      const { prediction } = await response.json();
      return prediction;
    } else {
      console.error('Prediction request failed:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Prediction request failed:', error);
    return null;
  }
}
