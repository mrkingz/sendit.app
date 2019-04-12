import React from "react";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import PhoneField from "./PhoneField";

const ReceiverDetails = ({ fields, fieldRefs, onChangeHandler, errors }) => {
  return (
    <div className="control-group panel-group">
      <span>{"Receiver's details"}</span>
      <div className="panel">
        <div className="details size-12">{"Fill in receiver's details"}</div>
        <TextInput
          name="receiverName"
          placeholder="Receiver's full name"
          onChangeHandler={onChangeHandler}
          forwardRef={receiverName => (fieldRefs.receiverName = receiverName)}
          value={fields.receiverName}
          error={errors.receiverName}
          styles="col-12"
        />
        <PhoneField
          name="receiverPhone"
          label="Receicver's phone"
          placeholder="Receicver's phone"
          value={fields.receiverPhone}
          error={errors.receiverPhone}
          onChangeHandler={onChangeHandler}
          forwardRef={receiverPhone =>
            (fieldRefs.receiverPhone = receiverPhone)
          }
        />
      </div>
    </div>
  );
};

ReceiverDetails.propTypes = {
  fields: PropTypes.object.isRequired,
  fieldRefs: PropTypes.object.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default ReceiverDetails;
