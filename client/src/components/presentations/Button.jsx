/* eslint-disable react/forbid-prop-types */
import React from "react";
import classnames from "classnames";
import { PropTypes } from "prop-types";

const Button = ({
  wrapperStyle,
  btnStyle,
  onClick,
  isDisabled,
  text,
  children
}) => {
  return (
    <div
      className={classnames({
        [wrapperStyle]: !!wrapperStyle
      })}
    >
      <button
        className={`btn ${btnStyle}`}
        disabled={isDisabled}
        onClick={onClick}
      >
        {children} {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  wrapperStyle: PropTypes.string,
  btnStyle: PropTypes.string
};

export default Button;
