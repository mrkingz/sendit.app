import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AuthWrapper from "../containers/AuthWrapper";
import TextInput from "../presentations/TextInput";
import Button from "../presentations/Button";
import AlertMessage from "../presentations/AlertMessage";
import Required from "../presentations/Required";
import messageAction from "../../js/actions/messageAction";
import signUpAction from "../../js/actions/signUpAction";
import request from "../../js/utils/request";
import actionTypes from "../../js/actions/actionTypes";
class SignUp extends Component {
  /**
   * @description handle submit action
   *
   * @param {object} e browser event object
   */
  onSubmitHandler = async e => {
    e.preventDefault();
    this.props.messageAction({
      type: actionTypes.REQUEST_PROCESSING
    });
    const validation = await this.props.validateFields(
      "signup",
      this.checkIfEmailExist
    );
    if (!validation.hasError) {
      const response = this.props.signUpAction(
        this.props.state.fields,
        this.props.history
      );
      /**
       * If account was successfully created, clear the state
       */
      if (response) {
        this.props.clearFields();
        this.props.fieldRefs["firstname"].focus();
      }
    }
  };

  /**
   * @description check if an email has been used
   *
   * @returns {object} an object conatining the error details
   */
  checkIfEmailExist = async () => {
    const { email } = this.props.state.fields;
    try {
      const res = await request.post("/auth/email", { email });
      return {
        hasError: res.status === 200,
        errors: { email: "Email address has been used" }
      };
    } catch (error) {
      return { hasError: false };
    }
  };

  render() {
    const {
      state: { fields, errors },
      onChangeHandler,
      fieldRefs,
      isProcessing
    } = this.props;
    return (
      <Fragment>
        <TextInput
          name="firstname"
          placeholder="First name"
          onChangeHandler={onChangeHandler}
          forwardRef={firstname => (fieldRefs.firstname = firstname)}
          required
          autofocus
          value={fields.firstname}
          error={errors.firstname}
          errorStyles="error-shadow"
        />
        <TextInput
          name="lastname"
          placeholder="Last name"
          onChangeHandler={onChangeHandler}
          forwardRef={lastname => (fieldRefs.lastname = lastname)}
          required
          value={fields.lastname}
          error={errors.lastname}
          errorStyles="error-shadow"
        />
        <TextInput
          name="email"
          placeholder="E-mail address"
          onChangeHandler={onChangeHandler}
          forwardRef={email => (fieldRefs.email = email)}
          value={fields.email}
          required
          error={errors.email}
          errorStyles="error-shadow"
        />
        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          onChangeHandler={onChangeHandler}
          forwardRef={password => (fieldRefs.password = password)}
          value={fields.password}
          required
          error={errors.password}
          errorStyles="error-shadow"
        />
        <AlertMessage />
        <div className="control-group align-center">
          <Required />
          <Button
            wrapperStyle="mb-sm"
            btnStyle="btn-primary btn-lg btn-block"
            text={isProcessing ? "Processing..." : "Sign up"}
            isDisabled={isProcessing}
            onClick={this.onSubmitHandler}
          />
        </div>
      </Fragment>
    );
  }
}

SignUp.propTypes = {
  clearFields: PropTypes.func.isRequired,
  messageAction: PropTypes.func.isRequired,
  signUpAction: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  fieldRefs: PropTypes.object.isRequired,
  isProcessing: PropTypes.bool.isRequired,
  validateFields: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired
};

const mapStateToProps = ({ messageReducer }) => {
  return {
    isProcessing: messageReducer.isProcessing
  };
};

export default connect(
  mapStateToProps,
  {
    messageAction,
    signUpAction
  }
)(
  AuthWrapper(withRouter(SignUp), {
    text: "Sign in",
    title: "Sign up",
    authRedirect: "/signin",
    prompt: "Already have an account?",
    hint: "Join our parcel delivery portal to enjoy our services"
  })
);
