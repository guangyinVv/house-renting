import React from "react";
import MySwiper from "./swiper";
import "../../../index.scss";
import { SearchBar } from "antd-mobile";
import { EnvironmentOutline } from "antd-mobile-icons";
import { Link } from "react-router-dom";
import { getCurrentCity } from "../../../utils";

import nav1 from "../../../assets/nav-1.png";
import nav2 from "../../../assets/nav-2.png";
import nav3 from "../../../assets/nav-3.png";
import nav4 from "../../../assets/nav-4.png";

// 获取当前经纬度
// navigator.geolocation.getCurrentPosition((position) => {
//   console.log(position);
// });

export default class Smallhome extends React.Component {
  constructor() {
    super();
    this.state = {
      navs: [
        { id: 1, img: nav1, title: "整租", path: "" },
        { id: 2, img: nav2, title: "合租", path: "" },
        { id: 3, img: nav3, title: "地图找房", path: "" },
        { id: 4, img: nav4, title: "去出租", path: "" },
      ],
      // 租房小组数据
      groups: [],
      // 最新资讯
      news: [],
      // 所在城市
      city: "",
    };
    this.getNews();
    this.getGroups();
    this.getLocation();
  }

  getTabbar = () => {
    return this.state.navs.map((item) => (
      <div className="item" key={item.id}>
        <img src={item.img} alt="" />
        <div>{item.title}</div>
      </div>
    ));
  };
  // 获取租房小组数据
  getGroups = async () => {
    const { data } = await this.$http.get("/home/groups");
    if (data.status === 200) {
      this.setState({
        groups: data.body,
      });
    }
  };
  // 获取最新资讯
  async getNews() {
    const { data } = await this.$http.get("/home/news");
    if (data.status === 200) {
      this.setState({
        news: data.body,
      });
    }
  }
  renderNews() {
    // console.log(this.state.news);
    return this.state.news.map((item) => (
      <div className="item" key={item.id}>
        <img src={`${this.$baseUrl}${item.imgSrc}`} alt=""></img>
        <div className="content">
          <h4 className="title">{item.title}</h4>
          <div className="from">{item.from}</div>
          <div className="date">{item.date}</div>
        </div>
      </div>
    ));
  }
  // componentDidMount() {
  //   this.getNews();
  //   this.getGroups();
  //   this.getLocation();
  // }
  renderGroups() {
    return this.state.groups.map((item) => (
      <div className="item" key={item.id}>
        <div className="content">
          <h4>{item.title}</h4>
          <div>{item.desc}</div>
        </div>
        <img src={`${this.$baseUrl}${item.imgSrc}`} alt=""></img>
      </div>
    ));
  }
  // 得到当前所在城市的名称
  async getLocation() {
    const data = await getCurrentCity();
    this.setState({
      city: data.label,
    });
  }
  // 跳转到城市选择页面
  jumpToCityList() {
    document.querySelector(".smallhome-search .jumpToCityList").click();
  }
  // 跳转到搜索页面
  jumpToSearch() {
    document.querySelector(".smallhome-search .jumpToSearch").click();
  }
  // 跳转到地图页面
  jumpToMap() {
    document.querySelector(".smallhome-search .jumpToMap").click();
  }
  render() {
    return (
      <div>
        <div className="smallhome-search">
          <div className="search">
            <div className="positionBox" onClick={this.jumpToCityList}>
              <div className="position">{this.state.city}</div>
              <Link
                style={{ display: "none" }}
                className="jumpToCityList"
                to="/citylist"
              ></Link>
            </div>
            <div className="searchBar" onClick={this.jumpToSearch}>
              <SearchBar></SearchBar>
              <Link
                style={{ display: "none" }}
                className="jumpToSearch"
                to="/search"
              ></Link>
            </div>
          </div>
          <div className="choosePosition" onClick={this.jumpToMap}>
            <EnvironmentOutline />
            <Link
              style={{ display: "none" }}
              className="jumpToMap"
              to="/map"
            ></Link>
          </div>
        </div>
        <MySwiper />
        <div className="smallhome-tabbar">{this.getTabbar()}</div>
        <div className="smallhome-rentGroups">
          <div className="smallhome-groups">
            <h3>租房小组</h3>
            <div>更多</div>
          </div>
          {/* 租房小组 */}
          <div className="smallhome-groupsContent">{this.renderGroups()}</div>
          {/* 最新资讯 */}
          <div className="smallhome-news">
            <h3>最新资讯</h3>
            {this.renderNews()}
          </div>
        </div>
      </div>
    );
  }
}
