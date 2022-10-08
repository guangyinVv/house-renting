import React, { useState, useEffect } from 'react'
import styles from './index.module.css'
import { Button, Grid, Dialog, Toast } from 'antd-mobile'
import { StarOutline, HistogramOutline, ClockCircleOutline, BankcardOutline, UserOutline, LinkOutline } from 'antd-mobile-icons'
import { axios, BaseURL } from '../../../utils/useAxios'
import { useNavigate } from 'react-router-dom'
import { isAuth, getToken, removeToken } from '../../../utils/auth'

const PersonalCenter = () => {
  const DEFAULT_BACKGROUND = `${BaseURL}/img/profile/bg.png`
  const DEFAULT_AVATAR = `${BaseURL}/img/profile/avatar.png`
  const DEFAULT_POSTER = BaseURL + '/img/profile/join.png'
  const navigate = useNavigate()
  // 判断是否登录
  const [isLogin, setIsLogin] = useState(false)
  // 用户信息
  const [userInfo, setUserInfo] = useState({})
  useEffect(() => {
    // 判断是否登录
    setIsLogin(isAuth)
  }, [])
  useEffect(() => {
    // 获取用户信息
    if (isLogin) getUserInfo()
    else setUserInfo({})
  }, [isLogin])
  const getUserInfo = async () => {
    const { data } = await axios.get('/user')
    if (data.status === 200) {
      setUserInfo(data.body)
    } else {
      setIsLogin(false)
    }
  }
  // 用户点击退出时弹出的对话框
  const exitCheck = () => {
    Dialog.confirm({
      content: '是否确定退出？',
      onConfirm: async () => {
        await axios.post('/user/logout', null, {
          headers: {
            authorization: getToken(),
          },
        })
        removeToken()
        setIsLogin(false)
        Toast.show({
          icon: 'success',
          content: '退出成功',
          position: 'center',
        })
      },
    })
  }
  return (
    <>
      <div className={styles.header}>
        <img className={styles.backgroundImg} src={DEFAULT_BACKGROUND} alt=""></img>
        <div className={styles.userBackground}>
          <div className={styles.avatar}>
            <img src={isLogin ? BaseURL + userInfo.avatar : DEFAULT_AVATAR} alt=""></img>
          </div>
          <div className={styles.infoBox}>
            {/* <div className={styles.nickname}>游客</div> */}
            <div className={styles.nickname}>{isLogin ? userInfo.nickname : '游客'}</div>
            <div className={styles.loginBtn}>
              {isLogin ? (
                <>
                  <Button className={styles.exit} color="success" shape="rounded" onClick={exitCheck}>
                    退出
                  </Button>
                  <div className={styles.editInfo}>编辑个人资料</div>
                </>
              ) : (
                <Button
                  onClick={() => {
                    navigate('/login')
                  }}
                  color="success"
                >
                  去登录
                </Button>
              )}

              {/* <Button
                onClick={() => {
                  navigate("/login");
                }}
                color="success"
              >
                去登录
              </Button> */}
            </div>
          </div>
        </div>
      </div>
      <Grid className={styles.iconContent} columns={3} gap={8}>
        <Grid.Item>
          <div className={styles.iconBox} onClick={() => navigate('/favorite')}>
            <StarOutline fontSize={30} />
            <div className={styles.iconName}>我的收藏</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles.iconBox} onClick={() => navigate('/rent')}>
            <HistogramOutline fontSize={30} />
            <div className={styles.iconName}>我的出租</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles.iconBox}>
            <ClockCircleOutline fontSize={30} />
            <div className={styles.iconName}>看房记录</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles.iconBox}>
            <BankcardOutline fontSize={30} />
            <div className={styles.iconName}>成为房主</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles.iconBox}>
            <UserOutline fontSize={30} />
            <div className={styles.iconName}>个人资料</div>
          </div>
        </Grid.Item>
        <Grid.Item>
          <div className={styles.iconBox}>
            <LinkOutline fontSize={30} />
            <div className={styles.iconName}>联系我们</div>
          </div>
        </Grid.Item>
      </Grid>
      <img className={styles.poster} src={DEFAULT_POSTER} alt=""></img>
    </>
  )
}

export default PersonalCenter
