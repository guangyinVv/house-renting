import React from 'react'
import { NavBar } from 'antd-mobile'
import { getCurrentCity } from '../../utils/index'
import { List, AutoSizer } from 'react-virtualized'
import 'react-virtualized/styles.css'

const formatCityIndex = (letter) => {
  switch (letter) {
    case '#':
      return '当前定位'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase(letter)
  }
}

const formatCityData = (list) => {
  let cityList = {}
  let cityIndex = []
  list.forEach((item) => {
    const first = item.short.substr(0, 1)
    // 如果有这个分类
    if (cityList[first]) {
      cityList[first].push(item)
    } else {
      cityList[first] = [item]
    }
  })
  cityIndex = Object.keys(cityList).sort()
  return {
    cityList,
    cityIndex,
  }
}

export default class CityList extends React.Component {
  constructor() {
    super()
    this.state = {
      cityList: [],
      cityIndex: [],
    }
    this.getCityList()
  }

  // 动态得到RowHeight
  getRowHeight = ({ index }) => {
    const TITLE_HEIGHT = 38
    const CITY_HEIGHT = 50
    return TITLE_HEIGHT + CITY_HEIGHT * this.state.cityList[this.state.cityIndex[index]].length
  }

  // react-virtualized组件的函数
  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const { cityIndex, cityList } = this.state
    const letter = cityIndex[index]
    return (
      <div key={key} style={style}>
        <div className="cityIndex">{formatCityIndex(letter)}</div>
        {cityList[letter].map((item, index) => (
          <div key={item.value} className="cityName">
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  // 得到城市列表数据
  async getCityList() {
    const { data } = await this.$http.get('/area/city?level=1')
    if (data.status === 200) {
      const { cityList, cityIndex } = formatCityData(data.body)
      const { data: res } = await this.$http.get('/area/hot')
      if (res.status === 200) {
        cityList['hot'] = res.body
        cityIndex.unshift('hot')
        cityList['#'] = [await getCurrentCity()]
        cityIndex.unshift('#')
        this.setState({
          cityList: cityList,
          cityIndex: cityIndex,
        })
      }
      console.log(cityList)
      console.log(cityIndex)
    }
  }
  back = () => window.history.go(-1)
  render() {
    return (
      <div>
        <NavBar onBack={this.back}>城市选择</NavBar>
        <div className="cityList" style={{ width: '100vw', height: 'calc(100vh - 45px)' }}>
          <AutoSizer>{({ width, height }) => <List width={width} height={height} rowCount={this.state.cityIndex.length} rowHeight={this.getRowHeight} rowRenderer={this.rowRenderer}></List>}</AutoSizer>
        </div>
      </div>
    )
  }
}
