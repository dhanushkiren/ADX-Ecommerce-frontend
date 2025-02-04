import Axios from "axios";
import { retrieveData, storeData, clearAsyncStorage } from "./asyncStorage";
import { API_BASE_URL } from "./constants";

const axios = Axios.create({
  baseURL: API_BASE_URL, // Default base URL
});

axios.interceptors.request.use(
  async (config) => {
    // Add CORS header
    config.headers["Access-Control-Allow-Origin"] = "*";

    // Retrieve token for authentication
    let token = await retrieveData("token");

    // ✅ Exclude Authorization header for the register request
    if (
      token &&
      token !== "undefined" &&
      !config.url.includes("register") &&
      !config.url.includes("users/")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    

    // ✅ Ensure auth URLs use the correct base URL (excluding `/api/`)
    if (config.url && config.url.startsWith("auth/")) {
      config.baseURL = "http://192.168.0.102:8080/api";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const statusCode = error.response?.status;

    if (statusCode === 401) {
      // Unauthorized error
      console.error("Unauthorized User. Please log in again.");
      await clearAsyncStorage();
    }

    return Promise.reject(error);
  }
);

export default axios;
