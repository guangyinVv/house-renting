import React from "react";
import { Button } from "antd-mobile";
// 导入路由
import { BrowserRouter as Router, Route, Routes, Link,Navigate } from "react-router-dom";

// 导入首页和城市选择组件
import Home from "./pages/Home";
import CityList from "./pages/CityList";

import Smallhome from "./component/mainPage/home";
import Consult from "./component/mainPage/consult";
import PersonalCenter from "./component/mainPage/personalCenter";
import FindHouse from "./component/mainPage/findHouse";

function App() {
  return (
    <Router>
      <div className="App">
        <Button>登录</Button>
      </div>
      {/* 路由 */}
      <Link to="/home">首页</Link>
      <hr />
      <Link to="/citylist">城市选择</Link>
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route path="home" element={<Smallhome />} />
          <Route path="findHouse" element={<FindHouse />} />
          <Route path="consult" element={<Consult />} />
          <Route path="personalCenter" element={<PersonalCenter />} />
          <Route path="" element={<Navigate to="../home" />}></Route>
        </Route>
        <Route path="/citylist" element={<CityList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
