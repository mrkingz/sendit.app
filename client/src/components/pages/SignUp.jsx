import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AuthWrapper from "@containers/AuthWrapper";
import TextInput from "@presentations/TextInput";
import Button from "@presentations/Button";
import AlertMessage from "@presentations/AlertMessage";
import Required from "@presentations/Required";
import messageAction from "@actions/messageAction";
import signUpAction from "@actions/signUpAction";
import request from "@request";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actionTypes from "@actionTypes";

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
      const { errors, ...data } = this.props.state;
      const response = this.props.signUpAction(data);
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
    const { email } = this.props.state;
    try {
      await request.post("/auth/email", { email });
    } catch (error) {
      return {
        hasError: error.response.status === 302,
        error: { email: "Email address has been used" }
      };
    }
  };

  render() {
    const { state, onChangeHandler, fieldRefs, isProcessing } = this.props;
    return (
      <Fragment>
        <TextInput
          name="firstname"
          placeholder="First name"
          onChangeHandler={onChangeHandler}
          forwardRef={firstname => (fieldRefs.firstname = firstname)}
          required
          autofocus
          value={state.firstname}
          error={state.errors.firstname}
        />
        <TextInput
          name="lastname"
          placeholder="Last name"
          onChangeHandler={onChangeHandler}
          forwardRef={lastname => (fieldRefs.lastname = lastname)}
          required
          value={state.lastname}
          error={state.errors.lastname}
        />
        <TextInput
          type="email"
          name="email"
          placeholder="E-mail address"
          onChangeHandler={onChangeHandler}
          forwardRef={email => (fieldRefs.email = email)}
          value={state.email}
          required
          error={state.errors.email}
        />
        <TextInput
          type="password"
          name="password"
          placeholder="Password"
          onChangeHandler={onChangeHandler}
          forwardRef={password => (fieldRefs.password = password)}
          value={state.password}
          required
          error={state.errors.password}
        />
        <AlertMessage />
        <div className="control-group align-center">
          <Required />
          <Button
            wrapperStyle="mb-sm"
            btnStyle="btn-primary btn-lg"
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
    authRedirect: "/signin",
    prompt: "Already have an account?",
    hint: "Join our parcel delivery portal to enjoy our services"
  })
);
