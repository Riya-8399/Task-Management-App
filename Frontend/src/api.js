import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "http://35.183.101.228:5000/api",
});

// Request interceptor to attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if response has data.message "User not found"
    if (error.response?.data?.message === "User not found") {
      // Do NOT retry. Let PrivateRoute handle redirect to Home
      return Promise.reject(error);
    }

    // Handle 401 unauthorized (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post(
          // "http://localhost:5000/api/refresh-token",
          "http://35.183.101.228:5000/api/refresh-token",
          {},
          { withCredentials: true }
        );
        const newToken = refreshRes.data.accessToken;
        localStorage.setItem("accessToken", newToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh failed → propagate error
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
