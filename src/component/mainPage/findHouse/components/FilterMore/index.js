import React from "react";
import styles from "./index.module.css";
import { Button } from "antd-mobile";

export default class FilterMore extends React.Component {
  constructor(props) {
    super(props);
    const { defaultData, data } = props;
    this.state = {
      data: data,
      // 表示当前选中项的值
      selectedValues: defaultData === undefined ? [] : defaultData,
    };
  }

  // 点击标签时触发
  onTagClick(value) {
    const { selectedValues } = this.state;
    const newSelectedValues = [...selectedValues];
    if (selectedValues.indexOf(value) <= -1) {
      // 该标签没有被选中
      newSelectedValues.push(value);
    } else {
      // 被选中则取消选中
      const index = newSelectedValues.findIndex((item) => item === value);
      newSelectedValues.splice(index, 1);
    }
    this.setState({
      selectedValues: newSelectedValues,
    });
  }

  // 渲染标签
  renderFilters(type) {
    const { selectedValues } = this.state;

    return type.map((item) => {
      const isSelected = selectedValues.indexOf(item.value) > -1;
      return (
        <div
          key={item.value}
          className={[styles.item, isSelected ? styles.active : ""].join(" ")}
          onClick={() => this.onTagClick(item.value)}
        >
          {item.label}
        </div>
      );
    });
  }

  // 点击取消按钮
  cancel() {
    this.setState({
      selectedValues: [],
    });
  }
  // 点击确定按钮
  isOk = () => {
    this.props.sendValue("select", this.state.selectedValues);
  };

  render() {
    const {
      data: { roomType, oriented, floor, characteristic },
    } = this.state;
    return (
      <div className={styles.more}>
        <div className={styles.title}>户型</div>
        <div className={styles.items}>
          {/* <div className={`${styles.item} ${styles.active}`}>东北</div> */}
          {this.renderFilters(roomType)}
        </div>
        <div className={styles.title}>朝向</div>
        <div className={styles.items}>{this.renderFilters(oriented)}</div>
        <div className={styles.title}>楼层</div>
        <div className={styles.items}>{this.renderFilters(floor)}</div>
        <div className={styles.title}>房屋亮点</div>
        <div className={styles.items}>{this.renderFilters(characteristic)}</div>
        <div className={styles.buttons}>
          <Button
            onClick={() => {
              this.cancel();
            }}
          >
            清除
          </Button>
          <Button color="success" onClick={this.isOk}>
            确定
          </Button>
        </div>
      </div>
    );
  }
}
