import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import Form from "../containers/Form";
import request from "../../js/utils/request";
import BaseComponent from "../globals/BaseComponent";
import modalAction from "../../js/actions/modalAction";
import actionTypes from "../../js/actions/actionTypes";
import messageAction from "../../js/actions/messageAction";
import validator from "../../js/utils/validations/validator";

class ChangePassword extends BaseComponent {
  constructor(props) {
    super(props);
    this.fields = {
      password: "",
      confirmPassword: ""
    };
    this.state = {
      step: 1,
      fields: this.fields,
      errors: {}
    };
    this.fieldRefs = this.createInputRefs(Object.keys(this.fields));
  }

  /**
   * @description Compares passwords
   *
   * @return {Boolean} true if the password matches; otherwise, false
   * @memberof ChangePassword
   */
  comparePasswords = () => {
    const { password, confirmPassword } = this.state.fields;
    if (password !== confirmPassword) {
      this.setState({
        ...this.state,
        fields: {
          ...this.state.fields,
          confirmPassword: ""
        },
        errors: {
          confirmPassword: confirmPassword
            ? "Password doesn't match"
            : "Please, confirm new password"
        }
      });
      return false;
    }
    return true;
  };

  /**
   * @description Shows an error messages
   *
   * @param {String} message the error message to render
   * @memberof ChangePassword
   */
  showErrorMessage = message => {
    this.props.messageAction({
      type: actionTypes.SHOW_MESSAGE,
      payload: {
        styles: "alert-danger",
        message
      }
    });
  };

  /**
   * @description Handles the submit request
   *
   * @memberof ChangePassword
   */
  submitHandler = async () => {
    let validation;
    const { password } = this.state.fields;
    if (this.state.step === 1) {
      validation = await this.validatePassword("password", password);

      if (!validation.hasError && (await this.verifyCurrentPassword())) {
        this.setState({
          ...this.state,
          fields: this.fields,
          step: 2
        });
      }
    } else {
      try {
        validation = await this.validatePassword("password", password);
        if (!validation.hasError && this.comparePasswords()) {
          const { data } = await request.update("/auth/changePassword", {
            password
          });
          this.props.modalAction({
            type: actionTypes.IS_SUCCESSFULL,
            payload: { message: data.message }
          });
        }
      } catch (error) {
        this.showErrorMessage(
          "Something went wrong, could not update password"
        );
      }
    }
  };

  /**
   * @description Validates password
   *
   * @param {String} fieldName the name of the password field
   * @param {String} fieldValue the password entered by the user
   * @returns {Object} the validation response
   * @memberof ChangePassword
   */
  validatePassword = async (fieldName, fieldValue) => {
    const validation = await validator("password", { [fieldName]: fieldValue });
    if (validation.hasError) {
      this.setState({
        ...this.state,
        errors: validation.errors
      });
      this.fieldRefs[fieldName].focus();
    }
    return validation;
  };

  /**
   * @description Verifies the current password
   *
   * @returns {Boolean}
   * @memberof ChangePassword
   */
  verifyCurrentPassword = async () => {
    try {
      const { data } = await request.post("/auth/verifyPassword", {
        password: this.state.fields.password
      });
      return data.status === "Success";
    } catch (error) {
      if (error.response.status === 406) {
        this.setState({
          ...this.state,
          errors: { password: "Sorry, incorrect password" }
        });
      } else {
        this.showErrorMessage(
          "Something went wrong, could not verify password"
        );
      }
      return false;
    }
  };

  render() {
    const { fields, step, errors } = this.state;
    return (
      <div className="panel">
        <Form
          btnText={step === 1 ? "Continue" : "Save"}
          btnStyles="btn-block"
          submitHandler={this.submitHandler}
        >
          <TextInput
            type="password"
            name="password"
            placeholder={step === 1 ? "Current password" : "New password"}
            onChangeHandler={this.onChangeHandler}
            forwardRef={password => (this.fieldRefs.password = password)}
            value={fields.password}
            required
            error={errors.password}
          />
          {step === 1 ? (
            ""
          ) : (
            <TextInput
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              onChangeHandler={this.onChangeHandler}
              forwardRef={password =>
                (this.fieldRefs.confirmPassword = password)
              }
              value={fields.confirmPassword}
              required
              error={errors.confirmPassword}
            />
          )}
        </Form>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  user: PropTypes.object
};

export default connect(
  null,
  {
    modalAction,
    messageAction
  }
)(ChangePassword);
