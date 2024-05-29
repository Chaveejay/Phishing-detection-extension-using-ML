# Phishing-detection-extension-using-ML

This project implements a machine learning-based solution to detect phishing websites. It includes data collection, feature extraction, model training, and a user-friendly interface for URL verification. The core components are a Flask web application integrated with a machine learning model and a browser extension for real-time URL analysis.

Features
Data Collection: Utilized a dataset from Kaggle containing features of both phishing and legitimate websites.
Feature Extraction: Implemented feature extraction for 30 URL attributes, including IP address usage, URL length, presence of special characters, and domain registration length.
Model Training: Trained a machine learning model using the extracted features to differentiate between phishing and legitimate URLs.
Flask Application: Developed a Flask web application to handle URL submissions, perform feature extraction, and return model predictions.
Browser Extension: Created a browser extension that interfaces with the Flask application, allowing users to manually input URLs or automatically analyze the currently visited URL.

Prerequisites
Python 3.0
Flask
Jupyter Notebook
Pycharm 
Chorme Browser (for extension)

Open your browser and navigate to the extensions page.
Enable "Developer mode".
Click "Load unpacked" and select the browser_extension folder.

After adding the extension to the browser run app.py (all the required libraries should be installed)
After running the app.py the user can detect the current webpage URL by turning on automode and also can manually input a URL and predict a if a URL is legitamate or not.
(Ensure app.py is running in the background for this to work properly)


For any questions or support, please contact chawwa53@gmail.com

