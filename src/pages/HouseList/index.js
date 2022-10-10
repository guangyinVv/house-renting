import React from 'react'
import styles from './index.module.css'
import { InfiniteScroll, List as AntdList, ErrorBlock } from 'antd-mobile'
// 给列表组件加上props校验
import PropTypes from 'prop-types'
import { List, AutoSizer } from 'react-virtualized'

class HouseList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMore: true,
    }
    // 节流阀，防止search函数触发过多
    this.searchFlag = true
    this.infinite = props.infinite
  }

  // 通过props传入的查找列表的方法(但该方法获取的数据不在此组件中)，如果往下还有列表，则返回true，否则返回false
  searchHouseList = async () => {
    if (this.searchFlag && this.props.searchHouseList !== undefined) {
      this.searchFlag = false
      const flag = await this.props.searchHouseList()
      this.searchFlag = true
      this.setState({ hasMore: flag })
    }
  }
  componentDidMount() {
    if (this.infinite === false) this.searchHouseList()
  }

  // renderHouseList = () => {
  //   const { HouseListData } = this.props
  //   return HouseListData.map((item, index) => {
  //     return (
  //       <AntdList.Item key={index}>
  //         <div
  //           className={styles.item}
  //           onClick={() => {
  //             window.location.assign(`/houseDetail/${item.houseCode}`)
  //           }}
  //         >
  //           <div className={styles.left}>
  //             <img className={styles.img} src={`${this.$baseUrl}${item.houseImg}`} alt=""></img>
  //           </div>
  //           <div className={styles.right}>
  //             <div className={styles.title}>{item.title}</div>
  //             <p className={styles.desc}>{item.desc}</p>
  //             <div className={styles.labels}>
  //               {item.tags.map((item1) => {
  //                 return (
  //                   <div key={item1} className={styles.label}>
  //                     {item1}{' '}
  //                   </div>
  //                 )
  //               })}
  //               {/* <div className={styles.label}>近地铁</div>
  //             <div className={styles.label}>近地铁</div> */}{' '}
  //             </div>
  //             <div className={styles.price}>
  //               <span className={styles.money}>{item.price}</span>
  //               <span className={styles.after}>元/月</span>
  //             </div>
  //           </div>
  //         </div>
  //       </AntdList.Item>
  //     )
  //   })
  // }

  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const { HouseListData } = this.props
    if (index === HouseListData.length - 2 && this.state.hasMore) {
      this.searchHouseList()
    }
    const item = HouseListData[index]
    return (
      <AntdList.Item key={key} style={style}>
        <div
          className={styles.item}
          onClick={() => {
            window.location.assign(`/houseDetail/${item.houseCode}`)
          }}
        >
          <div className={styles.left}>
            <img className={styles.img} src={`${this.$baseUrl}${item.houseImg}`} alt=""></img>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{item.title}</div>
            <p className={styles.desc}>{item.desc}</p>
            <div className={styles.labels}>
              {item.tags.map((item1) => {
                return (
                  <div key={item1} className={styles.label}>
                    {item1}{' '}
                  </div>
                )
              })}
              {/* <div className={styles.label}>近地铁</div>
            <div className={styles.label}>近地铁</div> */}{' '}
            </div>
            <div className={styles.price}>
              <span className={styles.money}>{item.price}</span>
              <span className={styles.after}>元/月</span>
            </div>
          </div>
        </div>
      </AntdList.Item>
    )
  }

  render() {
    return (
      <div className={styles.houseList}>
        {this.props.HouseListData.length === 0 && this.state.hasMore === false ? (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translate(-50%,0)',
            }}
          >
            <ErrorBlock
              status="empty"
              style={{ '--image-height': '150px' }}
              // description={<span>没有找到房源，请您换个搜索条件吧</span>}
            />
          </div>
        ) : (
          <div
            style={{
              width: '100%',
              height: 'calc(100vh - 32px - 49px - 42.33px )',
            }}
          >
            <AutoSizer>{({ width, height }) => <List scrollToAlignment="start" width={width} height={height} rowHeight={124} rowCount={this.props.HouseListData.length} rowRenderer={this.rowRenderer}></List>}</AutoSizer>
            {/* {this.renderHouseList()} */}
            {/* {this.infinite === false ? null : <InfiniteScroll loadMore={this.searchHouseList} hasMore={this.state.hasMore} />}{' '} */}
          </div>
        )}
      </div>
    )
  }
}
// props校验
HouseList.propTypes = {
  searchHouseList: PropTypes.func.isRequired,
  HouseListData: PropTypes.any.isRequired,
}

export default HouseList
