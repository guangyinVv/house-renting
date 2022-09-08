import React from "react";
import MySwiper from "./swiper";
import "../../../index.scss";

import nav1 from "../../../assets/nav-1.png";
import nav2 from "../../../assets/nav-2.png";
import nav3 from "../../../assets/nav-3.png";
import nav4 from "../../../assets/nav-4.png";

export default class Smallhome extends React.Component {
  state = {
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
  };
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
  componentDidMount() {
    this.getNews();
    this.getGroups();
  }
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
  render() {
    return (
      <div>
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
            {/* <div className="item">
              <img src="" alt=""></img>
              <div className="content">
                <h4 className="title">
                  置业选择 | 安贞西里 三室一厅 河间的古雅别院
                </h4>
                <div className="from">新华网</div>
                <div className="date">两天前</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}
