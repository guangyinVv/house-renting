import React from "react";
import { Outlet,Link } from "react-router-dom";
import { Badge, TabBar } from "antd-mobile";
import {
  AppOutline,
  CollectMoneyOutline,
  SearchOutline,
  UserOutline,
} from "antd-mobile-icons";

class Home extends React.Component {
  state = {
    tabs: [
      {
        key: "home",
        title: "首页",
        icon: <AppOutline />,
        badge: Badge.dot,
      },
      {
        key: "findHouse",
        title: "找房",
        icon: <SearchOutline />,
        badge: "5",
      },
      {
        key: "consult",
        title: "咨询",
        icon: <CollectMoneyOutline />,
        badge: "99+",
      },
      {
        key: "personalCenter",
        title: "我的",
        icon: <UserOutline />,
      },
    ],
    key:'home'
  };
  activeKey = ()=>{
    var url = window.location.href;
    var index = url.lastIndexOf("/");
    var str = url.substring(index + 1,url.length);
    return str
  }
  setRouteActive = (key) => {
    this.setState({
      key:key
    },
    ()=>{
      const link = document.querySelector('.link');
      link.click()
    }
    )
  };
  render() {
    return (
      <div>
        <Outlet />
        <div
          style={{
            position: "fixed",
            bottom: "0",
            width: "100%",
          }}
        >
          <TabBar
            defaultActiveKey={this.activeKey()}
            onChange={this.setRouteActive}
          >
            {this.state.tabs.map((item) => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
          <Link className="link" style={{display:'none'}} to={`/home/${this.state.key}`}>consult</Link>
        </div>
      </div>
    );
  }
}

export default Home;

// export default withRouter(Home);
