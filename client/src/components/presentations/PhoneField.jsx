import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const PhoneField = ({
  name,
  placeholder,
  required,
  error,
  label,
  styles,
  value,
  forwardRef,
  autofocus,
  onChangeHandler
}) => {
  return (
    <div className="row">
      <div className="col-lg-7 col-md-8 col-sm-12">
        <div className="control-group">
          <label
            htmlFor="receiver-phone"
            className={required ? "required" : ""}
          >
            {label}
          </label>
          <div id="receiver-phone" className="input-group">
            <div className="input-group">
              <input
                className="group-member bold country-code"
                name="countryCode"
                id="country-code"
                value="+234"
                readOnly
                tabIndex={-1}
              />
              <input
                ref={forwardRef}
                className={classnames(`control group-member ${styles}`, {
                  invalid: error
                })}
                name={name}
                value={value}
                placeholder={placeholder}
                autoComplete="off"
                autoFocus={autofocus}
                onChange={onChangeHandler}
              />
            </div>
          </div>
          {error && <div className="error"> {error} </div>}
        </div>
      </div>
    </div>
  );
};

PhoneField.propTypes = {
  styles: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  autofocus: PropTypes.bool,
  name: PropTypes.string.isRequired,
  forwardRef: PropTypes.func,
  onChangeHandler: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
};

export default PhoneField;
