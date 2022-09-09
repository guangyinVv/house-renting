import React from "react";

export default class Map extends React.Component {
  state = {
    city: "",
  };
  componentDidMount() {
    const map = new window.BMapGL.Map("container");
    var point = new window.BMapGL.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);

    var myCity = new window.BMapGL.LocalCity();
    myCity.get(async (result) => {
      var cityName = result.name;
      map.setCenter(cityName);
      const { data } = await this.$http.get(`/area/info?name=${cityName}`);
      if (data.status === 200) {
        this.setState({
          city: data.body.label,
        });
      }
    });
  }
  render() {
    return (
      <div id="container" style={{ width: "100%", height: "100vh" }}>
        123
      </div>
    );
  }
}
