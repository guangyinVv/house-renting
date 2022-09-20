import React from "react";
import SearchHeader from "../../searchHeader";
import styles from "./index.module.css";
import { Toast } from "antd-mobile";
import { LeftOutline } from "antd-mobile-icons";
import Filter from "./components/Filter";
import HouseList from "../../../pages/HouseList";
import Sticky from "../../Sticky";

export default class FindHouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      HouseListData: [],
    };
    // 用于展示房屋列表数据的value值
    this.HouseListValue = {
      area: "null",
      mode: "null",
      price: "null",
      more: "null",
    };
    this.pageInfo = {
      start: 1,
      end: 20,
    };
  }

  // 更新默认房屋列表数据
  componentDidMount() {
    this.searchHouseList();
  }

  // 触发这一函数表明重新获取数据了，需要把page归零
  getHouseListData = async (data) => {
    this.HouseListValue = data;
    this.pageInfo = {
      start: 1,
      end: 20,
    };
    Toast.show({
      content: "加载中...",
      icon: "loading",
    });
    await this.searchHouseList();
    Toast.clear();
  };

  // 用来获取房屋列表数据
  searchHouseList = async () => {
    const { value } = JSON.parse(localStorage.getItem("hkzf_city"));
    const { area: area1, mode, price, more } = this.HouseListValue;
    const { start, end } = this.pageInfo;
    const area = area1 !== undefined ? area1 : "null";
    const { data } = await this.$http.get("/houses", {
      params: {
        cityId: value,
        area: area,
        mode: mode,
        price: price,
        more: more,
        start: start,
        end: end,
      },
    });
    // 如果是第一次查数据，则重新设置houselistdata的值，否则直接拼接即可
    if (start === 1) {
      this.setState({
        HouseListData: data.body.list,
      });
    } else {
      const temp = this.state.HouseListData;
      if (data.body.list.length !== 0) {
        temp.push(...data.body.list);
        this.setState({
          HouseListData: temp,
        });
      }
    }

    this.pageInfo = {
      start: start + data.body.list.length,
      end: end + data.body.list.length,
    };
    if (data.body.list.length === 0) {
      return false;
    } else {
      return true;
    }
  };

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
        <Sticky height="42">
          <Filter getHouseListData={this.getHouseListData}></Filter>
        </Sticky>
        <HouseList
          HouseListData={this.state.HouseListData}
          searchHouseList={this.searchHouseList}
        />
      </>
    );
  }
}
