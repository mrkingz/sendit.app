import React from "react";
import { connect } from "react-redux";
import TextInput from "./TextInput";
import Form from "../containers/Form";
import request from "../../js/utils/request";
import BaseComponent from "../globals/BaseComponent";
import validator from "../../js/utils/validations/validator";
import messageAction from "../../js/actions/messageAction";

class UpdateName extends BaseComponent {
  constructor(props) {
    super(props);
    this.fields = {
      firstname: this.props.user.firstname,
      lastname: this.props.user.lastname
    };
    this.state = {
      fields: this.fields,
      errors: {}
    };
    this.fieldRefs = this.createInputRefs(Object.keys(this.fields));
  }

  submitHandler = async () => {
    try {
      const validation = await validator("name", this.state.fields);
      if (validation.hasError) {
        this.setState({
          ...this.state,
          errors: { ...this.stateerrors, ...validation.errors }
        });
      } else {
        const { data } = await request.update(
          "/auth/editName",
          this.state.fields
        );
        this.props.renderUpdate(data.user, data.message);
      }
    } catch (error) {
      this.showErrorMessage("Something went wrong, could not update name");
    }
  };

  render() {
    const { fields, errors } = this.state;
    return (
      <div className="panel">
        <Form submitHandler={this.submitHandler}>
          <TextInput
            name="firstname"
            placeholder="Firstname"
            onChangeHandler={this.onChangeHandler}
            forwardRef={firstname => (this.fieldRefs.firstname = firstname)}
            value={fields.firstname}
            required
            autofocus
            error={errors.firstname}
          />
          <TextInput
            name="lastname"
            placeholder="Lastname"
            onChangeHandler={this.onChangeHandler}
            forwardRef={lastname => (this.fieldRefs.lastname = lastname)}
            value={fields.lastname}
            required
            error={errors.lastname}
          />
        </Form>
      </div>
    );
  }
}
export default connect(
  null,
  { messageAction }
)(UpdateName);
