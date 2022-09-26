import { useRef, useEffect } from "react";
import MyNavBar from "../../component/navbar";
import { Input } from "antd-mobile";
import styles from "./index.module.css";
import { Button, Toast } from "antd-mobile";
import { Link } from "react-router-dom";
import { axios } from "../../utils/useAxios";
import { withFormik } from "formik";
import * as Yup from "yup";

// 正则校验
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/;
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/;

let Login = (props) => {
  const { values, handleSubmit, handleChange, handleBlur, errors, touched } =
    props;
  const inputKey = useRef();
  // 给输入框绑定键盘输入事件
  useEffect(() => {
    inputKey.current.addEventListener("keydown", function (e) {
      if (e.keyCode === 13) {
        console.log(1);
        handleSubmit();
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <MyNavBar>账号登录</MyNavBar>
      <form onSubmit={handleSubmit}>
        <div ref={inputKey} className={styles.inputBox}>
          <div className="adm-input">
            <input
              className="adm-input-element"
              name="username"
              type="text"
              placeholder="请输入账号"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
          </div>
          {errors.username && touched.username && (
            <div className={styles.error}>{errors.username}</div>
          )}
          <div className="adm-input">
            <input
              className="adm-input-element"
              name="password"
              type="password"
              placeholder="请输入密码"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            ></input>
          </div>
          {errors.password && touched.password && (
            <div className={styles.error}>{errors.password}</div>
          )}
        </div>
        <div className={styles.buttonBox}>
          <Button type="submit" color="success">
            登录
          </Button>
        </div>
      </form>
      <div style={{ display: "none" }}>
        <Input></Input>
      </div>

      <div className={styles.toRegist}>
        <Link to="/regist">还没有账号，去注册~</Link>
      </div>
    </>
  );
};

Login = withFormik({
  mapPropsToValues: () => ({ username: "", password: "" }),
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required("账号不能为空")
      .matches(REG_UNAME, "长度为5到8位，只能出现数字、字母、下划线"),
    password: Yup.string()
      .required("密码不能为空")
      .matches(REG_PWD, "长度为5到12位，只能出现数字、字母、下划线"),
  }),
  handleSubmit: async (values) => {
    const { username, password } = values;
    const { data } = await axios.post("/user/login", {
      username,
      password,
    });
    const { status, body, description } = data;
    if (status === 200) {
      localStorage.setItem("hkzf_token", body.token);
      window.history.back(-1);
    } else Toast.show(description);
  },
})(Login);

export default Login;
