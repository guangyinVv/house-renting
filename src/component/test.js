import React from 'react'
import { useLocation } from 'react-router-dom'
import { AppOutline, MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons'
import { TabBar } from 'antd-mobile'
const Bottom = () => {
  const location = useLocation()
  const { pathname } = location
  // const setRouteActive = (value) => {
  //   history.push(value)
  // }

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/todo',
      title: '待办',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/message',
      title: '消息',
      icon: <MessageOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ]
  return (
    <TabBar activeKey={pathname}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

export default class Test extends React.Component {
  render() {
    return <Bottom></Bottom>
  }
}
