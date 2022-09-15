import React from 'react'
import FilterTitle from '../FilterTitle'

export default class Filter extends React.Component {
  state = {
    titleSelectedStatus: {
      area: false,
      way: false,
      money: false,
      select: false,
    },
  }

  // 点击标题高亮
  onTitleClick = (type) => {
    console.log(type)
    // this.setState((prevState) => {
    //   return {
    //     titleSelectedStatus: {
    //       ...prevState.titleSelectedStatus,
    //       [type]: true,
    //     },
    //   }
    // })
  }

  render() {
    const { titleSelectedStatus } = this.state
    return (
      <>
        <FilterTitle titleSelectedStatus={titleSelectedStatus} onClick={this.onTitleClick} />
      </>
    )
  }
}
