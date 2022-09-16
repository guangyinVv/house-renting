// 下拉菜单组件
import React from "react";
import { Dropdown } from "antd-mobile";
import "./index.module.css";

export default class FilterTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dom: "",
    };
  }
  componentDidMount() {
    this.bindEvent();
  }
  // 给组件绑上事件委托
  bindEvent() {
    var dom = document.querySelector(".filterTitle .adm-dropdown-nav");
    dom.onclick = (e) => {
      let temp = e.target;
      while (temp.innerText === undefined || !temp.innerText.length > 0) {
        temp = temp.parentNode;
      }
      this.setState({
        dom: temp,
      });
      let text = temp.innerText;

      switch (text) {
        case "区域":
          temp = "area";
          break;
        case "方式":
          temp = "way";
          break;
        case "租金":
          temp = "money";
          break;
        default:
          temp = "select";
          break;
      }
      this.props.onTitleClick(temp);
    };
  }
  render() {
    const { area, way, money, select } = this.props.titleSelectedStatus;
    return (
      <div className="filterTitle">
        {/* <Dropdown onChange={this.onTitleClick}> */}
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
      </div>
    );
  }
}
