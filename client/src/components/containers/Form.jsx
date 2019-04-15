/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../presentations/Button";
import AlertMessage from "../presentations/AlertMessage";
import messageAction from "../../js/actions/messageAction";

class Form extends Component {
  state = {
    isProcessing: false
  };
  onSubmitHandler = async event => {
    event.preventDefault();
    this.setState({
      isProcessing: true
    });
    await this.props.submitHandler();
    this.setState({
      isProcessing: false
    });
  };

  render() {
    const {
      title,
      formStyles,
      requiredStyles,
      submitHandler,
      btnStyles,
      btnText
    } = this.props;
    return (
      <form className={`form mx-0 ${formStyles}`}>
        <div className="form-title">{title}</div>
        {this.props.children}
        <AlertMessage />
        <div className="">
          <p className={`required-text ${requiredStyles}`}>
            All fields marked with
            <strong className="required" />
            are required!
          </p>
          <Button
            wrapperStyle="mb-sm mt-lg"
            btnStyle={`btn btn-primary ${btnStyles}`}
            text={this.state.isProcessing ? "Processing..." : btnText}
            isDisabled={this.state.isProcessing}
            onClick={this.onSubmitHandler}
          />
        </div>
      </form>
    );
  }
}

Form.defaultProps = {
  formStyles: ""
};

Form.propTypes = {
  title: PropTypes.string,
  btnText: PropTypes.string,
  btnStyles: PropTypes.string,
  formStyles: PropTypes.string,
  children: PropTypes.any,
  requiredStyles: PropTypes.string,
  submitHandler: PropTypes.func.isRequired
};

const mapStateToProps = ({ messageReducer }) => {
  return {
    isProcessing: messageReducer.isProcessing,
    message: messageReducer.message
  };
};

export default connect(
  mapStateToProps,
  {
    messageAction
  }
)(Form);
