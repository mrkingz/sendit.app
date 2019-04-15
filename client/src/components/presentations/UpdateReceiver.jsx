import React from "react";
import { connect } from "react-redux";
import omit from "lodash/omit";
import request from "../../js/utils/request";
import Form from "../containers/Form";
import Places from "../globals/Places";
import TextInput from "./TextInput";
import actionTypes from "../../js/actions/actionTypes";
import messageAction from "../../js/actions/messageAction";
import modalAction from "../../js/actions/modalAction";
import PhoneField from "./PhoneField";
import validator from "../../js/utils/validations/validator";

class UpdateReceiver extends Places {
  constructor(props) {
    super(props);
    this.fields = {
      countryCode: "+234",
      receiverName: this.props.receiverName,
      receiverPhone: this.props.receiverPhone
        ? this.props.receiverPhone.substr(-10)
        : ""
    };
    this.state = {
      fields: this.fields,
      errors: {}
    };
    this.fieldRefs = this.createInputRefs(Object.keys(this.fields));
  }

  /**
   * @description Handle an input on change event
   *
   * @param {object} event browser event
   */
  onChangeHandler = async event => {
    const { value, name } = event.target;
    this.clearLGAsOnStateSelection(name);
    this.setState({
      ...this.state,
      errors: omit(this.state.errors, name),
      fields: {
        ...this.state.fields,
        [name]: value
      }
    });
  };

  updateReceiver = async () => {
    try {
      const validation = await validator("receiver", this.state.fields);
      console.log(this.state.fields);
      if (validation.hasError) {
        this.setState({
          ...this.state,
          errors: validation.errors
        });
        this.fieldRefs[Object.keys(validation.errors)[0]].focus();
      } else {
        const {
          data: { parcel, message }
        } = await request.update(
          `/parcels/${this.props.parcelId}/editReceiver`,
          this.state.fields
        );
        this.props.renderUpdate(parcel, message);
      }
    } catch (error) {
      this.props.messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          styles: "alert-danger",
          message: "Something went wrong, could not update receiver's details"
        }
      });
    }
  };

  render() {
    const { fields, errors } = this.state;
    return (
      <div className="panel">
        <Form
          btnText="Save"
          btnStyles="btn-block"
          requiredStyles="hide"
          submitHandler={this.updateReceiver}
        >
          <TextInput
            name="receiverName"
            placeholder="Receiver's full name"
            onChangeHandler={this.onChangeHandler}
            forwardRef={receiverName =>
              (this.fieldRefs.receiverName = receiverName)
            }
            value={fields.receiverName}
            error={errors.receiverName}
            styles="col-12"
          />
          <PhoneField
            name="receiverPhone"
            label="Receicver's phone"
            placeholder="Receicver's phone"
            wrapperStyles="col-12"
            value={fields.receiverPhone}
            error={errors.receiverPhone}
            onChangeHandler={this.onChangeHandler}
            forwardRef={receiverPhone =>
              (this.fieldRefs.receiverPhone = receiverPhone)
            }
          />
        </Form>
      </div>
    );
  }
}
export default connect(
  null,
  {
    messageAction
  }
)(UpdateReceiver);
