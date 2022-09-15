// 下拉菜单组件
import React from 'react'
import { Dropdown } from 'antd-mobile'
import './index.module.css'

export default class FilterTitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  test() {
    console.log(1)
  }
  render() {
    // console.log(this.props)
    const { area, way, money, select } = this.props.titleSelectedStatus
    return (
      <>
        <Dropdown>
          <Dropdown.Item highlight={area} key="area" title="区域">
            123
          </Dropdown.Item>
          <Dropdown.Item highlight={way} key="way" title="方式">
            4
          </Dropdown.Item>
          <Dropdown.Item highlight={money} key="money" title="租金">
            15
          </Dropdown.Item>
          <Dropdown.Item highlight={select} key="select" title="筛选">
            15
          </Dropdown.Item>
        </Dropdown>
      </>
    )
  }
}
