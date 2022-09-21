import React from 'react'
import { Spring, animated } from 'react-spring'

class Test extends React.Component {
  state = {
    toggle: true,
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        toggle: !this.state.toggle,
      })
    }, 3000)
  }
  render() {
    const { toggle } = this.state
    return (
      <div>
        {toggle ? (
          <Spring
            // loop
            from={{ opacity: 0, color: 'red', backgroundColor: 'white', width: '100px', height: '100px' }}
            to={[
              { opacity: 1, color: '#ffaaee', backgroundColor: 'pink', width: '300px', height: '300px' },
              // { opacity: 0, color: 'rgb(14,26,19)' },
            ]}
          >
            {(styles) => (
              <animated.div className="card" style={styles}>
                i will fade
              </animated.div>
            )}
          </Spring>
        ) : null}
      </div>
    )
  }
}

export default Test
