/* eslint-disable react/no-did-mount-set-state */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import Form from "../containers/Form";
import TextInput from "./TextInput";
import PhoneField from "./PhoneField";
import request from "../../js/utils/request";
import BaseComponent from "../globals/BaseComponent";
import messageAction from "../../js/actions/messageAction";
import validator from "../../js/utils/validations/validator";
import PropTypes from "prop-types";
import modalAction from "../../js/actions/modalAction";
import actionTypes from "../../js/actions/actionTypes";

class UpdatePhoneNumber extends BaseComponent {
  constructor(props) {
    super(props);
    this.fields = {
      countryCode: "+234",
      verificationCode: "",
      phoneNumber: this.props.user.phoneNumber
        ? this.props.user.phoneNumber.substr(-10)
        : ""
    };
    this.state = {
      step: 1,
      fields: this.fields,
      codeDetails: {
        code: "",
        time: ""
      },
      prompt: "Enter the code sent to",
      errors: {}
    };
    this.fieldRefs = this.createInputRefs(Object.keys(this.state.fields));
  }

  submitHandler = async () => {
    let validation;
    const { countryCode, phoneNumber } = this.state.fields;
    if (this.state.step === 1) {
      validation = await validator("phoneNumber", { countryCode, phoneNumber });
      if (validation.hasError) {
        this.setState({
          ...this.state,
          errors: validation.errors
        });
      } else {
        this.sendVerificationCode();
      }
    } else if (this.validateCode()) {
      this.updatePhoneNumber(phoneNumber);
    }
  };

  /**
   * @description Updates phone number
   *
   * @param {String} phoneNumber
   * @memberof UpdatePhoneNumber
   */
  updatePhoneNumber = async phoneNumber => {
    try {
      const { data } = await request.update("/auth/phoneNumber", {
        phoneNumber: `${this.state.fields.countryCode}${phoneNumber.substr(
          -10
        )}`
      });
      this.props.renderUpdate(data.user, data.message);
    } catch (error) {
      this.showErrorMessage(
        "Something went wrong, could not update phone number"
      );
    }
  };

  /**
   * @description Validates verification code
   *
   * @returns {Booelan}
   */
  validateCode = () => {
    const min = new Date().getMinutes();
    const { code, time } = this.state.codeDetails;
    const { verificationCode } = this.state.fields;
    const error = {};

    if (this.state.fields.verificationCode.trim() === "") {
      error.verificationCode = "Please enter the code sent to your phone";
    } else if (code !== Number(verificationCode)) {
      error.verificationCode = "Invalid verification code";
    } else if (min > time) {
      error.verificationCode = "Code has expired. Resend below";
    }

    if (error.verificationCode) {
      this.setState({
        ...this.state,
        errors: error
      });
      return false;
    }
    return true;
  };

  /**
   * @description Generates a verifcatio code
   */
  generateCode = async () => {
    const code = Math.floor(Math.random() * 900000) + 99999;
    this.setState({
      ...this.state,
      prompt:
        this.state.step === 1 ? this.state.prompt : "A new code was sent to",
      codeDetails: {
        code: code,
        time: new Date().getMinutes() + 3
      }
    });
    console.log(this.state.codeDetails);
    return code;
  };

  /**
   * @description Resend a new veification Code
   *
   * @memberof UpdatePhoneNumber
   */
  resenCode = () => {
    this.sendVerificationCode();
  };

  /**
   *  @description Sends a verification code
   */
  sendVerificationCode = async () => {
    try {
      const { countryCode, phoneNumber } = this.state.fields;
      await request.post("/auth/sendCode", {
        code: await this.generateCode(),
        countryCode,
        phoneNumber
      });
      if (this.state.step === 1) {
        this.setState({
          ...this.state,
          step: 2
        });
        this.props.modalAction({ type: actionTypes.SET_STATIC_MODAL });
      }
    } catch (error) {
      this.showErrorMessage(error.response.data.message);
    }
  };

  displayNextStep = () => {
    const phone = this.state.fields.phoneNumber.split("");
    phone[5] = "*";
    phone[6] = "*";
    phone[7] = "*";
    const { errors, fields } = this.state;
    return (
      <Fragment>
        <div className="alert alert-info bounceIn animated">
          <div>
            {this.state.prompt} <b>{phone.join("")}</b>
          </div>
          <div className="bold">
            <b className="red-color">Note: </b>Code expires after 3mins
          </div>
        </div>
        <div className="mt-lg">
          <TextInput
            name="verificationCode"
            placeholder="Verification code"
            onChangeHandler={this.onChangeHandler}
            forwardRef={verificationCode =>
              (this.fieldRefs.verificationCode = verificationCode)
            }
            value={fields.verificationCode}
            required
            autofocus
            error={errors.verificationCode}
          />
        </div>
      </Fragment>
    );
  };

  render() {
    const { fields, errors } = this.state;
    return (
      <div className="panel">
        <Form
          formStyles="mb-0 pb-0"
          submitHandler={this.submitHandler}
          btnText={this.state.step === 1 ? "Continue" : "Confirm"}
        >
          {this.state.step === 1 ? (
            <PhoneField
              autofocus
              name="phoneNumber"
              label="Phone number"
              placeholder="Phone number"
              wrapperStyles={"col-12 mt-0 pt-0"}
              value={fields.phoneNumber}
              error={errors.phoneNumber}
              onChangeHandler={this.onChangeHandler}
              forwardRef={phoneNumber =>
                (this.fieldRefs.phoneNumber = phoneNumber)
              }
            />
          ) : (
            this.displayNextStep("")
          )}
        </Form>
        {this.state.step === 2 ? (
          <div className="resend-div">
            <span>
              Code not received?
              <button
                className="btn btn-link btn-sm fine-btn ml-md"
                onClick={this.resenCode}
              >
                Resend
              </button>
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

UpdatePhoneNumber.propTypes = {
  renderUpdate: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    modalAction,
    messageAction
  }
)(UpdatePhoneNumber);
