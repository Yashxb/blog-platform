import axios from "axios";


export const API = axios.create({
  baseURL: "http://localhost:5000/api", 
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Token may be missing or invalid.");
    }
    return Promise.reject(error);
  }
);