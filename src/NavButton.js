import React from "react";

import "./App.css";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

const NavButton = props => {
  const { path, text, history } = props;
  return (
    <div className="open-search">
      <button onClick={() => history.push(path)}>{text}</button>
    </div>
  );
};

NavButton.propTypes = {
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default withRouter(NavButton);
