import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextInput = ({
  type,
  placeholder,
  error,
  forwardRef,
  name,
  autofocus,
  required,
  value,
  onChangeHandler
}) => {
  return (
    <div className="control-group">
      <label htmlFor="email" className={required ? "required" : ""}>
        {placeholder}
      </label>
      <input
        type={type}
        ref={forwardRef}
        className={classnames("control col-12", { invalid: error })}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        autoFocus={autofocus}
        onChange={onChangeHandler}
      />
      {error && <div className="error"> {error} </div>}
    </div>
  );
};

TextInput.defaultProps = {
  type: "text"
};

TextInput.propTypes = {
  type: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  autofocus: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default TextInput;
