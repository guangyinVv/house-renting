import styles from './index.module.css'
import { RightOutline } from 'antd-mobile-icons'
import { Input } from 'antd-mobile'
import { useState } from 'react'
import PropTypes from 'prop-types'
const WithRightArrow = (props) => {
  const { title, rightArrow, rightText, input, onRightClick, onClick, placeholder } = props
  const [value, setValue] = useState('')
  return (
    <div className={`${styles.comWithRightArrow} ${styles.clearFix}`} onClick={onClick}>
      <div className={styles.title}>{title}</div>
      <div className={styles.input}>
        {input === undefined ? null : (
          <Input
            placeholder={placeholder}
            value={value}
            onChange={(val) => {
              setValue(val)
              input(val)
            }}
          />
        )}
      </div>
      <div className={`${styles.rightPart} ${styles.clearFix}`} onClick={onRightClick}>
        {rightText === undefined ? null : <div className={styles.text}>{rightText}</div>}
        {rightArrow ? <RightOutline /> : null}
      </div>
    </div>
  )
}

// props校验
WithRightArrow.propTypes = {
  title: PropTypes.string.isRequired,
  input: PropTypes.func,
  rightArrow: PropTypes.bool,
  rightText: PropTypes.string,
  onClick: PropTypes.func,
  onRightClick: PropTypes.func,
  placeholder: PropTypes.string,
}
WithRightArrow.defaultProps = {
  rightArrow: false,
  onClick: () => {},
  onRightClick: () => {},
  placeholder: '',
}

export default WithRightArrow
