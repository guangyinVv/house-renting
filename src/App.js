import React from "react";
import { Button } from "antd-mobile";
// 导入路由
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

// 导入首页和城市选择组件
import Home from "./pages/Home";
import CityList from "./pages/CityList";
import News from "./pages/News";

import Test from "./component/test";

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
          <Route path="home" element={<News />} />
          <Route path="findHouse" element={<Test />} />
          <Route path="consult" element={<News />} />
          <Route path="personalCenter" element={<News />} />
        </Route>
        <Route path="/citylist" element={<CityList />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
