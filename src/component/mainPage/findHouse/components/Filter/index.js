import React from "react";
import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import styles from "./index.module.css";
import { Button } from "antd-mobile";
import FilterMore from "../FilterMore";

export default class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      titleSelectedStatus: {
        area: false,
        way: false,
        money: false,
        select: false,
      },
      gotPickerValue: [],
      // 控制FilterPicker 或 FilterMore 组件的展示和隐藏
      // area / way / money / select
      openType: "",
      // 通过接口获取的所有数据
      filtersData: "",
      pickerData: [],
      // 用于展示选择器视图的默认内容
      defaultList: {},
      // 初始展示的数据（数组，每项只有一个或三个）
      defaultData: {},
    };
    this.getFiltersData();
  }

  async getFiltersData() {
    const { value } = JSON.parse(localStorage.getItem("hkzf_city"));
    const { data } = await this.$http.get(`/houses/condition?id=${value}`);
    this.setState({
      filtersData: data.body,
    });
  }

  componentDidUpdate() {}

  // 渲染筛选部分
  renderFilterMore() {
    const {
      openType,
      filtersData: { roomType, oriented, floor, characteristic },
    } = this.state;
    const data = {
      roomType,
      oriented,
      floor,
      characteristic,
    };
    if (openType !== "select") return null;
    else
      return (
        <FilterMore
          defaultData={this.state.gotPickerValue[3]}
          sendValue={this.getValue}
          data={data}
        />
      );
  }

  findDataByValue(data, value) {
    let temp;
    data.some((item) => {
      if (item.value === value) {
        temp = item;
        return true;
      }
      return false;
    });
    return temp;
  }

  // 初始化默认选择项
  initDefaultData() {
    const {
      gotPickerValue: defaultData,
      pickerData: data,
      openType: type,
    } = this.state;

    if (data.length === 0) {
      return false;
    }

    let index;
    switch (type) {
      case "area":
        index = 0;
        break;
      case "way":
        index = 1;
        break;
      case "money":
        index = 2;
        break;
      default:
        index = 3;
        break;
    }
    if (index === 3) {
      return;
    }
    let myData = defaultData[index];
    if (defaultData.length === 0 || myData.length === 0) {
      return false;
    } else {
      let temp = [];
      let tempData = [];
      if (type === "area") {
        // 第0项
        tempData[0] = data[index];
        temp[0] = this.findDataByValue(tempData[0], myData[0]);
        tempData[1] = temp[0].children;
        temp[1] = this.findDataByValue(tempData[1], myData[1]);
        tempData[2] = temp[1].children;
        try {
          temp[2] = this.findDataByValue(tempData[2], myData[2]);
        } catch (error) {
          tempData[2] = [
            {
              label: "不限",
              value: "null",
            },
          ];
          temp[2] = "null";
        }

        for (var i = 0; i < temp.length; i++) {
          temp[i] = temp[i].value;
        }
        let { ...defaultList } = this.state.defaultList;
        defaultList[type] = tempData;
        let { ...defaultData } = this.state.defaultData;
        defaultData[type] = temp;
        this.setState({
          defaultList: defaultList,
          defaultData: defaultData,
        });
      } else {
        let { ...defaultData } = this.state.defaultData;
        defaultData[type] = this.state.gotPickerValue[index];
        this.setState({
          defaultData: defaultData,
        });
      }
      return true;
    }
  }

  // 点击标题高亮
  onTitleClick = (type) => {
    // console.log(type);
    const { area, rentType, subway, price } = this.state.filtersData;
    let flag = this.state.titleSelectedStatus[type];
    let data;
    if (type === "area") {
      data = [[area, subway]];
    } else if (type === "way") {
      data = [rentType];
    } else if (type === "money") {
      data = [price];
    }
    // 如果点中的这一项中没有选中内容
    if (flag === false) {
      this.setState({
        titleSelectedStatus: {
          ...this.state.titleSelectedStatus,
          [type]: true,
        },
        openType: type,
        pickerData: data,
      });
    } else {
      // 如果点中的这一项中有选中内容
      this.setState({
        openType: type,
        pickerData: data,
      });
    }
  };

  // 隐藏对话框
  onCancel = () => {
    const { gotPickerValue, openType } = this.state;

    if (openType === "select") {
      if (gotPickerValue[3] === undefined || gotPickerValue[3].length === 0) {
        this.setState({
          titleSelectedStatus: {
            ...this.state.titleSelectedStatus,
            [openType]: false,
          },
        });
      }
      this.setState({
        openType: "",
      });
    } else {
      this.setState({
        defaultData: { ...this.state.defaultData, [openType]: [] },
        defaultList: { ...this.state.defaultList, [openType]: [] },
        openType: "",
        titleSelectedStatus: {
          ...this.state.titleSelectedStatus,
          [openType]: false,
        },
      });
    }
  };
  // 点击确定按钮
  onSave = () => {
    this.setState(
      {
        titleSelectedStatus: {
          ...this.state.titleSelectedStatus,
          [this.state.openType]: true,
        },
      },
      () => {
        this.initDefaultData();
        this.setState({
          openType: "",
        });
      }
    );
  };

  // 把该函数给子组件，子组件调用方法把value给父组件
  getValue = (type, value) => {
    let index;
    switch (type) {
      case "area":
        index = 0;
        break;
      case "way":
        index = 1;
        break;
      case "money":
        index = 2;
        break;
      // select
      default:
        index = 3;
        break;
    }
    let temp = Array.from(this.state.gotPickerValue);
    // console.log(value)
    temp[index] = value;
    this.setState({
      gotPickerValue: temp,
    });
    if (type === "select") {
      if (value.length === 0) {
        this.setState({
          titleSelectedStatus: {
            ...this.state.titleSelectedStatus,
            [this.state.openType]: false,
          },
        });
      }
      this.setState({
        openType: "",
      });
    }
  };

  render() {
    const { titleSelectedStatus, openType } = this.state;
    return (
      <>
        <FilterTitle
          titleSelectedStatus={titleSelectedStatus}
          onTitleClick={this.onTitleClick}
        />
        {openType === "area" || openType === "way" || openType === "money" ? (
          <div>
            <FilterPicker
              data={this.state.pickerData}
              type={this.state.openType}
              sendValue={this.getValue}
              defaultList={this.state.defaultList}
              defaultData={this.state.defaultData}
            />
            {/* 取消，确定按钮 */}
            <div className={styles.buttons}>
              <div className={styles.cancel}>
                <Button onClick={this.onCancel}>取消</Button>
              </div>
              <div className={styles.check}>
                <Button onClick={this.onSave} color="success">
                  确定
                </Button>
              </div>
            </div>
          </div>
        ) : null}
        {this.renderFilterMore()}
        {openType !== "" ? (
          <div className={styles.mask} onClick={this.onCancel}></div>
        ) : null}
      </>
    );
  }
}
