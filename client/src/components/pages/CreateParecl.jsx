import React, { Component } from "react";
import PropTypes from "prop-types";
import omit from "lodash/omit";
import Button from "@presentations/Button";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Form from "@containers/Form";
import validator from "@validations/validator";
import messageAction from "@actions/messageAction";
import PageContent from "@containers/PageContent";
import ParcelPreview from "@presentations/ParcelPreview";
import request from "@request";
import actionTypes from "@actionTypes";
import ParcelDetails from "@presentations/ParcelDetails";
import PickUpDetails from "@presentations/PickUpDetails";
import DestinationDetails from "@presentations/DestinationDetails";
import ReceiverDetails from "@presentations/ReceiverDetails";
import AlertMessage from "@presentations/AlertMessage";
import success from "@images/success.png";

class CreateParcel extends Component {
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
   * @description Fetch states from storage
   * @returns void
   */
  fetchStates = async () => {
    try {
      const response = await request.get("/states");
      if (response.status === 200) {
        this.setState({ states: response.data.states });
      }
    } catch (error) {
      messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          message: "Something went wrong, could not load states"
        }
      });
    }
  };

  clearLGAsOnStateSelection = selectInputName => {
    this.setState({
      ...this.state,
      [selectInputName === "pickUpStateId"
        ? "pickUpLGAs"
        : "destinationLGAs"]: []
    });
  };

  /**
   * @description Fetch all L.G. Areas of a particular state
   *
   * @param {string} stateId the Id of the state
   * @param {string} name the name of the L.G. Area select field
   * @param {object} object with the L.G. Area field name and list of all LGAs as key-value pairs
   */
  fetchLGAs = async (stateId, name) => {
    try {
      if (
        stateId &&
        (name === "pickUpStateId" || name === "destinationStateId")
      ) {
        const response = await request.get(`/states/${stateId}/lgas`);
        if (response.status === 200) {
          return {
            [name === "pickUpStateId"
              ? "pickUpLGAs"
              : "destinationLGAs"]: response.data.lgas
          };
        }
      } else
        return {
          [name === "pickUpStateId" ? "pickUpLGAs" : "destinationLGAs"]: []
        };
    } catch (error) {
      messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          message: "Something went wrong, could not load states"
        }
      });
    }
  };

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
   * @description Reset the state to default values
   */
  done = () => {
    this.props.history.push("/dashboard");
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

  previewHandler = async event => {
    event.preventDefault();
    if (this.state.isPreviewing) {
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
   * @description Save the parcel delivery order
   *
   * @returns void
   */
  saveOrder = async () => {
    try {
      const response = await request.post("/parcels", this.state.fields);
      if (response.status === 201) {
        this.setState({
          ...this.state,
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
          message: "Something went wrong, could not load states"
        }
      });
    }
  };

  getPageTitle = page => {
    const titles = {
      create: "Create order",
      preview: "Confirm order details"
    };
    return titles[page];
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
            <ParcelDetails
              onChangeHandler={this.onChangeHandler}
              fieldRefs={this.fieldRefs}
              fields={fields}
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
  isProcessing: PropTypes.bool.isRequired,
  messageAction: PropTypes.func.isRequired
};

const mapStateToProps = ({ messageReducer }) => {
  return {
    isProcessing: messageReducer.isProcessing
  };
};

export default connect(
  mapStateToProps,
  {
    messageAction
  }
)(withRouter(CreateParcel));
