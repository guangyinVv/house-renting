import { useEffect, useState } from 'react'
import { axios } from '../../utils/useAxios.js'
import MyNavBar from '../../component/navbar/index.js'
import HouseList from '../HouseList/index.js'
const Favorite = () => {
  const [houseList, setHouseList] = useState([])
  useEffect(() => {
    const getHouseList = async () => {
      const { data } = await axios.get('/user/favorites')
      if (data.status === 200) setHouseList(data.body)
    }
    getHouseList()
  }, [])
  return (
    <>
      <MyNavBar>我的收藏</MyNavBar>
      <HouseList HouseListData={houseList} searchHouseList={() => false}></HouseList>
    </>
  )
}
export default Favorite
