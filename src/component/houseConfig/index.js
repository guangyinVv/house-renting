import { useState, useEffect } from "react";
import styles from "./index.module.css";

const HouseConfig = () => {
  const [icons, setIcons] = useState([]);

  // 渲染字体图标部分
  const getIcons = () => {
    setIcons([
      {
        name: "衣柜",
        iconClass: "icon-test4",
      },
      {
        name: "洗衣机",
        iconClass: "icon-test3",
      },
      {
        name: "空调",
        iconClass: "icon-test5",
      },
      {
        name: "天然气",
        iconClass: "icon-test2",
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
        iconClass: "icon-test6",
      },
      {
        name: "宽带",
        iconClass: "icon-test1",
      },
      {
        name: "暖气",
        iconClass: "FLOOR_HEATING_SYSTEM",
      },
    ]);
  };

  useEffect(() => {
    getIcons();
  }, []);

  const renderIcons = () => {
    return icons.map((item) => {
      return (
        <div key={item.iconClass} className={styles.item}>
          <span className={`iconfont icon-${item.iconClass}`}></span>
          <div>{item.name}</div>
        </div>
      );
    });
  };
  return (
    <>
      <div className={styles.icons}>{renderIcons()}</div>
    </>
  );
};

export default HouseConfig;
