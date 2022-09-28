import { useRef, useEffect } from 'react'
import MyNavBar from '../../component/navbar'
import { Input } from 'antd-mobile'
import styles from './index.module.css'
import { Button, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { axios } from '../../utils/useAxios'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

// 获取url参数
function GetRequest() {
  const url = window.location.search //获取url中"?"符后的字串
  let theRequest = {}
  if (url.indexOf('?') !== -1) {
    let str = url.substr(1)
    let strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return theRequest
}

// 正则校验
const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

let Login = (props) => {
  const { handleSubmit } = props
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
      <Form>
        <div ref={inputKey} className={styles.inputBox}>
          <div className="adm-input">
            <Field className="adm-input-element" name="username" type="text" placeholder="请输入账号"></Field>
          </div>
          <ErrorMessage className={styles.error} name="username" component="div"></ErrorMessage>
          <div className="adm-input">
            <Field className="adm-input-element" name="password" type="password" placeholder="请输入密码"></Field>
          </div>
          <ErrorMessage className={styles.error} name="password" component="div"></ErrorMessage>
        </div>
        <div className={styles.buttonBox}>
          <Button type="submit" color="success">
            登录
          </Button>
        </div>
      </Form>
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
  validationSchema: Yup.object().shape({
    username: Yup.string().required('账号不能为空').matches(REG_UNAME, '长度为5到8位，只能出现数字、字母、下划线'),
    password: Yup.string().required('密码不能为空').matches(REG_PWD, '长度为5到12位，只能出现数字、字母、下划线'),
  }),
  handleSubmit: async (values) => {
    const { go } = GetRequest()
    const { username, password } = values
    const { data } = await axios.post('/user/login', {
      username,
      password,
    })
    const { status, body, description } = data
    if (status === 200) {
      localStorage.setItem('hkzf_token', body.token)
      if (go === undefined || go === '' || go === 'undefined') window.history.back(-1)
      else window.location.replace(go)
    } else Toast.show(description)
  },
})(Login)

export default Login
