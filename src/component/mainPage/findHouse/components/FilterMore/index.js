import React from 'react'
import styles from './index.module.css'
import { Button } from 'antd-mobile'

export default class FilterMore extends React.Component {
  state = {}
  render() {
    return (
      <>
        <div className={styles.more}>
          <div className={styles.title}>户型</div>
          <div className={styles.items}>
            <div className={`${styles.item} ${styles.active}`}>东北</div>
            <div className={styles.item}>东北</div>
            <div className={styles.item}>东北</div>
            <div className={styles.item}>东北</div>
            <div className={styles.item}>东北</div>
          </div>
          <div className={styles.title}>户型</div>
          <div className={styles.items}>
            <div className={styles.item}>东北</div>
          </div>
          <div className={styles.title}>户型</div>
          <div className={styles.items}>
            <div className={styles.item}>东北</div>
          </div>
          <div className={styles.title}>户型</div>
          <div className={styles.items}>
            <div className={styles.item}>东北</div>
          </div>
          <div className={styles.buttons}>
            <Button>取消</Button>
            <Button color="success">确定</Button>
          </div>
        </div>

        <div className={styles.mask}></div>
      </>
    )
  }
}
