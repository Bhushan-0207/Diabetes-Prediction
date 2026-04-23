import axios from 'axios';

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const signup = (data) => 
    // console.log("API SENDING:", data);
    API.post("/signup",data,{
    headers:{
        "Content-Type": "application/json"
    },
    
});
export const login = (data) => API.post("/login",data);

export const predict = (data,token) =>
    API.post("/predict",data,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
    }); 

export const getHistory = (token) =>
  API.get("/history", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });