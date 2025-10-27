import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ?? "https://backend.pekatafoods.com/api/v1",
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Don't add token for login-related endpoints
    const isLoginEndpoint = config.url?.includes('/user-login/');
    
    if (!isLoginEndpoint) {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("dashboard_auth_token="))
        ?.split("=")[1];

      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
    }

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
      document.cookie = "dashboard_auth_token=; max-age=-1; path=/";
      document.cookie = "dashboard_user_data=; max-age=-1; path=/";
    }

    return Promise.reject(error);
  }
);

export default api;
