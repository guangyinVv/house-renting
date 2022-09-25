import { useState } from "react";
import MyNavBar from "../../component/navbar";
import { Input } from "antd-mobile";
import styles from "./index.module.css";
import { Button } from "antd-mobile";
import { Link } from "react-router-dom";

const Login = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <MyNavBar>账号登录</MyNavBar>
      <div className={styles.inputBox}>
        <Input
          placeholder="请输入账号"
          value={account}
          onChange={(val) => {
            setAccount(val);
          }}
        ></Input>
        <Input
          type="password"
          value={password}
          placeholder="请输入密码"
          onChange={(val) => {
            setPassword(val);
          }}
        ></Input>
      </div>
      <div className={styles.buttonBox}>
        <Button color="success">登录</Button>
      </div>
      <div className={styles.toRegist}>
        <Link to="/regist">还没有账号，去注册~</Link>
      </div>
    </>
  );
};

export default Login;
