import React, { createRef } from "react";
import styles from "./index.module.css";

// 能够实现吸顶功能的组件
export default class Sticky extends React.Component {
  placeholder = createRef();
  content = createRef();

  // 滚动事件
  handleScroll = () => {
    const placeholderEl = this.placeholder.current;
    const contentEl = this.content.current;
    const { top } = placeholderEl.getBoundingClientRect();
    if (top <= 0) {
      contentEl.classList.add(`${styles.fixed}`);
      placeholderEl.style.height = `${this.props.height}px`;
    } else {
      contentEl.classList.remove(`${styles.fixed}`);
      placeholderEl.style.height = "0";
    }
  };

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  render() {
    return (
      <div>
        {/* 占位元素 */}
        <div ref={this.placeholder} />
        {/* 内容元素 */}
        <div ref={this.content}>{this.props.children}</div>
      </div>
    );
  }
}
