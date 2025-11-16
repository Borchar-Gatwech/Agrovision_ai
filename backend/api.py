from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow React frontend to access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model = joblib.load("crop_recommender.pkl")

class CropInput(BaseModel):
    soilType: str
    pastYield: float
    location: str

@app.post("/predict")
def recommend_crop(data: CropInput):
    # Mock rainfall from location
    rainfall_map = {
        "Nairobi": 90, "Kisumu": 120, "Mombasa": 70, "Eldoret": 100
    }
    rainfall = rainfall_map.get(data.location, 85)

    soil_map = {"clay": 0, "sandy": 1, "loam": 2, "silt": 3, "peat": 4, "chalk": 5}
    soil_code = soil_map.get(data.soilType, 0)

    X = pd.DataFrame([[soil_code, rainfall, data.pastYield]], columns=["soil_type", "rainfall", "past_yield"])
    crop = model.predict(X)[0]

    return {"recommended_crop": crop, "suitability": 90, "expected_yield": "3.5 tons/hectare"}
