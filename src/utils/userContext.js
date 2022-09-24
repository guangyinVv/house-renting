// 该组件暂时只用于解决函数组件无法使用axios的问题
import React from "react";
const UserContext = React.createContext({ axios: "" });
export default UserContext;
