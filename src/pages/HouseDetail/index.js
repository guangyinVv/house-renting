import {
  NavBar,
  Button,
  Swiper,
  Dialog,
  Toast
} from 'antd-mobile'
import {SendOutline, UserSetOutline, StarOutline, HeartFill} from 'antd-mobile-icons'
import {useEffect, useState} from 'react'
import styles from './index.module.css'
import '../../assets/iconfont/iconfont.css'
import HouseList from '../HouseList'
import {useParams, useNavigate} from 'react-router-dom'
// 用于接受axios
import UserContext from '../../utils/userContext'
import {useContext} from 'react'
import HouseConfig from '../../component/houseConfig'
import {isAuth} from '../../utils/auth'
import {axios} from '../../utils/useAxios'

function HouseDetail() {
  const back = () => {
    window.history.back()
  }
  const rightIcon = (
    <div style={
      {fontSize: 19}
    }>
      <SendOutline/>
    </div>
  )

  const [isFavorite, setIsFavorite] = useState(false)

  const isLogin = isAuth()

  // 判断房源是否被收藏
  const checkFavorite = async () => {
    if (! isLogin) { // 未登录
      return
    }
    const {data} = await axios.get(`/user/favorites/${id}`)
    // 如果token没过期
    if (data.status === 200) {
      setIsFavorite(data.body.isFavorite)
    }
  }

  const navigate = useNavigate()
  const handleFavorite = () => {
    if (! isLogin) {
      Dialog.confirm({
        title: '提示',
        content: '登录后才能收藏房源，是否去登录？',
        onConfirm: () => {
          navigate(`/login?go=/houseDetail/${id}`, {replace: true})
        }
      })
    } else {
      if (!isFavorite) {
        Dialog.confirm({
          title: '提示',
          content: '确认收藏？',
          onConfirm: async () => {
            const {data} = await axios.post('/user/favorites/' + id)
            if (data.status === 200) {
              setIsFavorite(true)
              Toast.show({icon: 'success', content: '收藏成功！', position: 'center'})
            } else {
              Toast.show({icon: 'fail', content: '收藏失败，请尝试重新登录', position: 'center'})
            }
          }
        })
      } else {
        Dialog.confirm({
          title: '提示',
          content: '确认取消收藏？',
          onConfirm: async () => {
            await axios.delete('/user/favorites/' + id)
            setIsFavorite(false)
            Toast.show({icon: 'success', content: '取消收藏成功！', position: 'center'})
          }
        })
      }
    }
  }

  useEffect(() => {
    checkFavorite()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [houseListData, setHouseListData] = useState([])
  const userContext = useContext(UserContext)
  const {baseUrl} = userContext

  // 获取houselistdata的方法
  const searchHouseList = async () => {
    const {value} = JSON.parse(localStorage.getItem('hkzf_city'))
    const {data} = await axios.get('/houses', {
      params: {
        cityId: value,
        start: 1,
        end: 3
      }
    })
    setHouseListData(data.body.list)
    return false
  }

  // 百度地图部分
  const renderMap = () => {
    // const point = {
    // lng: 116.404,
    // lat: 39.915,
    // };
    if (houseDetailData.coord === undefined) {
      return
    }
    const point = {
      lng: houseDetailData.coord.longitude,
      lat: houseDetailData.coord.latitude
    }
    const map = new window.BMapGL.Map('container')

    const opts = {
      position: point,
      offset: new window.BMapGL.Size(0, 0)
    }

    const label = new window.BMapGL.Label('', opts)
    label.setContent(`<div class=${
      styles.titleInMap
    }>${
      houseDetailData.community
    }</div>`)
    label.setStyle({
      border: 'solid 0px white',
      padding: 0,
      whiteSpace: 'nowrap',
      width: 0,
      height: 0
    })

    map.centerAndZoom(point, 15)
    map.addOverlay(label)
  }

  // 通过axios获取房屋详情数据
  const {id} = useParams()
  const [houseDetailData, setHouseDetailData] = useState({
    community: '',
    coord: {
      latitude: '1',
      longitude: '1'
    },
    description: '',
    floor: '',
    houseCode: '',
    houseImg: [],
    oriented: [],
    price: '',
    roomType: '',
    size: '',
    supporting: [],
    tags: [],
    title: ''
  })
  const getHouseDetail = async () => {
    const {data: {
        body
      }} = await axios.get(`/houses/${id}`)
    setHouseDetailData(body)
  }

  // 渲染地图只需要一次即可
  useEffect(() => {
    getHouseDetail()
    // eslint-disable-next-line
  }, [])

  // 这里是根据数据变化渲染数据的
  useEffect(() => {
    renderMap()
    // eslint-disable-next-line
  }, [houseDetailData])

  const renderHouseImg = () => houseDetailData.houseImg.map((item, index) => (
    <Swiper.Item key={index}>
      <img className={
          styles.img
        }
        src={
          `${baseUrl}${item}`
        }
        alt=""></img>
    </Swiper.Item>
  ))

  const renderTags = () => {
    return houseDetailData.tags.map((item, index) => {
      let tagIndex = 0
      if (index > 2) {
        tagIndex = 2
      } else {
        tagIndex = index
      }
      return (
        <div key={index}
          className={
            styles[`tag${tagIndex}`]
        }>
          {item} </div>
      )
    })
  }

  return (
    <>
      <div className={
        styles.NavBar
      }>
        <NavBar back="返回"
          onBack={back}
          right={rightIcon}>
          <div>{
            houseDetailData.community
          }</div>
        </NavBar>
      </div>
      {
      houseDetailData.houseImg.length > 0 ? (
        <Swiper loop autoplay
          style={
            {'--border-radius': '8px'}
          }
          defaultIndex={1}>
          {
          renderHouseImg()
        } </Swiper>
      ) : null
    }

      <div className={
        styles.titleBox
      }>
        <div className={
          styles.title
        }>
          {
          houseDetailData.title
        }</div>
        <div className={
          styles.tags
        }>
          {
          renderTags()
        }</div>
      </div>
      <div className={
        styles.detail
      }>
        <div>
          <div className={
            styles.value
          }>
            {
            houseDetailData.price
          }
            <span>/月</span>
          </div>
          <div className={
            styles.name
          }>租金</div>
        </div>
        <div>
          <div className={
            styles.value
          }>
            {
            houseDetailData.roomType
          }</div>
          <div className={
            styles.name
          }>房型</div>
        </div>
        <div>
          <div className={
            styles.value
          }>
            {
            houseDetailData.size
          }平米</div>
          <div className={
            styles.name
          }>面积</div>
        </div>
      </div>
      <div className={
        styles.desc
      }>
        <div>
          <span className={
            styles.name
          }>装修：</span>
          <span className={
            styles.value
          }>精装</span>
        </div>
        <div>
          <span className={
            styles.name
          }>朝向：</span>
          <span className={
            styles.value
          }>
            {
            houseDetailData.oriented.join(' , ')
          }</span>
        </div>
        <div>
          <span className={
            styles.name
          }>楼层：</span>
          <span className={
            styles.value
          }>
            {
            houseDetailData.floor
          }</span>
        </div>
        <div>
          <span className={
            styles.name
          }>类型：</span>
          <span className={
            styles.value
          }>
            {
            houseDetailData.roomType
          }</span>
        </div>
      </div>
      <div className={
        styles.map
      }>
        <div className={
          styles.position
        }>
          <span>小区：</span>
          {
          houseDetailData.community
        } </div>
        <div className={
            styles.detailMap
          }
          id="container"></div>
      </div>
      <div className={
        styles.houseConfig
      }>
        <h3>房屋配套</h3>
        {
        houseDetailData.supporting.length === 0 ? <div className={
          styles.noData
        }>暂无数据</div> : <HouseConfig list={
          houseDetailData.supporting
        }/>
      } </div>
      <div className={
        styles.summary
      }>
        <h3>房源概况</h3>
        <div className={
          styles.commentBox
        }>
          <div className={
            styles.header
          }>
            <div className={
                styles.avatar
              }
              style={
                {
                  width: 50,
                  height: 50,
                  backgroundColor: 'pink',
                  borderRadius: '50%'
                }
            }></div>
            <div className={
              styles.FullName
            }>
              <div className={
                styles.author
              }>王女士</div>
              <div className={
                styles.identity
              }>
                <UserSetOutline fontSize={16}/>
                <div>已认证房主</div>
              </div>
            </div>
            <div className={
              styles.sendMessage
            }>
              <Button color="success" fill="outline">
                发消息
              </Button>
            </div>
          </div>
          <div className={
            styles.comment
          }>
            {
            houseDetailData.description.length > 0 ? houseDetailData.description : '暂无房屋描述'
          }</div>
        </div>
      </div>
      {/* 猜你喜欢 */}
      <div className={
        styles.youLike
      }>
        <h3>猜你喜欢</h3>
        <HouseList HouseListData={houseListData}
          searchHouseList={searchHouseList}
          infinite={false}/>
      </div>

      {/* <div style={{ height: "300px" }}></div> */}
      <div className={
        styles.bottom
      }>
        <div className={
            styles.function
          }
          onClick={handleFavorite}>
          {
          isFavorite ? (
            <>
              <HeartFill color="red"/>
              已收藏
            </>
          ) : (
            <>
              <StarOutline/>
              收藏
            </>
          )
        } </div>
        <div className={
          styles.function
        }>在线咨询</div>
        <div className={
          `${
            styles.function
          } ${
            styles.telephone
          }`
        }>电话预约</div>
      </div>
    </>
  )
}

export default HouseDetail
