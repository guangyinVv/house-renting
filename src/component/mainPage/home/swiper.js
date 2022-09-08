import React from 'react'
import { Swiper, Toast } from 'antd-mobile'

const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      style={{ background: color, height: 212, fontSize: 20, textAlign: 'center', lineHeight: '212px' }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      carousel
    </div>
  </Swiper.Item>
))

class MySwiper extends React.Component {
  state = {
    swipers: items,
    test: 1,
  }
  getSwipers = async () => {
    const { data } = await this.$http.get('home/swiper')
    if (data.status === 200) {
      this.setState(
        {
          swipers: data.body,
        },
        () => {
          this.renderSwipers()
        }
      )
    }
  }
  renderSwipers = () => {
    return this.state.swipers.map((item, index) => (
      <Swiper.Item key={index}>
        <div
          style={{ height: 212, fontSize: 20, textAlign: 'center', lineHeight: '212px' }}
          onClick={() => {
            Toast.show(`你点击了卡片 ${index + 1}`)
          }}
        >
          <img style={{ width: '100%', height: '100%' }} src={`${this.$baseUrl}${item.imgSrc}`} alt=""></img>
        </div>
      </Swiper.Item>
    ))

    // this.setState(
    //   {
    //     swipers: temp,
    //   },
    //   () => {
    //     console.log(this.state.swipers)
    //     console.log(items)
    //     console.log(typeof this.state.swipers)
    //     console.log(typeof items)
    //   }
    // )
  }
  componentDidMount() {
    this.getSwipers()
  }
  render() {
    return (
      <div>
        <Swiper loop autoplay>
          {this.renderSwipers()}
        </Swiper>
      </div>
    )
  }
}

export default MySwiper
