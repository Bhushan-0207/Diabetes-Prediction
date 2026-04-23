from jose import jwt,JWTError
from datetime import datetime,timedelta
from fastapi import Depends,HTTPException
from fastapi.security import HTTPAuthorizationCredentials,HTTPBearer

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_TIME = 60

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_TIME)
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)

security = HTTPBearer()

def verify_token(credentials:HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        return payload
    except:
        raise HTTPException(status_code=400)
    