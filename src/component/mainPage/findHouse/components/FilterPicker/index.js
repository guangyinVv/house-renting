import React from "react";
import { PickerView } from "antd-mobile";

export default class FilterPicker extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.data);
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
    };
  }

  // 用来判断选项的哪一部分发生了改变
  prevItem: [];

  // 对传进来的数据进行处理，使其成为能够被识别的数组
  formatData() {
    // const data = this.props.data;
  }

  // 动态更新选项
  updateData(currentValue) {}

  test = (a) => {
    console.log(a);
  };
  render() {
    return (
      <>
        <PickerView
          onChange={this.updateData}
          columns={this.state.data}
          mouseWheel={true}
        />
      </>
    );
  }
}
