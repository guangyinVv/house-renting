import React from "react";
import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import styles from "./index.module.css";
import { Button } from "antd-mobile";
import FilterMore from "../FilterMore";
import { Spring, animated } from "react-spring";

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
      // 用于展示房源内容的数据
      showData: {
        area: "null",
        way: "null",
        money: "null",
        select: "null",
      },
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

    let index = this.getIndexByType(type);
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
  onCancel = async () => {
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
      await this.setState({
        openType: "",
      });
    } else {
      let index = this.getIndexByType(openType);
      let newGotPickerValue = Array.from(this.state.gotPickerValue);
      newGotPickerValue[index] = [];
      await this.setState({
        defaultData: { ...this.state.defaultData, [openType]: [] },
        defaultList: { ...this.state.defaultList, [openType]: [] },
        gotPickerValue: newGotPickerValue,
        openType: "",
        titleSelectedStatus: {
          ...this.state.titleSelectedStatus,
          [openType]: false,
        },
      });
    }

    await this.formatShowData(openType);
    this.props.getHouseListData(this.state.showData);
  };
  // 点击确定按钮
  onSave = async () => {
    const openType = this.state.openType;
    if (this.state.openType !== "select") {
      await this.setState(
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
    }

    await this.formatShowData(openType);
    this.props.getHouseListData(this.state.showData);
  };

  // 对得到的数据进行处理，使得数据可以用于展示
  formatShowData(inputType) {
    let type = inputType;
    const { gotPickerValue, showData } = this.state;
    let newShowData = { ...showData };
    // 需要更新的那一部分内容
    let updatedValue = "null";
    if (type === "area") {
      // 处理一下是area还是subway的问题
      if (gotPickerValue[0][0] === "subway") {
        type = "subway";
        newShowData.subway = newShowData.area;
        delete newShowData.area;
      } else {
        delete newShowData.subway;
      }
      // area区域有选中值
      if (gotPickerValue[0] !== undefined) {
        if (gotPickerValue[0].length === 3) {
          updatedValue =
            gotPickerValue[0][2] !== "null"
              ? gotPickerValue[0][2]
              : gotPickerValue[0][1];
        }
      }
    } else {
      let index = this.getIndexByType(type);
      if (
        gotPickerValue[index] !== undefined &&
        gotPickerValue[index].length !== 0
      ) {
        updatedValue = gotPickerValue[index].join(",");
      }
    }

    newShowData[type] = updatedValue;

    if (newShowData.way !== undefined) {
      newShowData["mode"] = newShowData.way;
      delete newShowData.way;
    }

    if (newShowData.money !== undefined) {
      newShowData["price"] = newShowData.money;
      delete newShowData.money;
    }
    if (newShowData.select !== undefined) {
      newShowData["more"] = newShowData.select;
      delete newShowData.select;
    }

    this.setState({
      showData: newShowData,
    });
  }

  getIndexByType(type) {
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
    return index;
  }

  // 把该函数给子组件，子组件调用方法把value给父组件
  getValue = (type, value) => {
    let index = this.getIndexByType(type);
    let temp = Array.from(this.state.gotPickerValue);
    temp[index] = value;
    this.setState(
      {
        gotPickerValue: temp,
      },
      () => {
        if (type === "select") {
          if (value.length === 0) {
            this.setState({
              titleSelectedStatus: {
                ...this.state.titleSelectedStatus,
                [this.state.openType]: false,
              },
            });
          }
          this.onSave();
          this.setState({
            openType: "",
          });
        }
      }
    );
  };

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
    if (roomType === undefined) {
      return null;
    }
    return (
      <Spring
        to={{
          transform:
            openType !== "select" ? "translate(100%,0%)" : "translate(0%,0%)",
        }}
        onStart={() => {
          var mask = document.querySelector(`.${styles.filterMoreBox}`);
          mask.style.display = "block";
        }}
        onRest={() => {
          var mask = document.querySelector(`.${styles.filterMoreBox}`);
          mask.style.display = openType === "" ? "none" : "block";
        }}
      >
        {(props) => {
          return (
            <animated.div style={props} className={styles.filterMoreBox}>
              <FilterMore
                defaultData={this.state.gotPickerValue[3]}
                sendValue={this.getValue}
                data={data}
              />
            </animated.div>
          );
        }}
      </Spring>
    );
  }

  // 渲染遮罩层
  renderMask() {
    const { openType } = this.state;
    return (
      <Spring
        from={{ opacity: 0.1 }}
        // to={{ opacity: openType === "" ? 0 : 1 }}
        to={{ opacity: openType === "" ? 0 : 1 }}
        onStart={() => {
          var mask = document.querySelector(`.${styles.mask}`);
          mask.style.display = "block";
        }}
        onRest={() => {
          var mask = document.querySelector(`.${styles.mask}`);
          mask.style.display = openType === "" ? "none" : "block";
        }}
      >
        {(props) => {
          return (
            <animated.div
              className={styles.mask}
              style={props}
              onClick={() => {
                this.setState({ openType: "" });
              }}
            />
          );
        }}
      </Spring>
    );
  }

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
        {/* 遮罩层 */}
        {this.renderMask()}
      </>
    );
  }
}
