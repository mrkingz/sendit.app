import React from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

const Button = ({ wrapperStyle, btnStyle, onClick, isDisabled, text }) => {
  return (
    <div
      className={classnames("control-group", {
        [wrapperStyle]: !!wrapperStyle
      })}
    >
      <button
        className={classnames("btn", {
          [btnStyle]: !!btnStyle
        })}
        disabled={isDisabled}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  wrapperStyle: PropTypes.string,
  btnStyle: PropTypes.string
};

export default Button;
