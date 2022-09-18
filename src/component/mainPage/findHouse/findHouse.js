import React from 'react'
import SearchHeader from '../../searchHeader'
import styles from './index.module.css'
import { LeftOutline } from 'antd-mobile-icons'
import Filter from './components/Filter'
import HouseList from '../../../pages/HouseList'

export default class FindHouse extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      HouseListData: {},
    }
    // 用于展示房屋列表数据的value值
    this.HouseListValue = {}
  }

  getHouseListData = (data) => {
    this.HouseListValue = data
    this.searchHouseList()
  }

  // 用来获取房屋列表数据
  async searchHouseList() {
    const { value } = JSON.parse(localStorage.getItem('hkzf_city'))

    const { area, mode, price, more } = this.HouseListValue
    console.log(area)

    const { data } = await this.$http.get('/houses', {
      params: {
        cityId: value,
        area: area,
        mode: mode,
        price: price,
        more: more,
        start: 1,
        end: 20,
      },
    })
    this.setState({
      HouseListData: data.body.list,
    })
  }

  render() {
    return (
      <>
        <div className={styles.searchBar}>
          <div className={styles.leftArrow} onClick={() => window.history.go(-1)}>
            <LeftOutline fontSize={20} />
          </div>
          <SearchHeader />
        </div>
        <Filter getHouseListData={this.getHouseListData}></Filter>
        {this.state.HouseListData.length > 0 ? <HouseList HouseListData={this.state.HouseListData} /> : null}
      </>
    )
  }
}
