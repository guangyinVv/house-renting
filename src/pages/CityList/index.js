import React from "react";
import { NavBar } from "antd-mobile";

const formatCityData = (list) => {
  let cityList = {};
  let cityIndex = [];
  list.forEach((item) => {
    const first = item.short.substr(0, 1);
    // 如果有这个分类
    if (cityList[first]) {
      cityList[first].push(item);
    } else {
      cityList[first] = [item];
    }
  });
  cityIndex = Object.keys(cityList).sort();
  return {
    cityList,
    cityIndex,
  };
};

export default class CityList extends React.Component {
  constructor() {
    super();
    this.state = {
      cityList: [],
      cityIndex: [],
    };
    this.getCityList();
  }
  // 得到城市列表数据
  async getCityList() {
    const { data } = await this.$http.get("/area/city?level=1");
    if (data.status === 200) {
      const { cityList, cityIndex } = formatCityData(data.body);
      const { data: res } = await this.$http.get("/area/hot");
      if (res.status === 200) {
        cityList["hot"] = res.body;
        cityIndex.unshift("hot");
        this.setState({
          cityList: cityList,
          cityIndex: cityIndex,
        });
      }
      console.log(cityList);
      console.log(cityIndex);
    }
  }
  back = () => window.history.go(-1);
  render() {
    return (
      <div>
        <NavBar onBack={this.back}>城市选择</NavBar>
      </div>
    );
  }
}
