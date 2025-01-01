import Axios from "axios";
import { apiConfig } from "./apiConfig";
import { clearAsyncStorage, retrieveData, storeData } from "./asyncStorage";

import { API_BASE_URL } from "./constants";

const axios = Axios.create({
  baseURL: API_BASE_URL,
});

axios.interceptors.request.use(
  async (config) => {
    config.headers["Access-Control-Allow-Origin"] = "*";

    let token = await retrieveData("token");

    if (token && token != "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("AXIOS CALL ==>", config.url);
    console.log("AXIOS HEADERS ==>", config);
    return config;
  },
  (error) => {
    console.log("AXIOS CALL ERR ==>", error);

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    const statusCode = error.response?.status;

    if (statusCode === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = await retrieveData("refreshToken");

      return Axios.post(API_BASE_URL + apiConfig.getRefreshToken, {
        token: refreshToken,
      })
        .then(async (response) => {
          const { token, refreshToken } = response.data;
          if (response?.data && token && refreshToken) {
            await storeData("token", token);
            await storeData("refreshToken", refreshToken);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          } else {
            console.error("Unauthorized User");
          }
        })
        .catch((error) => {
          // AsyncStorage.remove('token');
          // AsyncStorage.remove('refreshToken');
          clearAsyncStorage();

          return Promise.reject(error);
        });
    }
    // console.error('Axios Error: ', error.response);
    return Promise.reject(error);
  }
);

export default axios;
