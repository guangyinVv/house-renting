import { Spring, animated } from "react-spring";
import React from "react";

class Test extends React.Component {
  render() {
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        onRest={() => {
          console.log(1);
        }}
      >
        {(props) => {
          return <animated.div style={props}>123</animated.div>;
        }}
      </Spring>
    );
  }
}

// function Test() {
//   const props = useSpring({
//     // loop: true,
//     to: [{ opacity: 1 }, { opacity: 0 }],
//     from: { opacity: 0 },
//     reset: true,
//     delay: 200,
//     onRest: () => {
//       console.log(1);
//     },
//   });

//   return <animated.h1 style={props}>hello</animated.h1>;
// }

export default Test;
