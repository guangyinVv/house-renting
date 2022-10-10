import React from 'react'
import { Suspense } from 'react'
// 导入路由
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Link,
  Navigate,
} from 'react-router-dom'

import './App.css'

// 导入首页和城市选择组件
import Home from './pages/Home'

import Smallhome from './component/mainPage/home/home'
// import Consult from './component/mainPage/consult/consult'
// import PersonalCenter from './component/mainPage/personalCenter/personalCenter'
// import FindHouse from './component/mainPage/findHouse/findHouse'
// import CityList from './pages/CityList'
// import Search from './pages/Search/search'
// import Test from './component/Test/test'
// import Map from './pages/Map'
// import HouseDetail from './pages/HouseDetail'
// import Login from './pages/Login'
// import Rent from './pages/Rent'
// import RentAdd from './pages/Rent/Add'
// import RentSearch from './pages/Rent/Search'
// import Favorite from './pages/Favorite'

import RequireAuth from './utils/auth'

// import Home from './pages/Home'
// const Home = React.lazy(() => import('./pages/Home'))
// const Smallhome = React.lazy(() => import('./component/mainPage/home/home'))
const Consult = React.lazy(() => import('./component/mainPage/consult/consult'))
const PersonalCenter = React.lazy(() => import('./component/mainPage/personalCenter/personalCenter'))
const FindHouse = React.lazy(() => import('./component/mainPage/findHouse/findHouse'))

const CityList = React.lazy(() => import('./pages/CityList'))
const Search = React.lazy(() => import('./pages/Search/search'))
const Test = React.lazy(() => import('./component/Test/test'))
const Map = React.lazy(() => import('./pages/Map'))
const HouseDetail = React.lazy(() => import('./pages/HouseDetail'))
const Login = React.lazy(() => import('./pages/Login'))
const Rent = React.lazy(() => import('./pages/Rent'))
const RentAdd = React.lazy(() => import('./pages/Rent/Add'))
const RentSearch = React.lazy(() => import('./pages/Rent/Search'))
const Favorite = React.lazy(() => import('./pages/Favorite'))

function App() {
  return (
    <Suspense fallback={<div className="baseLoading">Loading...</div>}>
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
          {/* 出租的三个页面 */}
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
          {/* 我的收藏 */}
          <Route
            path="/favorite"
            element={
              <RequireAuth go="/favorite">
                <Favorite />
              </RequireAuth>
            }
          />
        </Routes>
        {/* <Link to="/home">首页</Link>' '<Link to="/citylist">城市选择</Link>' '<Link to="/test">测试组件</Link> */}
      </Router>
    </Suspense>
  )
}

export default App
