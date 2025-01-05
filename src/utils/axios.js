import Axios from "axios";
import { retrieveData, storeData, clearAsyncStorage } from "./asyncStorage";
import { API_BASE_URL } from "./constants";

const axios = Axios.create({
  baseURL: API_BASE_URL,
});

axios.interceptors.request.use(
  async (config) => {
    config.headers["Access-Control-Allow-Origin"] = "*";

    let token = await retrieveData("token");

    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
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
      // Unauthorized
      console.error("Unauthorized User. Please log in again.");
      await clearAsyncStorage();
    }

    return Promise.reject(error);
  }
);

export default axios;
