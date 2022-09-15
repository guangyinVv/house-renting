import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Badge, TabBar } from 'antd-mobile'
import { AppOutline, CollectMoneyOutline, SearchOutline, UserOutline } from 'antd-mobile-icons'

class Home extends React.Component {
  constructor() {
    super()
    var url = window.location.href
    var index = url.lastIndexOf('/')
    var str = url.substring(index + 1, url.length)
    this.state = {
      tabs: [
        {
          key: '',
          title: '首页',
          icon: <AppOutline />,
          badge: Badge.dot,
        },
        {
          key: 'findHouse',
          title: '找房',
          icon: <SearchOutline />,
          badge: '5',
        },
        {
          key: 'consult',
          title: '咨询',
          icon: <CollectMoneyOutline />,
          badge: '99+',
        },
        {
          key: 'personalCenter',
          title: '我的',
          icon: <UserOutline />,
        },
      ],
      key: str === 'home' ? '' : str,
    }
  }
  componentDidMount() {
    window.addEventListener('popstate', this.getDefaultActiveKey)
  }
  componentWillUnmount() {
    window.removeEventListener('popstate', this.getDefaultActiveKey)
  }
  getDefaultActiveKey = () => {
    var url = window.location.href
    var index = url.lastIndexOf('/')
    var str = url.substring(index + 1, url.length)
    this.setState({ key: str === 'home' ? '' : str })
  }
  setRouteActive = (key) => {
    if (key === 'home') key = ''
    this.setState(
      {
        key: key,
      },
      () => {
        const link = document.querySelector('.tabbar-link')
        link.click()
      }
    )
  }
  render() {
    return (
      <div>
        <Outlet />
        <div
          style={{
            position: 'fixed',
            bottom: '0',
            width: '100%',
          }}
        >
          <TabBar activeKey={this.state.key} onChange={this.setRouteActive}>
            {this.state.tabs.map((item) => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
          <Link className="tabbar-link" style={{ display: 'none' }} to={`/home/${this.state.key}`}>
            consult
          </Link>
        </div>
      </div>
    )
  }
}

export default Home

// export default withRouter(Home);
