import { useState, useEffect } from "react";
import styles from "./index.module.css";
import PropTypes from "prop-types";

// 该组件用于展示房屋配置中的图标和描述文字
const HouseConfig = (props) => {
  const [icons, setIcons] = useState([
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

  const selectIcon = () => {
    var temp = [];
    icons.forEach((item) => {
      if (props.list.indexOf(item.name) >= 0) {
        temp.push(item);
      }
    });
    setIcons(temp);
  };

  useEffect(() => {
    selectIcon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

// props校验
HouseConfig.propTypes = {
  list: PropTypes.any.isRequired,
};

export default HouseConfig;
