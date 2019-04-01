import React from "react";
import PropTypes from "prop-types";

const CheckInput = ({ value, type, id, placeholder }) => {
  return (
    <div className="control-group">
      <div className="form-check">
        <input className="form-check-input" type={type} value={value} id={id} />
        <label className="form-check-label text-shadow" htmlFor={id}>
          {placeholder}
        </label>
      </div>
    </div>
  );
};

CheckInput.defaultProps = {
  type: "checkbox"
};

CheckInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.bool,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired
};

export default CheckInput;
