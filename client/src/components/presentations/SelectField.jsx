import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectField = ({
  id,
  value,
  name,
  options,
  placeholder,
  forwardRef,
  required,
  autofocus,
  error,
  styles,
  getObjectKey,
  getFieldsName,
  onChangeHandler
}) => {
  return (
    <div className="control-group">
      <label htmlFor="pick-up-state" className={required ? "required" : ""}>
        {placeholder}
      </label>
      <select
        id={id}
        name={name}
        className={classnames(`control ${styles}`, { invalid: error })}
        onChange={onChangeHandler}
        ref={forwardRef}
        autoFocus={autofocus}
        value={value}
      >
        <option value="">Select {placeholder}</option>
        {options.map((option, index) => {
          return (
            <option key={index} value={option[getObjectKey()]}>
              {option[getFieldsName()]}
            </option>
          );
        })}
      </select>
      {error && <div className="error"> {error} </div>}
    </div>
  );
};

SelectField.defaultProps = {
  required: true
};

SelectField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  forwardRef: PropTypes.func,
  required: PropTypes.bool,
  autofocus: PropTypes.bool,
  styles: PropTypes.string,
  error: PropTypes.string,
  getFieldsName: PropTypes.func.isRequired,
  getObjectKey: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func,
  placeholder: PropTypes.string.isRequired
};
export default SelectField;
