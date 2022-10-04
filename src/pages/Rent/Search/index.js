import { SearchBar } from 'antd-mobile'
import styles from './index.module.css'
import { useState } from 'react'
import { getCity } from '../../../utils'
import { axios } from '../../../utils/useAxios'
import { useNavigate } from 'react-router-dom'
const RentSearch = () => {
  const [tipList, setTipList] = useState([])
  const renderTips = () => {
    return tipList.map((item, index) => {
      return (
        <div
          key={index}
          className={styles.tip}
          onClick={() => {
            navigate('/rent/add', { replace: true, state: { name: item.communityName, id: item.community } })
          }}
        >
          {item.communityName}
        </div>
      )
    })
  }
  const navigate = useNavigate()
  let timer = null
  return (
    <div className={styles.search}>
      <SearchBar
        onCancel={() => {
          navigate(-1)
        }}
        onChange={(val) => {
          clearTimeout(timer)
          timer = setTimeout(async () => {
            const { data } = await axios.get('/area/community', {
              params: { name: val, id: getCity.value },
            })
            setTipList(data.body)
          }, 500)
        }}
        placeholder="请输入小区或地址"
        showCancelButton={() => true}
      ></SearchBar>
      {renderTips()}
    </div>
  )
}
export default RentSearch
