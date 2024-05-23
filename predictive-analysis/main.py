import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import matplotlib.pyplot as plt
import io
import base64

app = Flask(__name__)

# Enable CORS for all routes and allow credentials
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Credentials', 'false')
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/predict', methods=['POST'])
def predict():
    print("request received")
    request_data = request.get_json()
    forecast_data = request_data['forecast']
    column_to_predict = "value"
    dataset = pd.DataFrame(request_data['history'])
    dataset['date'] = pd.to_datetime(dataset['date'])

    # Feature engineering
    dataset['DAYOFYEAR'] = dataset['date'].dt.dayofyear
    dataset = dataset.drop(columns=['date'])

    forecast_df = pd.DataFrame(forecast_data)
    forecast_df['date'] = pd.to_datetime(forecast_df['date'])
    forecast_df['DAYOFYEAR'] = forecast_df['date'].dt.dayofyear

    # Split the dataset into features and target variable
    X = dataset.drop(column_to_predict, axis=1)
    y = dataset[column_to_predict]

    # Split the data into training and test sets (80% training, 20% testing)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)

    # Standardize the features (important for many ML models)
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    forecast_scaled = scaler.transform(forecast_df[['DAYOFYEAR']])

    # Initialize and train the RandomForestRegressor model
    model = RandomForestRegressor()
    model.fit(X_train, y_train)

    # Make predictions on the test set
    y_pred = model.predict(X_test)

    # Evaluate the model
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    # Print the results
    print("Mean Squared Error:", mse)
    print("R2 Score:", r2)

    # Predict the outcome for the new dataset
    predictions = model.predict(forecast_scaled)

    # Combine predictions with the dates
    prediction_results = pd.DataFrame({
        'date': forecast_df['date'].dt.strftime('%Y-%m-%dT%H:%M:%SZ').tolist(),
        'value': predictions.tolist()
    })

    response = make_response(jsonify(prediction_results.to_dict(orient='records')))
    # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:50789')
    # response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

app.run(debug=True)
