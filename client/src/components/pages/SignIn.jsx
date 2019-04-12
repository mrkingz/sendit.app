import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import AuthWrapper from "../containers/AuthWrapper";
import TextInput from "../presentations/TextInput";
import CheckInput from "../presentations/CheckInput";
import Button from "../presentations/Button";
import AlertMessage from "../presentations/AlertMessage";
import messageAction from "../../js/actions/messageAction";
import signInAction from "../../js/actions/signInAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import actionTypes from "../../js/actions/actionTypes";
import AuthRedirect from "../presentations/AuthRedirect";

class SignIn extends Component {
  onSubmitHandler = async e => {
    e.preventDefault();
    this.props.messageAction({
      type: actionTypes.REQUEST_PROCESSING
    });
    const validation = await this.props.validateFields("signin");
    if (!validation.hasError) {
      const { email, password } = this.props.state.fields;
      const response = await this.props.signInAction(
        { email, password },
        this.props.history
      );
      if (!response) {
        this.props.clearFields();
      }
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
          type="email"
          name="email"
          placeholder="E-mail address"
          onChangeHandler={onChangeHandler}
          forwardRef={email => (fieldRefs.email = email)}
          value={fields.email}
          required
          autoComplete="on"
          error={errors.email}
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
        />
        <div className="control-group">
          <CheckInput
            value={"0"}
            type="checkbox"
            id="remember-me"
            placeholder="Remember me"
          />
        </div>
        <AlertMessage />
        <div className="control-group align-center mt-sm">
          <Button
            wrapperStyle="mb-sm"
            btnStyle="btn-primary btn-lg btn-block"
            text={isProcessing ? "Processing..." : "Sign in"}
            isDisabled={isProcessing}
            onClick={this.onSubmitHandler}
          />
        </div>
        <AuthRedirect
          text="Forgot password?"
          path="/password"
          linkStyles="forgot-password bold size-14"
        />
      </Fragment>
    );
  }
}

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  clearFields: PropTypes.func.isRequired,
  messageAction: PropTypes.func.isRequired,
  signInAction: PropTypes.func.isRequired,
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
    signInAction
  }
)(
  AuthWrapper(withRouter(SignIn), {
    text: "Sign up",
    title: "Sign in",
    authRedirect: "/signup",
    prompt: "Don't have an account?",
    hint: "Please sign in to continue enjoying our services"
  })
);
