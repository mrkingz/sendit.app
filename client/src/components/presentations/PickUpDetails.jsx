import React from "react";
import PropTypes from "prop-types";
import TextInput from "@presentations/TextInput";
import SelectField from "@presentations/SelectField";

const PickUpDetails = ({
  fields,
  states,
  lgas,
  fieldRefs,
  onChangeHandler,
  errors
}) => {
  return (
    <div className="control-group panel-group">
      <span>Pick up location</span>
      <div className="panel">
        <div className="details size-12">
          Fill in where you want us to pick up your parcel and date
        </div>
        <TextInput
          name="pickUpAddress"
          placeholder="Pick up address"
          onChangeHandler={onChangeHandler}
          forwardRef={pickUpAddress =>
            (fieldRefs.pickUpAddress = pickUpAddress)
          }
          value={fields.pickUpAddress}
          error={errors.pickUpAddress}
          styles="col-12"
        />
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <SelectField
              id="pick-up-state"
              name="pickUpStateId"
              placeholder="State"
              value={fields.pickUpStateId}
              onChangeHandler={onChangeHandler}
              forwardRef={pickUpStateId =>
                (fieldRefs.pickUpStateId = pickUpStateId)
              }
              getFieldsName={() => "state"}
              getObjectKey={() => "stateId"}
              options={states}
              error={errors.pickUpStateId}
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <SelectField
              id="pick-up-lga"
              name="pickUpLGAId"
              placeholder="L.G. Area"
              value={fields.pickUpLGAId}
              onChangeHandler={onChangeHandler}
              forwardRef={pickUpLGAId => (fieldRefs.pickUpLGAId = pickUpLGAId)}
              getFieldsName={() => "lga"}
              getObjectKey={() => "lgaId"}
              options={lgas}
              error={errors.pickUpLGAId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

PickUpDetails.propTypes = {
  lgas: PropTypes.array.isRequired,
  states: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired,
  fieldRefs: PropTypes.object.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
export default PickUpDetails;
