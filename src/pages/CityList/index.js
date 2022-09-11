import React from 'react'
import { NavBar, Toast } from 'antd-mobile'
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

// 当前有数据的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

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
  constructor(props) {
    super(props)
    this.state = {
      cityList: [],
      cityIndex: [],
      index: 0,
    }
    this.cityListComponent = React.createRef()
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
          <div
            key={item.value}
            className="cityName"
            onClick={() => {
              this.changeCity(item)
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  // 封装函数，渲染索引
  formatRightCityIndex = (input) => {
    return input === 'hot' ? '热' : input.toUpperCase()
  }

  onRowsRendered = ({ startIndex }) => {
    if (startIndex !== this.state.index) {
      this.setState({
        index: startIndex,
      })
    }
    // console.log(startIndex)
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
        this.setState(
          {
            cityList: cityList,
            cityIndex: cityIndex,
          },
          () => this.cityListComponent.current.measureAllRows()
        )
      }
    }
  }
  back = () => window.history.go(-1)

  // 改变城市定位
  changeCity = ({ label, value }) => {
    if (HOUSE_CITY.indexOf(label) > -1) {
      localStorage.setItem('hkzf_city', JSON.stringify({ label, value }))
      this.back()
    } else {
      Toast.show('该城市暂无房源数据！', 1)
    }
  }

  render() {
    return (
      <div>
        <NavBar onBack={() => window.history.go(-1)}>城市选择</NavBar>
        <div className="cityList" style={{ width: '100vw', height: 'calc(100vh - 45px)' }}>
          <AutoSizer>{({ width, height }) => <List scrollToAlignment="start" ref={this.cityListComponent} onRowsRendered={this.onRowsRendered} width={width} height={height} rowCount={this.state.cityIndex.length} rowHeight={this.getRowHeight} rowRenderer={this.rowRenderer}></List>}</AutoSizer>
        </div>
        <ul className="rightCityIndex">
          {this.state.cityIndex.map((item, index) => (
            <div
              key={item}
              onClick={() => {
                this.cityListComponent.current.scrollToRow(index)
              }}
            >
              <li className={index === this.state.index ? 'active' : ''}>{this.formatRightCityIndex(item)}</li>
            </div>
          ))}
        </ul>
      </div>
    )
  }
}
