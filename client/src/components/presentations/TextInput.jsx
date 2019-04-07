import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextInput = ({
  type,
  placeholder,
  error,
  forwardRef,
  styles,
  name,
  autofocus,
  required,
  value,
  label,
  autoComplete,
  onChangeHandler,
  errorStyles
}) => {
  return (
    <div className="control-group">
      <label htmlFor="email" className={required ? "required" : ""}>
        {typeof label !== "undefined" ? label : placeholder}
      </label>
      <input
        type={type}
        ref={forwardRef}
        className={classnames(`control ${styles}`, { invalid: error })}
        name={name}
        value={value}
        placeholder={placeholder}
        autoFocus={autofocus}
        autoComplete={autoComplete}
        onChange={onChangeHandler}
      />
      {error && <div className={`error ${errorStyles}`}> {error} </div>}
    </div>
  );
};

TextInput.defaultProps = {
  type: "text",
  styles: "",
  required: true,
  autoComplete: "off",
  errorStyles: ""
};

TextInput.propTypes = {
  label: PropTypes.string,
  styles: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  autofocus: PropTypes.bool,
  autoComplete: PropTypes.string,
  name: PropTypes.string.isRequired,
  forwardRef: PropTypes.func,
  onChangeHandler: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default TextInput;
