import React, { Component } from "react";
import Form from "@containers/Form";
import SelectField from "@presentations/SelectField";
import validator from "@validations/validator";
import request from "@request";
import { connect } from "react-redux";
import messageAction from "@actions/messageAction";
import actionTypes from "@actions/actionTypes";

class UpdateStatus extends Component {
  state = {
    deliveryStatus: "",
    error: {}
  };
  fieldref = React.createRef();

  componentDidMount() {
    this.fieldRef.focus();
  }

  submitHandler = async e => {
    e.preventDefault();
    try {
      const validation = await validator("status", {
        deliveryStatus: this.state.deliveryStatus
      });
      if (validation.hasError) {
        this.setState({
          ...this.state,
          error: validation.errors
        });
        this.fieldRef.focus();
      } else {
        const response = await request.update(
          `/parcels/${this.props.parcelId}/status`,
          {
            deliveryStatus: this.state.deliveryStatus
          }
        );
        this.props.messageAction({
          type: actionTypes.SHOW_MESSAGE,
          payload: {
            styles: "alert-success",
            message: response.data.message
          }
        });
        this.setState({
          deliveryStatus: ""
        });
      }
    } catch (error) {
      this.props.messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          styles: "alert-danger",
          message: error.response.data.message
        }
      });
    }
  };

  onChangeHandler = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: {}
    });
  };

  render() {
    return (
      <div className="panel">
        <Form
          btnText="Save"
          btnStyles="btn-block"
          requiredStyles="hide"
          submitHandler={this.submitHandler}
        >
          <SelectField
            id="delivery-status"
            name="deliveryStatus"
            placeholder="Delivery status"
            options={[
              { deliveryStatus: "Delivered" },
              { deliveryStatus: "Transiting" }
            ]}
            value={this.state.deliveryStatus}
            getFieldsName={() => "deliveryStatus"}
            getObjectKey={() => "deliveryStatus"}
            error={this.state.error.deliveryStatus}
            forwardRef={fieldRef => (this.fieldRef = fieldRef)}
            onChangeHandler={this.onChangeHandler}
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
)(UpdateStatus);
