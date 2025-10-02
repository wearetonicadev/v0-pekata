import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? "http://localhost:3001/api" 
    : process.env.NODE_ENV === 'production'
    ? "https://backend.pekatafoods.com/api/v1"  // Directo al backend (temporal)
    : "https://backend.pekatafoods.com/api/v1",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];

    config.headers.Authorization = `Token ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && error.request.url !== "/auth/login") {
      document.cookie = "auth_token=; max-age=-1; path=/";
      document.cookie = "user_data=; max-age=-1; path=/";
    }

    return Promise.reject(error);
  }
);

export default api;
