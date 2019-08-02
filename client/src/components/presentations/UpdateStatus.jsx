import React, { Component } from "react";
import Form from "../containers/Form";
import SelectField from "../presentations/SelectField";
import validator from "../../js/utils/validations/validator";
import request from "../../js/utils/request";
import { connect } from "react-redux";
import messageAction from "../../js/actions/messageAction";
import actionTypes from "../../js/actions/actionTypes";

class UpdateStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryStatus: "",
      error: {}
    };
    this.fieldref = React.createRef();
  }

  componentDidMount() {
    this.fieldRef.focus();
  }

  submitHandler = async () => {
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
        this.props.renderUpdate(response.data.parcel, response.data.message);
      }
    } catch (error) {
      this.props.messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          styles: "alert-danger",
          message: error
        }
      });
    }
  };

  onChangeHandler = event => {
    event.preventDefault();
    const { name, value } = event.target;
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
