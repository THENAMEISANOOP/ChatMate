import axios from "axios";

const backendURL = import.meta.env.MODE === "development"
  ? "http://localhost:5001/api"
  : "https://chatmate-b.vercel.app/api"; //  backend's Vercel domain

export const axiosInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});
