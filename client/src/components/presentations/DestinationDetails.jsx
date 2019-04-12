import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import SelectField from "./SelectField";

const DestinationDetails = props => {
  const { fields, states, lgas, fieldRefs, onChangeHandler, errors } = props;
  return (
    <div className="control-group panel-group">
      <span>Parcel destination</span>
      <div className="panel">
        <div className="details size-12">
          Fill in where you want us to pick up your parcel and date
        </div>
        <TextInput
          name="destinationAddress"
          placeholder="Destination address"
          onChangeHandler={onChangeHandler}
          forwardRef={destinationAddress =>
            (fieldRefs.destinationAddress = destinationAddress)
          }
          value={fields.destinationAddress}
          error={errors.destinationAddress}
          styles="col-12"
        />
        <div className="row">
          <div
            className={`${
              props.inline ? "col-lg-6 col-md-6 col-sm-12" : "col-12"
            }`}
          >
            <SelectField
              id="destination-state"
              name="destinationStateId"
              placeholder="State"
              value={fields.destinationStateId}
              onChangeHandler={onChangeHandler}
              forwardRef={destinationStateId =>
                (fieldRefs.destinationStateId = destinationStateId)
              }
              getFieldsName={() => "state"}
              getObjectKey={() => "stateId"}
              options={states}
              error={errors.destinationStateId}
            />
          </div>
          <div
            className={`${
              props.inline ? "col-lg-6 col-md-6 col-sm-12" : "col-12"
            }`}
          >
            <SelectField
              id="desination-lga"
              name="destinationLGAId"
              placeholder="L.G. Area"
              value={fields.destinationLGAId}
              onChangeHandler={onChangeHandler}
              forwardRef={destinationLGAId =>
                (fieldRefs.destinationLGAId = destinationLGAId)
              }
              getFieldsName={() => "lga"}
              getObjectKey={() => "lgaId"}
              options={lgas}
              error={errors.destinationLGAId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

DestinationDetails.defaultProps = {
  inline: true
};

DestinationDetails.propTypes = {
  lgas: PropTypes.array.isRequired,
  states: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired,
  fieldRefs: PropTypes.object.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  inline: PropTypes.bool
};
export default DestinationDetails;
