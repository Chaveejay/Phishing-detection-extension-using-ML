import numpy as np
from flask import Flask, request, jsonify, render_template
import pickle
import feature_extraction
from feature_extraction import FeatureExtraction
from flask_cors import CORS  # For handling Cross-Origin Resource Sharing

# Creating flask app
flask_app = Flask(__name__)
CORS(flask_app)


# Load the pickle model
model = pickle.load(open("model1.pkl", "rb"))

@flask_app.route("/")
def Home():
    return render_template("index.html")  # Defines route for home page

@flask_app.route('/predict', methods=["POST"])
def predict():
    # Get URL input from the json
    url = request.json.get('text')

    # Perform feature extraction
    features = feature_extraction.FeatureExtraction(url)
    fe = features.getFeaturesList()

# Make prediction using the extracted features
    prediction = model.predict([fe])

    return jsonify({'prediction': int(prediction)})     # The prediction result is converted to int

if __name__ == "__main__":
   flask_app.run(debug=True)
