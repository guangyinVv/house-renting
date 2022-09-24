import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// 导入样式
// import "antd-mobile/2x/bundle/style.css";
import axios from "axios";
// 用于给函数组件传递axios
import UserContext from "./utils/userContext";
axios.defaults.baseURL = "http://localhost:8080";
React.Component.prototype.$http = axios;
React.Component.prototype.$baseUrl = "http://localhost:8080";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContext.Provider value={{ axios: axios }}>
    <App />
  </UserContext.Provider>
);
