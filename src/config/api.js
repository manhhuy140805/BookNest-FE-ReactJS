import axios from "axios";

// Create axios instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Add request interceptor to attach token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear stored credentials
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      // Dispatch a global event so any listening component can react
      window.dispatchEvent(new CustomEvent("auth:token-expired"));
    }
    return Promise.reject(error);
  },
);


export default apiClient;
