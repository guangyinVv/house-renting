import { NavBar, Button } from "antd-mobile";
import { SendOutline, UserSetOutline } from "antd-mobile-icons";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import "../../assets/iconfont/iconfont.css";
import HouseList from "../HouseList";
// 用于接受axios
import UserContext from "../../utils/userContext";
import { useContext } from "react";

function HouseDetail(props) {
  const back = () => {
    console.log("back");
  };
  const rightIcon = (
    <div style={{ fontSize: 19 }}>
      <SendOutline />
    </div>
  );

  const [icons, setIcons] = useState([]);

  // 渲染字体图标部分
  const getIcons = () => {
    setIcons([
      {
        name: "衣柜",
        iconClass: "icon-test3",
      },
      {
        name: "洗衣机",
        iconClass: "icon-test2",
      },
      {
        name: "空调",
        iconClass: "icon-test4",
      },
      {
        name: "天然气",
        iconClass: "icon-test1",
      },
      {
        name: "冰箱",
        iconClass: "bingxiang",
      },
      {
        name: "电视",
        iconClass: "icon-test",
      },
      {
        name: "热水器",
        iconClass: "linyu",
      },
      {
        name: "沙发",
        iconClass: "icon-test5",
      },
    ]);
  };

  const renderIcons = () => {
    return icons.map((item) => {
      return (
        <div key={item.iconClass} className={styles.item}>
          <span className={`iconfont icon-${item.iconClass}`}></span>
          <div className={styles.name}>{item.name}</div>
        </div>
      );
    });
  };

  const [houseListData, setHouseListData] = useState([]);
  const userContext = useContext(UserContext);
  const { axios } = userContext;
  // 获取houselistdata的方法
  const searchHouseList = async () => {
    const { value } = JSON.parse(localStorage.getItem("hkzf_city"));
    const { data } = await axios.get("/houses", {
      params: {
        cityId: value,
        start: 1,
        end: 3,
      },
    });
    setHouseListData(data.body.list);
    return false;
  };

  const renderMap = () => {
    const point = {
      lng: 116.404,
      lat: 39.915,
    };
    const map = new window.BMapGL.Map("container");

    const opts = {
      position: point,
      offset: new window.BMapGL.Size(0, 0),
    };

    const label = new window.BMapGL.Label("", opts);
    label.setContent(`<div class=${styles.titleInMap}>天山星城</div>`);
    label.setStyle({
      border: "solid 0px white",
      padding: 0,
      whiteSpace: "nowrap",
      width: 0,
      height: 0,
    });

    map.centerAndZoom(point, 15);
    map.addOverlay(label);
  };

  // 渲染地图只需要一次即可
  useEffect(() => {
    renderMap();
    getIcons();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.NavBar}>
        <NavBar back="返回" onBack={back} right={rightIcon}>
          天山星城
        </NavBar>
      </div>
      <div className={styles.img}></div>
      <div className={styles.titleBox}>
        <div className={styles.title}>
          整租，精装修，拎包入住，配套齐Q，价格优惠
        </div>
        <div className={styles.tags}>
          <div className={styles.tag}>随时看房</div>
          <div className={styles.tag}>随时看房</div>
        </div>
      </div>
      <div className={styles.detail}>
        <div>
          <div className={styles.value}>
            8500<span>/月</span>
          </div>
          <div className={styles.name}>租金</div>
        </div>
        <div>
          <div className={styles.value}>1室1厅1卫</div>
          <div className={styles.name}>房型</div>
        </div>
        <div>
          <div className={styles.value}>78平米</div>
          <div className={styles.name}>面积</div>
        </div>
      </div>
      <div className={styles.desc}>
        <div>
          <span className={styles.name}>装修：</span>
          <span className={styles.value}>精装</span>
        </div>
        <div>
          <span className={styles.name}>朝向：</span>
          <span className={styles.value}>南</span>
        </div>
        <div>
          <span className={styles.name}>楼层：</span>
          <span className={styles.value}>低楼层</span>
        </div>
        <div>
          <span className={styles.name}>类型：</span>
          <span className={styles.value}>普通住宅</span>
        </div>
      </div>
      <div className={styles.map}>
        <div className={styles.position}>
          <span>小区：</span>天山星城
        </div>
        <div className={styles.detailMap} id="container"></div>
      </div>
      <div className={styles.houseConfig}>
        <h3>房屋配套</h3>
        <div className={styles.icons}>{renderIcons()}</div>
      </div>
      <div className={styles.summary}>
        <h3>房源概况</h3>
        <div className={styles.commentBox}>
          <div className={styles.header}>
            <div
              className={styles.avatar}
              style={{
                width: 50,
                height: 50,
                backgroundColor: "pink",
                borderRadius: "50%",
              }}
            ></div>
            <div className={styles.FullName}>
              <div className={styles.author}>王女士</div>
              <div className={styles.identity}>
                <UserSetOutline fontSize={16} />
                <div>已认证房主</div>
              </div>
            </div>
            <div className={styles.sendMessage}>
              <Button color="success" fill="outline">
                发消息
              </Button>
            </div>
          </div>
          <div className={styles.comment}>
            1.周边配套齐全,地铁四号线陶然亭站，交通便利,公交
            云集，距离北京南站、西站都很近距离。2.小区规模大 ，
            配套全年，幼儿园，体育场，游泳馆,养老院，小学。3.
            人车分流，环境优美。4.精装两居室 ,居家生活方便,还
            有一个小书房,看房随时联系。
          </div>
        </div>
      </div>
      {/* 猜你喜欢 */}
      <div className={styles.youLike}>
        <h3>猜你喜欢</h3>
        <HouseList
          HouseListData={houseListData}
          searchHouseList={searchHouseList}
          infinite={false}
        />
      </div>

      <div style={{ height: "300px" }}></div>
      <div className={styles.bottom}>
        <div className={styles.function}>收藏</div>
        <div className={styles.function}>在线咨询</div>
        <div className={(styles.function, styles.telephone)}>电话预约</div>
      </div>
    </div>
  );
}

export default HouseDetail;
