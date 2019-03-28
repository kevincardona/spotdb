import React from "react";

import "../layouts/Button.css";

const Button = props => {
  return (
    <div onClick={props.action} className="button">
      <span className="button-text">{props.children}</span>
    </div>
  );
};

export default Button;
