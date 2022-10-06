import { ErrorBlock } from 'antd-mobile'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import { axios } from '../../utils/useAxios'
import { useEffect } from 'react'
import { getToken } from '../../utils/auth'
import HouseList from '../../pages/HouseList'
import { useState } from 'react'
// 已发布房源页面
const Rent = () => {
  const [publicHouses, setPublicHouses] = useState([])
  const getHouses = async () => {
    const { data } = await axios.get('/user/houses', { authorization: getToken() })
    setPublicHouses(data.body)
    console.log(data.body)
  }
  useEffect(() => {
    getHouses()
  }, [])
  return (
    <div className={styles.rent}>
      {publicHouses.length > 0 ? (
        <HouseList
          HouseListData={publicHouses}
          searchHouseList={() => {
            return false
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
