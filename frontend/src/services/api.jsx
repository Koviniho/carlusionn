import Axios from "axios";
// VITE_API_BASE_URL=
export const config = {
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  imageBaseUrl: import.meta.env.VITE_IMAGE_BASE_URL,
};

// Create an Axios instance with default settings
const axios = Axios.create({
  baseURL: config.baseUrl,
});

// Add a request interceptor to dynamically set the token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Create an Axios instance without a token
export const axiosWithoutToken = Axios.create({
  baseURL: config.baseUrl,
});

export default axios;
