from fastapi import FastAPI
from pydantic import BaseModel
from model import predict

app = FastAPI()

class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int
    

@app.get("/")
def home():
    return {"message": "Diabetes Prediction API"}

@app.post("/predict")
def predict_diabetes(data: DiabetesInput):
    input_data = [
        data.Pregnancies,
        data.Glucose,
        data.BloodPressure,
        data.SkinThickness,
        data.Insulin,
        data.BMI,
        data.DiabetesPedigreeFunction,
        data.Age
    ]

    result = predict(input_data)
    return result