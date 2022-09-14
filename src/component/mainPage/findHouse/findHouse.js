import React from "react";
import SearchHeader from "../../searchHeader";
import styles from "./index.module.css";
import { LeftOutline } from "antd-mobile-icons";
export default class FindHouse extends React.Component {
  render() {
    return (
      <div className={styles.searchBar}>
        <div className={styles.leftArrow} onClick={() => window.history.go(-1)}>
          <LeftOutline fontSize={20} />
        </div>
        <SearchHeader />
      </div>
    );
  }
}
