import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true // REQUIRED for httpOnly cookies
});

// Access token expired → auto refresh
// Refresh token invalid → forced logout
// Frontend never touches tokens
// UX is seamless
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      try {
        await api.post("/auth/refresh");
        return api(error.config); // retry original request
      } catch {
        await api.post("/auth/logout");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
