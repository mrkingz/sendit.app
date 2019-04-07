import React from "react";
import PropTypes from "prop-types";

const CheckInput = ({
  value,
  type,
  id,
  name,
  placeholder,
  forwardRef,
  onChangeHandler,
  checked
}) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type={type}
        value={value}
        id={id}
        ref={forwardRef}
        onChange={onChangeHandler}
        defaultChecked={checked}
        name={name}
      />
      <label className="form-check-label" htmlFor={id}>
        {placeholder}
      </label>
    </div>
  );
};

CheckInput.defaultProps = {
  type: "checkbox",
  value: false
};

CheckInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  forwardRef: PropTypes.func,
  onChangeHandler: PropTypes.func,
  placeholder: PropTypes.string.isRequired
};

export default CheckInput;
