import React from 'react'
// 导入路由
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link,
  Navigate,
} from 'react-router-dom'

// 导入首页和城市选择组件
import Home from './pages/Home'
import CityList from './pages/CityList'

import Smallhome from './component/mainPage/home/home'
import Consult from './component/mainPage/consult/consult'
import PersonalCenter from './component/mainPage/personalCenter/personalCenter'
import FindHouse from './component/mainPage/findHouse/findHouse'
import Search from './pages/Search/search'
import Test from './component/Test/test'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import RequireAuth from './utils/auth'
import Rent from './pages/Rent'
import RentAdd from './pages/Rent/Add'
import RentSearch from './pages/Rent/Search'

function App(props) {
  return (
    <Router>
      {/* 路由 */}
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route path="" element={<Smallhome />} />
          <Route path="findHouse" element={<FindHouse />} />
          <Route path="consult" element={<Consult />} />
          <Route path="personalCenter" element={<PersonalCenter />} />
        </Route>
        {/* 重定向到home */}
        <Route path="" element={<Navigate to="/home" />}></Route>
        {/* 城市选择页面 */}
        <Route path="/citylist" element={<CityList />}></Route>
        {/* 搜索页面 */}
        <Route path="/search" element={<Search />}></Route>
        {/* 地图页面 */}
        <Route path="/map" element={<Map />} />
        {/* 测试组件 */}
        <Route path="/test" element={<Test />}></Route>
        {/* 房屋详情页面 */}
        <Route path="/houseDetail/:id" element={<HouseDetail />}></Route>
        {/* 登录界面 */}
        <Route path="/login" element={<Login />}></Route>
        {/* 需要登录才能访问的页面 */}
        <Route
          path="/rent"
          element={
            <RequireAuth go="/rent">
              <Rent />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/rent/add"
          element={
            <RequireAuth go="/rent/add">
              <RentAdd />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/rent/search"
          element={
            <RequireAuth go="/rent/search">
              <RentSearch />
            </RequireAuth>
          }
        ></Route>
      </Routes>
      {/* <Link to="/home">首页</Link>' '<Link to="/citylist">城市选择</Link>' '<Link to="/test">测试组件</Link> */}
    </Router>
  )
}

export default App
