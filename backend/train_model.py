# train_model.py
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Example dataset
data = {
    "soil_type": [
        "clay", "sandy", "loam", "silt", "peat", "chalk", "clay", "sandy", "loam", "silt",
        "peat", "chalk", "loam", "sandy", "clay", "silt", "peat", "chalk", "loam", "sandy",
        "clay", "silt", "peat", "chalk", "loam", "sandy", "clay", "silt", "peat", "chalk",
        "loam", "sandy", "clay", "silt", "peat"
    ],
    "rainfall": [
        120, 60, 90, 80, 110, 70, 130, 45, 85, 95,
        150, 65, 100, 55, 140, 105, 160, 50, 115, 75,
        135, 100, 155, 60, 125, 85, 145, 90, 170, 65,
        95, 70, 140, 100, 160
    ],
    "past_yield": [
        3.5, 2.0, 4.2, 3.8, 3.9, 2.5, 4.0, 1.8, 4.5, 3.6,
        4.8, 2.3, 4.1, 2.2, 3.9, 4.0, 5.0, 2.4, 4.4, 2.8,
        4.2, 3.7, 4.9, 2.6, 4.3, 2.9, 4.1, 3.5, 5.1, 2.7,
        3.8, 2.1, 4.0, 3.9, 4.7
    ],
    "crop": [
        "Maize", "Cassava", "Beans", "Rice", "Barley", "Sorghum", "Wheat", "Sweet Potatoes",
        "Groundnuts", "Millet", "Tomatoes", "Onions", "Cabbage", "Spinach", "Carrots",
        "Peas", "Lettuce", "Kales", "Pumpkin", "Sunflower", "Soybeans", "Coffee", "Tea",
        "Bananas", "Pineapple", "Avocado", "Mango", "Papaya", "Sugarcane", "Cotton",
        "Irish Potatoes", "Garlic", "Chili", "Strawberries", "Beetroot"
    ]
}

df = pd.DataFrame(data)

# Convert categorical soil type to numeric
df["soil_type"] = df["soil_type"].astype("category").cat.codes

# Train model
X = df[["soil_type", "rainfall", "past_yield"]]
y = df["crop"]

model = RandomForestClassifier()
model.fit(X, y)

# Save model
joblib.dump(model, "crop_recommender.pkl")
print("✅ Model saved as crop_recommender.pkl")
