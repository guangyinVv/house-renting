import { Navigate } from "react-router";

const TOKEN_NAME = "hkzf_token";

// 获取token
const getToken = () => localStorage.getItem(TOKEN_NAME);

// 设置token
const setToken = (value) => localStorage.setToken(TOKEN_NAME, value);

// 删除token
const removeToken = () => localStorage.removeItem(TOKEN_NAME);

// 判断是否有登录权限
const isAuth = () => !!getToken();

// 路由守卫配置
const RequireAuth = ({ children, go }) => {
  if (isAuth()) return children;
  else return <Navigate to={`/login?go=${go}`} replace />;
};

export default RequireAuth;
export { getToken, setToken, removeToken, isAuth };
