import { Spring, animated } from 'react-spring'

export default class Test extends PureComponent {
  handleAsyncTo = async (next, cancel) => {
    await next({ opacity: 1, color: '#ffaaee' })
    await next({ opacity: 0, color: 'rgb(14,26,19)' })
  }

  render() {
    // ...
    return (
      <Spring to={handleAsyncTo} from={{ opacity: 0, color: 'red' }}>
        {(styles) => <animated.div style={styles}>I will fade in and out</animated.div>}
      </Spring>
    )
  }
}
