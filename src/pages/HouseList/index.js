import React from "react";
import styles from "./index.module.css";
import { InfiniteScroll, List, ErrorBlock } from "antd-mobile";

export default class HouseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,
    };
    // 节流阀，防止search函数触发过多
    this.searchFlag = true;
  }

  searchHouseList = async () => {
    if (this.searchFlag && this.props.searchHouseList !== undefined) {
      this.searchFlag = false;
      const flag = await this.props.searchHouseList();
      this.searchFlag = true;
      this.setState({
        hasMore: flag,
      });
    }
  };

  renderHouseList = () => {
    // console.log(this.props.HouseListData);
    const { HouseListData } = this.props;
    return HouseListData.map((item, index) => {
      return (
        <List.Item key={index}>
          <div className={styles.item}>
            <div className={styles.left}>
              <img
                className={styles.img}
                src={`${this.$baseUrl}${item.houseImg}`}
                alt=""
              ></img>
            </div>
            <div className={styles.right}>
              <div className={styles.title}>{item.title}</div>
              <p className={styles.desc}>{item.desc}</p>
              <div className={styles.labels}>
                {item.tags.map((item1) => {
                  return (
                    <div key={item1} className={styles.label}>
                      {item1}
                    </div>
                  );
                })}
                {/* <div className={styles.label}>近地铁</div>
              <div className={styles.label}>近地铁</div> */}
              </div>
              <div className={styles.price}>
                <span className={styles.money}>{item.price}</span>
                <span className={styles.after}>元/月</span>
              </div>
            </div>
          </div>
        </List.Item>
      );
    });
  };

  render() {
    return (
      <div className={styles.houseList}>
        {this.props.HouseListData.length === 0 &&
        this.state.hasMore === false ? (
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translate(-50%,0)",
            }}
          >
            <ErrorBlock
              status="empty"
              style={{
                "--image-height": "150px",
              }}
              // description={<span>没有找到房源，请您换个搜索条件吧</span>}
            />
          </div>
        ) : (
          <div>
            <List>{this.renderHouseList()}</List>
            <InfiniteScroll
              loadMore={this.searchHouseList}
              hasMore={this.state.hasMore}
            />
          </div>
        )}

        {/* <div className={styles.item}>
          <div className={styles.left}>
            <div className={styles.img}></div>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>环球国际 1室1厅 1280元</div>
            <p className={styles.desc}>1室1厅1卫/99/西/环球国际</p>
            <div className={styles.labels}>
              <div className={styles.label}>近地铁</div>
              <div className={styles.label}>近地铁</div>
            </div>
            <div className={styles.price}>
              <span className={styles.money}>8500</span>
              <span className={styles.after}>元/月</span>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
