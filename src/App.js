import React from "react";
// 导入路由
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link,
  Navigate,
} from "react-router-dom";

// 导入首页和城市选择组件
import Home from "./pages/Home";
import CityList from "./pages/CityList";

import Smallhome from "./component/mainPage/home/home";
import Consult from "./component/mainPage/consult/consult";
import PersonalCenter from "./component/mainPage/personalCenter/personalCenter";
import FindHouse from "./component/mainPage/findHouse/findHouse";
import Test from "./component/test";

function App() {
  return (
    <Router>
      {/* 路由 */}
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route path="" element={<Smallhome />} />
          {/* <Route path="home" element={<Smallhome />} /> */}
          <Route path="findHouse" element={<FindHouse />} />
          <Route path="consult" element={<Consult />} />
          <Route path="personalCenter" element={<PersonalCenter />} />
          {/* <Route path="" element={<Navigate to="../home" />}></Route> */}
        </Route>
        {/* 重定向到home */}
        <Route path="" element={<Navigate to="/home" />}></Route>
        <Route path="/citylist" element={<CityList />}></Route>
        {/* 测试组件 */}
        <Route path="/test" element={<Test />}></Route>
      </Routes>
      {/* <Link to="/home">首页</Link>' '<Link to="/citylist">城市选择</Link>' '<Link to="/test">测试组件</Link> */}
    </Router>
  );
}

export default App;
