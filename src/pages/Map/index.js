import React from "react";
import { NavBar } from "antd-mobile";

export default class Map extends React.Component {
  state = {
    city: "",
  };
  async componentDidMount() {
    const map = new window.BMapGL.Map("container");
    const { label } = JSON.parse(localStorage.getItem("hkzf_city"));
    const { data } = await this.$http.get(`/area/info?name=${label}`);
    // 给地图添加比例尺和缩放控件
    map.addControl(new window.BMapGL.ScaleControl());
    map.addControl(new window.BMapGL.ZoomControl());
    // 把有数据的城市给展示出来
    if (data.status === 200) {
      this.setState(
        {
          city: data.body.label,
        },
        () => {
          // 解析城市的地址
          var myGeo = new window.BMapGL.Geocoder();
          // 将地址解析结果显示在地图上，并调整地图视野
          myGeo.getPoint(
            label,
            function (point) {
              if (point) {
                map.centerAndZoom(point, 11);
                // 添加文本覆盖物
                const opts = {
                  position: point,
                  offset: new window.BMapGL.Size(-35, -35),
                };
                const label = new window.BMapGL.Label("", opts);

                label.setContent(
                  '<div class="overlay"><div class="name">浦东</div><div class="num">99套</div></div>'
                );
                label.setStyle({
                  border: "solid 0px white",
                  padding: 0,
                  whiteSpace: "nowrap",
                });
                map.addOverlay(label);
              } else {
                alert("您选择的地址没有解析到结果！");
              }
            },
            label
          );
        }
      );
    }
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
