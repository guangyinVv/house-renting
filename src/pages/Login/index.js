import { useState, useRef, useEffect } from 'react'
import MyNavBar from '../../component/navbar'
import { Input } from 'antd-mobile'
import styles from './index.module.css'
import { Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { axios } from '../../utils/useAxios'
import { withFormik } from 'formik'

let Login = (props) => {
  const { values, handleSubmit, handleChange } = props

  // const handCommit = async () => {
  //   const { data } = await axios.post('/user/login', {
  //     username: account,
  //     password: password,
  //   })
  //   const { status, body, description } = data
  //   if (status === 200) {
  //     localStorage.setItem('hkzf_token', body.token)
  //     navigate(-1)
  //   } else Toast.show(description)
  // }
  const inputKey = useRef()
  // 给输入框绑定键盘输入事件
  useEffect(() => {
    inputKey.current.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        handleSubmit()
      }
    })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <MyNavBar>账号登录</MyNavBar>
      <form onSubmit={handleSubmit}>
        <div ref={inputKey} className={styles.inputBox}>
          <div className="adm-input">
            <input className="adm-input-element" name="username" type="text" placeholder="请输入账号" value={values.username} onChange={handleChange}></input>
          </div>
          <div className="adm-input">
            <input className="adm-input-element" name="password" type="password" placeholder="请输入密码" value={values.password} onChange={handleChange}></input>
          </div>
        </div>
        <div className={styles.buttonBox}>
          <Button type="submit" color="success">
            登录
          </Button>
        </div>
      </form>
      <div style={{ display: 'none' }}>
        <Input></Input>
      </div>

      <div className={styles.toRegist}>
        <Link to="/regist">还没有账号，去注册~</Link>
      </div>
    </>
  )
}

Login = withFormik({
  mapPropsToValues: () => ({ username: '', password: '' }),
  handleSubmit: async (values) => {
    const { username, password } = values
    const { data } = await axios.post('/user/login', {
      username,
      password,
    })
    const { status, body, description } = data
    if (status === 200) {
      localStorage.setItem('hkzf_token', body.token)
      window.history.back(-1)
    } else Toast.show(description)
  },
})(Login)

export default Login
