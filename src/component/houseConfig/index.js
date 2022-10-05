import { useState, useEffect } from 'react'
import styles from './index.module.css'
import PropTypes from 'prop-types'

// 该组件用于展示房屋配置中的图标和描述文字
const HouseConfig = (props) => {
  const [icons, setIcons] = useState([
    {
      name: '衣柜',
      iconClass: 'icon-test4',
      select: false,
    },
    {
      name: '洗衣机',
      iconClass: 'icon-test3',
      select: false,
    },
    {
      name: '空调',
      iconClass: 'icon-test5',
      select: false,
    },
    {
      name: '天然气',
      iconClass: 'icon-test2',
      select: false,
    },
    {
      name: '冰箱',
      iconClass: 'bingxiang',
      select: false,
    },
    {
      name: '电视',
      iconClass: 'icon-test',
      select: false,
    },
    {
      name: '热水器',
      iconClass: 'linyu',
      select: false,
    },
    {
      name: '沙发',
      iconClass: 'icon-test6',
      select: false,
    },
    {
      name: '宽带',
      iconClass: 'icon-test1',
      select: false,
    },
    {
      name: '暖气',
      iconClass: 'FLOOR_HEATING_SYSTEM',
      select: false,
    },
  ])

  // 选择图标
  const setSelect = (index) => {
    let temp = [...icons]
    temp[index].select = !icons[index].select
    setIcons(temp)
  }

  // icons一变化就会触发formatValue函数
  useEffect(() => {
    formatValue()
  }, [icons])

  // 获取图标的value，即在每个name中间加|
  const formatValue = () => {
    const array = []
    icons.forEach((item) => {
      if (item.select) {
        array.push(item.name)
      }
    })
    const value = array.join('|')
    props.onChange(value)
  }

  const selectIcon = () => {
    if (props.list.length === 0) {
      return
    }
    var temp = []
    icons.forEach((item) => {
      if (props.list.indexOf(item.name) >= 0) {
        temp.push(item)
      }
    })
    setIcons(temp)
  }

  useEffect(() => {
    selectIcon()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderIcons = () => {
    return icons.map((item, index) => {
      return (
        <div
          key={item.iconClass}
          className={styles.item}
          onClick={
            props.select
              ? () => {
                  setSelect(index)
                }
              : () => {}
          }
          style={item.select ? { color: 'rgb(30 219 160)' } : {}}
        >
          <span className={`iconfont icon-${item.iconClass}`}></span>
          <div>{item.name}</div>
        </div>
      )
    })
  }
  return (
    <>
      <div className={styles.icons}>{renderIcons()}</div>
    </>
  )
}

// props校验
HouseConfig.propTypes = {
  // list的具体内容应该像这样['宽带', '沙发']
  list: PropTypes.array,
  select: PropTypes.bool,
  onChange: PropTypes.func,
}
HouseConfig.defaultProps = {
  list: [],
  onChange: () => {},
}

export default HouseConfig
