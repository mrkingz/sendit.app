import React from "react";
import omit from "lodash/omit";
import PropTypes from "prop-types";

import Form from "../containers/Form";
import { connect } from "react-redux";
import Places from "../globals/Places";
import request from "../../js/utils/request";
import Button from "../presentations/Button";
import { withRouter } from "react-router-dom";
import PageContent from "../containers/PageContent";
import actionTypes from "../../js/actions/actionTypes";
import success from "../../../assets/images/success.png";
import AlertMessage from "../presentations/AlertMessage";
import messageAction from "../../js/actions/messageAction";
import ParcelPreview from "../presentations/ParcelPreview";
import ParcelDetails from "../presentations/ParcelDetails";
import PickUpDetails from "../presentations/PickUpDetails";
import validator from "../../js/utils/validations/validator";
import ReceiverDetails from "../presentations/ReceiverDetails";
import processingAction from "../../js/actions/processingAction";
import DestinationDetails from "../presentations/DestinationDetails";

class CreateParcel extends Places {
  constructor(props) {
    super(props);
    this.fields = {
      weight: "",
      description: "",
      deliveryMethod: "Normal",
      pickUpAddress: "",
      pickUpStateId: "",
      pickUpLGAId: "",
      destinationAddress: "",
      destinationStateId: "",
      destinationLGAId: "",
      receiverName: "",
      countryCode: "+234",
      receiverPhone: ""
    };
    this.state = {
      fields: this.fields,
      states: [],
      pickUpLGAs: [],
      destinationLGAs: [],
      page: "create",
      errors: {}
    };
    this.fieldRefs = this.createInputRefs(Object.keys(this.fields));
  }

  componentDidMount() {
    this.fetchStates();
  }

  /**
   * @description Handle an input on change event
   *
   * @param {object} event browser event
   */
  onChangeHandler = async event => {
    const { value, name } = event.target;
    const reloadLGAs =
      name === "pickUpStateId" || name === "destinationStateId";
    if (reloadLGAs) {
      this.clearLGAsOnStateSelection(name);
    }
    this.setState({
      ...this.state,
      ...(reloadLGAs ? await this.fetchLGAs(value, name) : []),
      errors: omit(this.state.errors, name),
      fields: {
        ...this.state.fields,
        [name]: value
      }
    });
  };

  /**
   * @description Return to dashboard
   */
  done = () => {
    this.props.history.push("/dashboard");
    this.props.messageAction({
      type: actionTypes.HIDE_MESSAGE
    });
  };

  /**
   * @description Toggles preview and create parcel page
   *
   * @memberof CreateParcel
   */
  previewHandler = async () => {
    if (this.state.page === "preview") {
      this.setState({
        ...this.state,
        page: "create"
      });
    } else {
      let validation = await validator("parcel", this.state.fields);
      /**
       * If an input validation fails
       * Update errors in the state with the error detail
       * Set focus on the failed input
       * Finally, dispatch hide message action to hide server error message, if visible
       */
      if (validation.hasError) {
        this.setState({
          errors: {
            ...this.state.errors,
            ...validation.errors
          }
        });
        this.fieldRefs[Object.keys(validation.errors)[0]].focus();
      } else {
        this.setState({
          ...this.state,
          page: "preview"
        });
      }
      return validation;
    }
  };

  /**
   * @description Saves the parcel delivery order
   *
   * @returns void
   */
  saveOrder = async () => {
    try {
      const response = await request.post("/parcels", this.state.fields);
      if (response.status === 201) {
        this.setState({
          ...this.state,
          fields: this.fields,
          pickUpLGAs: [],
          destinationLGAs: [],
          page: "submitted"
        });
        this.props.messageAction({
          type: actionTypes.SHOW_MESSAGE,
          payload: {
            message: `<div>
                        <div class="success">Successful!</div> 
                        <div id="trackingNo">${
                          response.data.parcel.trackingNo
                        }</div>
                      </div>`
          }
        });
      }
    } catch (error) {
      this.props.messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          styles: "alert-danger",
          message: "Something went wrong, could not save order details"
        }
      });
    }
  };

  /**
   * @description Gets the page title
   *
   * @param {String} page the current page option
   * @memberof CreateParcel
   */
  getPageTitle = page => {
    const titles = {
      create: "Create order",
      preview: "Confirm order details"
    };
    return titles[page] || "Create order";
  };

  getPage = page => {
    const {
      state: { fields, errors }
    } = this;
    switch (page) {
      case "preview":
        return (
          <ParcelPreview
            state={this.state}
            previewHandler={this.previewHandler}
            saveOrder={this.saveOrder}
          />
        );
      case "create":
        return (
          <Form btnText="Continue" submitHandler={this.previewHandler}>
            {this.state.isEditing ? (
              <div className="mb-lg align-right">
                <button
                  className="btn btn-link fine-btn normal size-13"
                  onClick={() => this.props.history.push("/parcels")}
                >
                  <i className="fa fa-angle-double-left" /> Go back
                </button>
              </div>
            ) : (
              ""
            )}
            <ParcelDetails
              onChangeHandler={this.onChangeHandler}
              fieldRefs={this.fieldRefs}
              fields={fields}
              state={this.state}
              errors={errors}
            />
            <PickUpDetails
              onChangeHandler={this.onChangeHandler}
              fieldRefs={this.fieldRefs}
              fields={fields}
              errors={errors}
              states={this.state.states}
              lgas={this.state.pickUpLGAs}
            />
            <DestinationDetails
              onChangeHandler={this.onChangeHandler}
              fieldRefs={this.fieldRefs}
              fields={fields}
              errors={errors}
              states={this.state.states}
              lgas={this.state.destinationLGAs}
            />
            <ReceiverDetails
              onChangeHandler={this.onChangeHandler}
              fieldRefs={this.fieldRefs}
              fields={fields}
              errors={errors}
            />
          </Form>
        );

      case "submitted":
        return (
          <div className="section bounceIn animate">
            <div className="panel my-lg">
              <div id="success" className="align-center">
                <div className="mb-lg">
                  <img
                    className="success-img bounceInDown animated"
                    src={success}
                    alt=""
                  />
                  <AlertMessage />
                </div>
                <div className="section">
                  <div id="info">
                    <div className="outter-div-wrapper">
                      <div className="inner-div-wrapper">
                        <div className="alert alert-info">
                          Your parcel delivery order creation was successfull.{" "}
                          <br />
                          You will be notified once processing begins... <br />
                          <h3>Thanks for your patronage!</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-lg">
                  <Button
                    text="Done"
                    btnStyle="btn btn-primary"
                    onClick={this.done}
                  />
                </div>
              </div>
            </div>
            <br />
          </div>
        );
    }
  };

  render() {
    return (
      <PageContent pageTitle={this.getPageTitle(this.state.page)}>
        {this.getPage(this.state.page)}
      </PageContent>
    );
  }
}

CreateParcel.propTypes = {
  history: PropTypes.object,
  push: PropTypes.func,
  isProcessing: PropTypes.bool.isRequired,
  messageAction: PropTypes.func.isRequired,
  processingAction: PropTypes.func,
  locatio: PropTypes.func,
  pathname: PropTypes.string
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
    processingAction
  }
)(withRouter(CreateParcel));
