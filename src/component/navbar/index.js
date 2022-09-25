import { NavBar } from "antd-mobile";
import PropTypes from "prop-types";

const MyNavBar = (props) => {
  const back = () => {
    window.history.back();
  };
  return (
    <NavBar onBack={back} right={props.right}>
      {props.children}
    </NavBar>
  );
};

// props校验
MyNavBar.propTypes = {
  children: PropTypes.string.isRequired,
};

export default MyNavBar;
