import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error = null) => {
  failedQueue.forEach(promise => {
    if (error) promise.reject(error);
    else promise.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const isAuthEndpoint =
      originalRequest.url.includes("/auth/login") ||
      originalRequest.url.includes("/auth/logout") ||
      originalRequest.url.includes("/auth/refresh") ||
      originalRequest.url.includes("/auth/me");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      isRefreshing = true;

      try {
        await api.post("/auth/refresh");
        processQueue();
        return api(originalRequest);
      } catch (err) {
        processQueue(err);

        // HARD logout (no axios)
        await fetch("http://localhost:8000/auth/logout", {
          method: "POST",
          credentials: "include"
        });

        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
