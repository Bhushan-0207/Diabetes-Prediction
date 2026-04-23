from pydantic import BaseModel
from fastapi import APIRouter,Depends
from backend.utilities.jwt_handler import verify_token
from ml_model.model import predict
from backend.database import prediction_collection

router = APIRouter()

class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int


@router.post("/predict")
def predict_route(data: DiabetesInput, user: dict = Depends(verify_token)):
    try:
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

        prediction_collection.insert_one({
            "email": user["email"],
            "input": data.dict(),
            "result": result
        })

        return result

    except Exception as e:
        print("ERROR:", e)  # 👈 VERY IMPORTANT
        return {"error": str(e)}
    
@router.get("/history")
def get_history(user: dict = Depends(verify_token)):
    data = list(prediction_collection.find({"email": user["email"]}, {"_id": 0}))
    return data    