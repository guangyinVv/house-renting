import MyNavBar from '../../../component/navbar'
import styles from './index.module.css'
import WithRightArrow from '../../../component/WithRightArrow'
import { useState, useEffect } from 'react'
import { Input, ImageUploader, Button } from 'antd-mobile'
import HouseConfig from '../../../component/houseConfig'
import { useLocation, useNavigate } from 'react-router-dom'
import { PickerView, Toast } from 'antd-mobile'
import { axios } from '../../../utils/useAxios.js'
const RentAdd = () => {
  // 租金
  const [money, setMoney] = useState('')
  // 建筑面积
  const [area, setArea] = useState('')
  // 房屋标题
  const [title, setTitle] = useState('')
  // 房屋描述
  const [desc, setDesc] = useState('')
  // 上传图片
  const [img, setImg] = useState([])

  // 户型
  const [roomtype, setRoomtype] = useState([])
  const [roomtypeText, setRoomtypeText] = useState('请选择')
  useEffect(() => {
    roomTypeData.forEach((item) => {
      if (item.value === roomtype[0]) {
        setRoomtypeText(item.label)
      }
    })
  }, [roomtype])
  // 所在楼层
  const [floor, setFloor] = useState([])
  const [floorText, setFloorText] = useState('请选择')
  useEffect(() => {
    floorData.forEach((item) => {
      if (item.value === floor[0]) {
        setFloorText(item.label)
      }
    })
  }, [floor])
  // 朝向
  const [position, setPosition] = useState([])
  const [positionText, setPositionText] = useState('请选择')
  useEffect(() => {
    orientedData.forEach((item) => {
      if (item.value === position[0]) {
        setPositionText(item.label)
      }
    })
  }, [position])
  // 房屋配置
  const [houseConfigValue, setHouseConfigValue] = useState('')

  // 小区名称
  const [communityName, setCommunityName] = useState({})
  const navigate = useNavigate()
  // 设置小区名称
  const { state } = useLocation()
  useEffect(() => {
    if (state !== null && state.name !== undefined) {
      setCommunityName({
        name: state.name,
        id: state.id,
      })
    }
  }, [])

  const [visible, setVisible] = useState(false)

  // 弹出列表的列表项
  const [pickerList, setPickerList] = useState([
    [
      { label: '11', value: '1' },
      { label: '22', value: '2' },
    ],
  ])

  const uploadImg = (val) => {
    const url = URL.createObjectURL(val)
    let file = val
    file.url = url
    const temp = [...imgs]
    temp.push(file)
    // console.log(temp)
    setImgs(temp)
    return {
      url: url,
    }
  }

  // 房屋类型
  const roomTypeData = [
    { label: '一室', value: 'ROOM|d4a692e4-a177-37fd' },
    { label: '二室', value: 'ROOM|d1a00384-5801-d5cd' },
    { label: '三室', value: 'ROOM|20903ae0-c7bc-f2e2' },
    { label: '四室', value: 'ROOM|ce2a5daa-811d-2f49' },
    { label: '四室+', value: 'ROOM|2731c38c-5b19-ff7f' },
  ]

  // 朝向：
  const orientedData = [
    { label: '东', value: 'ORIEN|141b98bf-1ad0-11e3' },
    { label: '西', value: 'ORIEN|103fb3aa-e8b4-de0e' },
    { label: '南', value: 'ORIEN|61e99445-e95e-7f37' },
    { label: '北', value: 'ORIEN|caa6f80b-b764-c2df' },
    { label: '东南', value: 'ORIEN|dfb1b36b-e0d1-0977' },
    { label: '东北', value: 'ORIEN|67ac2205-7e0f-c057' },
    { label: '西南', value: 'ORIEN|2354e89e-3918-9cef' },
    { label: '西北', value: 'ORIEN|80795f1a-e32f-feb9' },
  ]

  // 楼层
  const floorData = [
    { label: '高楼层', value: 'FLOOR|1' },
    { label: '中楼层', value: 'FLOOR|2' },
    { label: '低楼层', value: 'FLOOR|3' },
  ]

  // 用于显示被选中的信息
  let [currentSelect, setCurrentSelect] = useState('')

  // 用于存传输的图片文件
  const [imgs, setImgs] = useState([])

  const addHouse = async () => {
    // console.log(img)
    // console.log(imgs)
    const tempImgs = []
    img.forEach((item) => {
      for (var i = 0; i < imgs.length; i++) {
        if (item.url === imgs[i].url) {
          tempImgs.push(imgs[i])
          break
        }
      }
    })
    setImgs(tempImgs)
    if (tempImgs.length > 0) {
      const form = new FormData()
      tempImgs.forEach((item) => form.append('file', item))
      const { data } = await axios.post('/houses/image', form, { headers: { 'Content-Type': 'multipart/form-data' } })
      console.log(data)
      const houseImg = data.body.join('|')
      const { data: res } = await axios.post('/user/houses', {
        title: title,
        description: desc,
        oriented: position[0],
        supporting: houseConfigValue,
        price: money,
        roomType: roomtype[0],
        size: area,
        floor: floor[0],
        commmunity: communityName.id,
        houseImg: houseImg,
      })
      if (res.status === 200) {
        Toast.show({
          icon: 'success',
          content: '发布成功',
          duration: 1200,
          maskClickable: false,
          afterClose: () => {
            navigate('/rent')
          },
        })
      } else {
        Toast.show({ icon: 'fail', content: '服务器偷懒了，请稍后再试~', duration: 1200 })
      }
    }
  }

  return (
    <div className={styles.divLineBox}>
      <MyNavBar>发布房源</MyNavBar>
      <div className={styles.title}>房源信息</div>
      <WithRightArrow title="小区名称" onRightClick={() => navigate('/rent/search')} rightArrow={true} rightText={communityName === {} || communityName.name === undefined ? '请选择小区' : communityName.name}></WithRightArrow>
      <WithRightArrow title="租金" placeholder="请输入租金/月" input={(val) => setMoney(val)} rightText="￥/月"></WithRightArrow>
      <WithRightArrow title="建筑面积" placeholder="请输入建筑面积" input={(val) => setArea(val)} rightText="m²"></WithRightArrow>
      <WithRightArrow
        onRightClick={() => {
          setCurrentSelect('roomtype')
          setPickerList([roomTypeData])
          setVisible(true)
        }}
        title="户型"
        rightArrow
        rightText={roomtypeText}
      ></WithRightArrow>

      <WithRightArrow
        onRightClick={() => {
          setCurrentSelect('floor')
          setPickerList([floorData])
          setVisible(true)
        }}
        title="所在楼层"
        rightArrow
        rightText={floorText}
      ></WithRightArrow>
      <WithRightArrow
        onRightClick={() => {
          setCurrentSelect('position')
          setPickerList([orientedData])
          setVisible(true)
        }}
        title="朝向"
        rightArrow
        rightText={positionText}
      ></WithRightArrow>
      <WithRightArrow title="房屋标题" />
      <Input placeholder="请输入标题(例如:整租小区名2室5000元)" value={title} onChange={(val) => setTitle(val)}></Input>
      <WithRightArrow title="房屋图像" />
      <div className={styles.uploadImg}>
        <ImageUploader maxCount={6} value={img} onChange={setImg} upload={uploadImg} />
      </div>
      <WithRightArrow title="房屋配置" />
      <HouseConfig
        select
        onChange={(val) => {
          setHouseConfigValue(val)
        }}
      />
      <WithRightArrow title="房屋描述" />
      <div className={styles.desc}>
        <textarea
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value)
          }}
          rows="3"
          cols="20"
        ></textarea>
      </div>
      <header className={styles.null}></header>
      <div className={styles.bottom}>
        <Button>取消</Button>
        <Button onClick={addHouse} color="success">
          提交
        </Button>
      </div>
      {/* <div style={visible ? {} : { display: 'none' }}> */}
      {!visible ? null : (
        <>
          {/* 弹出选择框 */}
          <div className={styles.alert}>
            <PickerView
              columns={pickerList}
              value={() => {
                if (currentSelect === 'roomtype') return roomtype
                if (currentSelect === 'floor') return floor
                if (currentSelect === 'position') return position
              }}
              onChange={(val) => {
                if (currentSelect === 'roomtype') {
                  return setRoomtype(val)
                }
                if (currentSelect === 'floor') return setFloor(val)
                if (currentSelect === 'position') return setPosition(val)
              }}
            />
          </div>
          {/* 遮罩层 */}
          <div
            className={styles.mask}
            onClick={() => {
              setVisible(false)
            }}
          ></div>
        </>
      )}
    </div>
    // </div>
  )
}
export default RentAdd
