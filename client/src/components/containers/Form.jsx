/* eslint-disable react/sort-comp */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "../presentations/Button";
import AlertMessage from "../presentations/AlertMessage";
import messageAction from "../../js/actions/messageAction";

class Form extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  onSubmitHandler = async event => {
    event.preventDefault();
    this.setState({ isProcessing: true });
    await this.props.submitHandler();
    if (this._isMounted) {
      this.setState({ isProcessing: false });
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      title,
      formStyles,
      requiredStyles,
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
            wrapperStyle="mb-sm mt-sm mx-sm"
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
  formStyles: "",
  btnText: "Save",
  btnStyles: "btn-block",
  requiredStyles: "hide"
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

const mapStateToProps = ({ messageReducer, profileReducer }) => {
  return {
    isProcessing: messageReducer.isProcessing,
    message: messageReducer.message,
    isRunning: profileReducer.isProcessing
  };
};

export default connect(
  mapStateToProps,
  {
    messageAction
  }
)(Form);
