import { API } from "./api";

// Login user
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data; 
};

// Register user
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data); 
  return res.data; 
};