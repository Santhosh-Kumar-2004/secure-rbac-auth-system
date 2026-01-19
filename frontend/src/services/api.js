import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true // REQUIRED for httpOnly cookies
});

export default api;
