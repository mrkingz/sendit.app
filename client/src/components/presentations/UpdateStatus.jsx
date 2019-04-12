import React, { Component } from "react";
import Form from "@containers/Form";
import SelectField from "@presentations/SelectField";
import validator from "@validations/validator";

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
    const validation = await validator("status", {
      deliveryStatus: this.state.deliveryStatus
    });
    if (validation.hasError) {
      this.setState({
        ...this.state,
        error: validation.errors
      });
      this.fieldRef.focus();
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
export default UpdateStatus;
