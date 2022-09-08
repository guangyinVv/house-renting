import React from "react";
import MySwiper from "./swiper";
import "../../../index.less";

export default class Smallhome extends React.Component {
  render() {
    return (
      <div>
        <MySwiper />
        <div className="smallhome-tabbar">
          <div className="item">
            <img src="../../../../assets/nav-1.png" alt="" />
            123
          </div>
        </div>
      </div>
    );
  }
}
