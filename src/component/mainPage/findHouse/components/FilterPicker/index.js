import React from 'react'
import { PickerView } from 'antd-mobile'
import { Collection } from 'react-virtualized'

export default class FilterPicker extends React.Component {
  constructor(props) {
    super(props)
    // console.log(props.data)
    this.state = {
      data: props.data,
      // basicColumns: [
      //   [
      //     { label: "周一", value: "Mon" },
      //     { label: "周二", value: "Tues" },
      //     { label: "周三", value: "Wed" },
      //     { label: "周四", value: "Thur" },
      //     { label: "周五", value: "Fri" },
      //   ],
      //   [
      //     { label: "上午", value: "am" },
      //     { label: "下午", value: "pm" },
      //   ],
      //   [
      //     { label: "八点", value: "eight" },
      //     { label: "六点", value: "six" },
      //   ],
      // ],
    }
    // 用来判断选项的哪一部分发生了改变
    this.prevItem = []
  }

  // 对传进来的数据进行处理，使其成为能够被识别的数组
  formatData() {
    // const data = this.props.data;
  }

  findChildren(data, value) {
    // console.log(data)
    // console.log(value)
    let temp
    data.some((item) => {
      if (item.value === value) {
        temp = item
        return true
      }
    })
    return temp.children
  }

  // 动态更新选项
  updateData = (currentValue) => {
    console.log(currentValue)
    // 表明这是首次加载，我们初始化下数据
    if (this.prevItem.length === 0) {
      this.prevItem = currentValue
      let temp = Array.from(this.state.data)
      // temp[1]=temp[0]
      temp[1] = temp[0][0].children
      temp[2] = [{ label: '不限', value: 'null' }]
      this.setState({
        data: temp,
      })
      return
    }
    // 如果第0项发生变化，则应该更改第1项的值
    if (this.prevItem.length >= 1 && this.prevItem[0] !== currentValue[0]) {
      let temp = Array.from(this.state.data)
      temp[1] = this.findChildren(this.state.data[0], currentValue[0])
      this.setState({
        data: temp,
      })
    } else if (this.prevItem.length >= 2 && this.prevItem[1] !== currentValue[1]) {
      let temp = Array.from(this.state.data)
      temp[2] = this.findChildren(this.state.data[1], currentValue[1])
      if (temp[2] !== null && temp[2] !== 'null' && temp[2] !== undefined) {
      } else {
        temp[2] = [{ label: '不限', value: 'null' }]
      }
      this.setState({
        data: temp,
      })
    }
    this.prevItem = currentValue
  }

  test = () => {}
  render() {
    return (
      <div className="filterPicker-container">
        <PickerView onChange={this.updateData} columns={this.state.data} mouseWheel={true} />
      </div>
    )
  }
}
