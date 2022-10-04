import { ErrorBlock } from 'antd-mobile'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
// 已发布房源页面
const Rent = () => {
  return (
    <div className={styles.rent}>
      <ErrorBlock
        status="empty"
        title=""
        description={
          <span>
            您还没有房源,<Link to="/rent/add">去发布房源</Link>吧
          </span>
        }
      />
    </div>
  )
}
export default Rent
