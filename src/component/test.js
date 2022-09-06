import React from "react";
import { Badge, TabBar } from "antd-mobile";
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from "antd-mobile-icons";

export default class Test extends React.Component {
  state = {
    tabs: [
      {
        key: "home",
        title: "首页",
        icon: <AppOutline />,
        badge: Badge.dot,
      },
      {
        key: "todo",
        title: "待办",
        icon: <UnorderedListOutline />,
        badge: "5",
      },
      {
        key: "message",
        title: "消息",
        icon: (active: boolean) =>
          active ? <MessageFill /> : <MessageOutline />,
        badge: "99+",
      },
      {
        key: "personalCenter",
        title: "我的",
        icon: <UserOutline />,
      },
    ],
  };
  render() {
    return (
      <TabBar>
        {this.state.tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    );
  }
}
