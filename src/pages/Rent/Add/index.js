import MyNavBar from '../../../component/navbar'
import styles from './index.module.css'
import WithRightArrow from '../../../component/WithRightArrow'
import { useState, useEffect } from 'react'
import { Input, ImageUploader, Button, Picker } from 'antd-mobile'
import HouseConfig from '../../../component/houseConfig'
import { useLocation, useNavigate } from 'react-router-dom'
const RentAdd = () => {
  const [money, setMoney] = useState('')
  const [area, setArea] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  // 上传图片
  const [img, setImg] = useState([])

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

  // 弹出列表的列表项
  const [pickerList, setPickerList] = useState([
    [
      { label: '11', value: '1' },
      { label: '22', value: '2' },
    ],
  ])
  const [visible, setVisible] = useState(false)
  const [value, setValue] = useState('')

  const uploadImg = (val) => {
    console.log(val)
    return {
      url: URL.createObjectURL(val),
    }
  }
  return (
    <div className={styles.divLineBox}>
      <div>
        <Picker
          columns={pickerList}
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
          value={value}
          onConfirm={(v) => {
            setValue(v)
          }}
        />
      </div>
      <MyNavBar>发布房源</MyNavBar>
      <div className={styles.title}>房源信息</div>
      <WithRightArrow title="小区名称" onRightClick={() => navigate('/rent/search')} rightArrow={true} rightText={communityName === {} || communityName.name === undefined ? '请选择小区' : communityName.name}></WithRightArrow>
      <WithRightArrow title="租金" placeholder="请输入租金/月" input={(val) => setMoney(val)} rightText="￥/月"></WithRightArrow>
      <WithRightArrow title="建筑面积" placeholder="请输入建筑面积" input={(val) => setArea(val)} rightText="m²"></WithRightArrow>
      <WithRightArrow
        onRightClick={() => {
          setVisible(true)
        }}
        title="户型"
        rightArrow
        rightText="请选择"
      ></WithRightArrow>

      <WithRightArrow title="所在楼层" rightArrow rightText="请选择"></WithRightArrow>
      <WithRightArrow title="朝向" rightArrow rightText="请选择"></WithRightArrow>
      <WithRightArrow title="房屋标题" />
      <Input placeholder="请输入标题(例如:整租小区名2室5000元)" value={title} onChange={(val) => setTitle(val)}></Input>
      <WithRightArrow title="房屋图像" />
      <div className={styles.uploadImg}>
        <ImageUploader value={img} onChange={setImg} upload={uploadImg} />
      </div>
      <WithRightArrow title="房屋配置" />
      <HouseConfig />
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
        <Button color="success">提交</Button>
      </div>
    </div>
  )
}
export default RentAdd
