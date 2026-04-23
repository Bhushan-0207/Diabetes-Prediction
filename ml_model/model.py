import numpy as np
import pickle
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "model.pkl")
scaler_path = os.path.join(BASE_DIR, "scaler.pkl")

model = pickle.load(open(model_path, "rb"))
scaler = pickle.load(open(scaler_path, "rb"))
def predict(data):
    data = np.array(data).reshape(1, -1)
    data = scaler.transform(data)
    prediction = model.predict(data)[0]
    probability = model.predict_proba(data)[0][1]

    return {
        "prediction": int(prediction),
        "probability": float(probability)
    }