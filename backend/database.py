from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["diabetes_app"]

uesr_collection = db["users"]

prediction_collection = db["predictions"]