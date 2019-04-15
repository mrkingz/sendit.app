import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import CheckInput from "./CheckInput";

const ParcelDetails = ({ fields, fieldRefs, onChangeHandler, errors }) => {
  return (
    <div className="control-group panel-group">
      <span>Parcel details</span>
      <div className="panel">
        <TextInput
          name="weight"
          placeholder="Parcel weight"
          onChangeHandler={onChangeHandler}
          forwardRef={weight => (fieldRefs.weight = weight)}
          autofocus
          value={fields.weight}
          error={errors.weight}
          styles="col-lg-5 col-md-12 col-sm-12"
        />
        <TextInput
          name="description"
          placeholder="Parcel description"
          onChangeHandler={onChangeHandler}
          forwardRef={description => (fieldRefs.description = description)}
          required={false}
          value={fields.description}
          error={errors.description}
          styles="col-12"
        />
      </div>
      <br />
      <div className="control-group panel-group">
        <span>Choose your delivery method</span>
        <div className="panel">
          <CheckInput
            id="normal"
            value="Normal"
            forwardRef={deliveryMethod =>
              (fieldRefs.deliveryMethod = deliveryMethod)
            }
            name="deliveryMethod"
            type="radio"
            placeholder="Normal delivery"
            onChangeHandler={onChangeHandler}
            checked={fields.deliveryMethod === "Normal"}
          />
          <CheckInput
            id="fast"
            value="Fast"
            forwardRef={deliveryMethod =>
              (fieldRefs.deliveryMethod = deliveryMethod)
            }
            name="deliveryMethod"
            type="radio"
            placeholder="Fast delivery"
            onChangeHandler={onChangeHandler}
            checked={fields.deliveryMethod === "Fast"}
          />
        </div>
      </div>
    </div>
  );
};

ParcelDetails.propTypes = {
  fields: PropTypes.object.isRequired,
  fieldRefs: PropTypes.object.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
export default ParcelDetails;
