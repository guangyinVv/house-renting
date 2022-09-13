import React from "react";
import { NavBar } from "antd-mobile";

export default class Map extends React.Component {
  state = {
    city: "",
  };

  // 地图的缩放等级
  countLevel = 11;

  // 实现动态创建覆盖物的函数,第四个参数判断是小区还是圆
  renderOverlays = async (map, value, point, circleOrRect) => {
    // point 是包含lng，lat的对象，显示当前城市的经纬度
    const { data } = await this.$http.get(`/area/map?id=${value}`);
    map.centerAndZoom(point, this.countLevel);
    // setTimeout(() => {
    data.body.forEach((item) => {
      const { coord, value, label: name, count } = item;
      const { longitude, latitude } = coord;
      const opts = {
        position: {
          lng: longitude,
          lat: latitude,
        },
      };
      const label = new window.BMapGL.Label("", opts);
      if (this.countLevel === 15) {
        opts.offset = new window.BMapGL.Size(-50, -28);
        label.setContent(
          `<div class="rect">
            <span class="housename">${name}</span>
            <span class="housenum">${count}套</span>
            <i class="arrow"></i>
          </div>`
        );
      } else {
        opts.offset = new window.BMapGL.Size(-35, -35);
        label.setContent(
          `<div class="overlay"><div class="name">${name}</div><div class="num">${count}套</div></div>`
        );
      }

      label.setStyle({
        border: "solid 0px white",
        padding: 0,
        whiteSpace: "nowrap",
      });
      label.addEventListener("click", () => {
        this.countLevel += 2;
        map.clearOverlays();
        this.renderOverlays(map, value, opts.position);
      });
      map.addOverlay(label);
    });
    // }, 0);
  };

  async componentDidMount() {
    const map = new window.BMapGL.Map("container");
    const { label, value } = JSON.parse(localStorage.getItem("hkzf_city"));
    // 给地图添加比例尺和缩放控件
    map.addControl(new window.BMapGL.ScaleControl());
    map.addControl(new window.BMapGL.ZoomControl());
    // 把有数据的城市给展示出来
    this.setState(
      {
        city: { label, value },
      },
      () => {
        // 解析城市的地址
        var myGeo = new window.BMapGL.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(
          label,
          async (point) => {
            this.renderOverlays(map, value, point);
          },
          label
        );
      }
    );
  }
  render() {
    return (
      <div>
        <NavBar
          style={{ position: "fixed", marginTop: 0, width: "100vw", zIndex: 6 }}
          onBack={() => window.history.go(-1)}
        >
          地图找房
        </NavBar>
        <div id="container" style={{ width: "100%", height: "100vh" }}></div>
      </div>
    );
  }
}
