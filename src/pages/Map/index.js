import React from 'react'
import { NavBar } from 'antd-mobile'

export default class Map extends React.Component {
  state = {
    city: '',
  }
  componentDidMount() {
    const map = new window.BMapGL.Map('container')
    var point = new window.BMapGL.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)

    var myCity = new window.BMapGL.LocalCity()
    myCity.get(async (result) => {
      var cityName = result.name
      map.setCenter(cityName)
      const { data } = await this.$http.get(`/area/info?name=${cityName}`)
      if (data.status === 200) {
        this.setState({
          city: data.body.label,
        })
      }
    })
  }
  render() {
    return (
      <div>
        <NavBar style={{ position: 'fixed', marginTop: 0, width: '100vw', zIndex: 6 }} onBack={() => window.history.go(-1)}>
          地图找房
        </NavBar>
        <div id="container" style={{ width: '100%', height: '100vh' }}>
          123
        </div>
      </div>
    )
  }
}
