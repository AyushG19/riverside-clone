import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout:8000,
  headers: {
    "Content-Type":"application/json"
  },
  withCredentials:true
})
