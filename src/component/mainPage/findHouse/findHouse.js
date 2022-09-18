import React from "react";
import SearchHeader from "../../searchHeader";
import styles from "./index.module.css";
import { LeftOutline } from "antd-mobile-icons";
import Filter from "./components/Filter";
import HouseList from "../../../pages/HouseList";

export default class FindHouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HouseListData: [],
      unUse: 0,
    };
    // 用于展示房屋列表数据的value值
    this.HouseListValue = {
      area: "null",
      mode: "null",
      price: "null",
      more: "null",
    };
  }

  // 更新默认房屋列表数据
  componentDidMount() {
    this.searchHouseList();
  }

  getHouseListData = (data) => {
    this.HouseListValue = data;
    this.searchHouseList();
  };

  // 用来获取房屋列表数据
  async searchHouseList() {
    const { value } = JSON.parse(localStorage.getItem("hkzf_city"));

    const { area, mode, price, more } = this.HouseListValue;

    const { data } = await this.$http.get("/houses", {
      params: {
        cityId: value,
        area: area,
        mode: mode,
        price: price,
        more: more,
        start: 1,
        end: 20,
      },
    });
    this.setState({
      HouseListData: data.body.list,
      unUse: this.state.unUse + 1,
    });
  }

  render() {
    return (
      <>
        <div className={styles.searchBar}>
          <div
            className={styles.leftArrow}
            onClick={() => window.history.go(-1)}
          >
            <LeftOutline fontSize={20} />
          </div>
          <SearchHeader />
        </div>
        <Filter getHouseListData={this.getHouseListData}></Filter>
        <HouseList
          HouseListData={this.state.HouseListData}
          unUse={this.state.unUse}
        />
      </>
    );
  }
}
