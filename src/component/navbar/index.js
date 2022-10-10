import { NavBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import styles from './index.module.css'

const MyNavBar = (props) => {
  const back = () => {
    window.history.back()
  }
  const { fixed } = props
  return (
    <>
      <NavBar onBack={back} className={fixed ? styles.fixed : ''} right={props.right}>
        {props.children}{' '}
      </NavBar>
      {fixed ? <div className={styles.empty}></div> : null}
    </>
  )
}

// props校验
MyNavBar.propTypes = {
  children: PropTypes.string.isRequired,
}

export default MyNavBar
