import React from "react";
import PropTypes from "prop-types";

const ButtonGroup = ({ wrapperStyles, buttonProps }) => {
  return (
    <div className={`btn-group ${wrapperStyles}`}>
      {buttonProps.map((prop, index) => {
        if (prop !== null) {
          return (
            <button
              key={index}
              className={`btn ${prop.btnStyles} btn-group-member`}
              onClick={prop.onClickHandler}
            >
              {prop.text}
            </button>
          );
        }
      })}
    </div>
  );
};

ButtonGroup.propTypes = {
  buttonProps: PropTypes.array.isRequired,
  text: PropTypes.string,
  wrapperStyles: PropTypes.string
};

export default ButtonGroup;
