import axios from "axios";
import { getToken, removeToken } from "./auth";
axios.defaults.baseURL = "http://localhost:8080";
const BaseURL = "http://localhost:8080";

// 添加请求拦截器（根据条件拦截部分请求）
axios.interceptors.request.use((config) => {
  const { url } = config;
  if (
    url.startsWith("/user") &&
    !url.startsWith("/user/login") &&
    !url.startsWith("/user/registered")
  ) {
    config.headers.Authorization = getToken();
  }
  return config;
});

// 添加相应拦截器
axios.interceptors.response.use((response) => {
  const { status } = response.data;
  if (status === 400) {
    removeToken();
  }
  return response;
});
export { axios, BaseURL };
