import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// 导入样式
// import "antd-mobile/2x/bundle/style.css";
import axios from 'axios'
// 用于给函数组件传递axios
import UserContext from './utils/userContext'
const baseURL = 'http://localhost:8080'
axios.defaults.baseURL = baseURL
React.Component.prototype.$http = axios
React.Component.prototype.$baseUrl = baseURL

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <UserContext.Provider value={{ axios: axios, baseUrl: baseURL }}>
    <App />
  </UserContext.Provider>
)
