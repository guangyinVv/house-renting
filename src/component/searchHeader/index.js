import React from 'react'
import { Link } from 'react-router-dom'
import { SearchBar } from 'antd-mobile'
import { EnvironmentOutline } from 'antd-mobile-icons'
import { getCurrentCity } from '../../utils'

export default class SearchHeader extends React.Component {
  state = {
    city: '',
  }
  componentDidMount() {
    this.getLocation()
  }
  // 得到当前所在城市的名称
  async getLocation() {
    const data = await getCurrentCity()
    this.setState({
      city: data.label,
    })
  }
  // 跳转到城市选择页面
  jumpToCityList() {
    document.querySelector('.smallhome-search .jumpToCityList').click()
  }
  // 跳转到搜索页面
  jumpToSearch() {
    document.querySelector('.smallhome-search .jumpToSearch').click()
  }
  // 跳转到地图页面
  jumpToMap() {
    document.querySelector('.smallhome-search .jumpToMap').click()
  }
  render() {
    return (
      <div>
        <div className="smallhome-search">
          <div className="search">
            <div className="positionBox" onClick={this.jumpToCityList}>
              <div className="position">{this.state.city}</div>
              <Link style={{ display: 'none' }} className="jumpToCityList" to="/citylist"></Link>
            </div>
            <div className="searchBar" onClick={this.jumpToSearch}>
              <SearchBar></SearchBar>
              <Link style={{ display: 'none' }} className="jumpToSearch" to="/search"></Link>
            </div>
          </div>
          <div className="choosePosition" onClick={this.jumpToMap}>
            <EnvironmentOutline />
            <Link style={{ display: 'none' }} className="jumpToMap" to="/map"></Link>
          </div>
        </div>
      </div>
    )
  }
}
