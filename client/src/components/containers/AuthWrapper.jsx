import { compose } from "redux";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import omit from "lodash/omit";
import React, { Component, Fragment } from "react";
import actionTypes from "../../js/actions/actionTypes";
import Template from "../containers/Template";
import validator from "../../js//utils/validations/validator";
import messageAction from "../../js/actions/messageAction";
import AuthRedirect from "../presentations/AuthRedirect";

const AuthWrapper = (AuthComponent, inComingPops) => {
  return class Wrapper extends Component {
    constructor(props) {
      super(props);
      this.fields = {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      };
      this.fieldRefs = this.createInputRefs(Object.keys(this.fields));
      this.state = {
        fields: this.fields,
        errors: {}
      };
    }

    /**
     * @description Reset the state to default values
     */
    clearFields = () => {
      this.setState({
        fields: { ...this.fields },
        error: {}
      });
    };

    /**
     * @description Create ref for inputs
     *
     * @param {array} fields array of fields
     * @returns {object} object containing the refs
     */
    createInputRefs = fields => {
      const fieldRefs = {};
      fields.forEach(field => {
        fieldRefs[field] = React.createRef();
      });
      return fieldRefs;
    };

    mapFieldsToPage = () => {
      const {
        location: { pathname }
      } = this.props;
      const {
        fields: { email, password }
      } = this.state;
      switch (pathname) {
        case "/signin":
          return { email, password };
        case "/password":
          return { email };
        default:
          return this.state.fields;
      }
    };

    /**
     * @description Validate inputs
     *
     * @param {string} type a string specifying the form to validate
     * @param {function} callback
     * @returns {object} an object containing the result of the validation
     */
    validateFields = async (type, callback) => {
      let validation = await validator(type, this.mapFieldsToPage());
      if (!validation.hasError && typeof callback === "function") {
        validation = await callback();
      }
      /**
       * If an input validation fails
       * Update errors in the state with the error detail
       * Set focus on the failed input
       * Finally, dispatch hide message action to hide server error message, if visible
       */
      if (validation.hasError) {
        this.setState({
          fields: {
            ...this.state.fields,
            ...validation.fields
          },
          errors: {
            ...this.state.errors,
            ...validation.errors
          }
        });
        this.fieldRefs[Object.keys(validation.errors)[0]].focus();
        this.props.messageAction({
          type: actionTypes.HIDE_MESSAGE
        });
      }
      return validation;
    };

    /**
     * @description Handle an input on change event
     *
     * @param {object} event browser event
     */
    onChangeHandler = event => {
      const { value, name } = event.target;
      this.setState({
        errors: omit(this.state.errors, name),
        fields: {
          ...this.state.fields,
          [name]: value
        }
      });
      this.props.messageAction({
        type: actionTypes.HIDE_MESSAGE
      });
    };

    render() {
      const { prompt, authRedirect, text, hint, title } = inComingPops;
      return (
        <Fragment>
          <Template isAuthPage>
            <div className="bg-image bg-image-auth">
              <div className="overlay-auth">
                <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-sm-12">
                  <div className="welcome welcome-auth">
                    <p>
                      Welcome to{" "}
                      <span>
                        SendIT<sup className="size-12">&trade;</sup>
                      </span>
                    </p>
                    <p className="size-12">{hint}</p>
                  </div>
                  <div className="form-wrapper">
                    <div className="transparent">
                      <form className="form auth-form">
                        <div className="form-title">{title}</div>
                        <div className="section">
                          <AuthComponent
                            {...this.props}
                            fieldRefs={this.fieldRefs}
                            onChangeHandler={this.onChangeHandler}
                            validateFields={this.validateFields}
                            state={this.state}
                            clearFields={this.clearFields}
                          />
                          <AuthRedirect
                            prompt={prompt}
                            text={text}
                            path={authRedirect}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Template>
        </Fragment>
      );
    }
  };
};

AuthWrapper.propTypes = {
  prompt: PropTypes.string,
  title: PropTypes.string,
  onSubmitHandler: PropTypes.func.isRequired,
  hint: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  authRedirect: PropTypes.string.isRequired,
  messageAction: PropTypes.func.isRequired,
  children: PropTypes.array
};
export default compose(
  connect(
    null,
    { messageAction }
  ),
  AuthWrapper
);
