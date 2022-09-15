import React from "react";
import FilterTitle from "../FilterTitle";
import FilterPicker from "../FilterPicker";
import styles from "./index.module.css";
import { Button } from "antd-mobile";

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
      // 控制FilterPicker 或 FilterMore 组件的展示和隐藏
      // area / way / money / select
      openType: "",
      // 通过接口获取的所有数据
      filtersData: "",
      pickerData: [],
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

  // 点击标题高亮
  onTitleClick = (type) => {
    const { area, rentType, subway, price } = this.state.filtersData;
    let flag = this.state.titleSelectedStatus[type];
    if (flag === false) {
      let data;
      if (type === "area") {
        data = [[area, subway]];
      } else if (type === "way") {
        data = [rentType];
      } else if (type === "money") {
        data = [price];
      }
      this.setState({
        titleSelectedStatus: {
          ...this.state.titleSelectedStatus,
          [type]: true,
        },
        openType: type,
        pickerData: data,
      });
    }
  };

  // 隐藏对话框
  onCancel = () => {
    this.setState({
      openType: "",
    });
  };

  // 点击确定按钮
  onSave = () => {
    this.onCancel();
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
            <FilterPicker data={this.state.pickerData} />
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
            <div className={styles.mask}></div>
          </div>
        ) : null}
      </>
    );
  }
}
