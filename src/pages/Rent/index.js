import { ErrorBlock } from 'antd-mobile'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import { axios } from '../../utils/useAxios'
import { useEffect } from 'react'
import { getToken } from '../../utils/auth'
import HouseList from '../../pages/HouseList'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MyNavBar from '../../component/navbar'
// 已发布房源页面
const Rent = () => {
  const [publicHouses, setPublicHouses] = useState([])
  const getHouses = async () => {
    const { data } = await axios.get('/user/houses', { authorization: getToken() })
    setPublicHouses(data.body)
    setState(true)
  }
  // 判断是否加载完毕
  const [state, setState] = useState(false)
  useEffect(() => {
    getHouses()
  }, [])
  const navigate = useNavigate()
  return (
    <div className={styles.rent}>
      <MyNavBar
        right={
          <div
            onClick={() => {
              navigate('/rent/add')
            }}
            className={styles.rentAdd}
          >
            发布房源
          </div>
        }
      >
        我的出租
      </MyNavBar>
      {publicHouses.length > 0 || !state ? (
        <HouseList
          HouseListData={publicHouses}
          searchHouseList={() => {
            return !state
          }}
        />
      ) : (
        <ErrorBlock
          status="empty"
          title=""
          description={
            <span>
              您还没有房源,<Link to="/rent/add">去发布房源</Link>吧
            </span>
          }
        />
      )}
    </div>
  )
}
export default Rent
