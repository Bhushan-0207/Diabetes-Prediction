from fastapi import APIRouter,HTTPException
from backend.database import uesr_collection
from backend.models.user_model import SignupModel,LoginModel
from backend.utilities.hash import hash_password,verify_password
from backend.utilities.jwt_handler import create_token

router = APIRouter()

@router.post("/signup")
def signup_user(user:SignupModel):
    if uesr_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400)
    
    hash_pwd = hash_password(user.password)

    uesr_collection.insert_one(
       { "name" : user.name,
        "email": user.email,
        "password": hash_pwd
       }
    )

    return {"msg":"User created successfully"}

@router.post("/login")
def login(user:LoginModel):
    db_user = uesr_collection.find_one({"email":user.email})

    if not db_user or not verify_password(user.password,db_user["password"]):
        raise HTTPException(status_code=401)
    
    token = create_token({"email":user.email})

    return{"access_token": token,
           "name":db_user["name"]
           }
