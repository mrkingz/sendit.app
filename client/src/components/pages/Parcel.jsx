import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import request from "../../js/utils/request";
import PageContent from "../containers/PageContent";
import AlertMessage from "../presentations/AlertMessage";
import Map from "../presentations/Map";
import actionTypes from "../../js/actions/actionTypes";
import messageAction from "../../js/actions/messageAction";
import processingAction from "../../js/actions/processingAction";
import modalAction from "../../js/actions/modalAction";
import Modal from "../presentations/Modal";
import dropdown from "../../js/utils/script";
import UpdateLocation from "../presentations/UpdateLocation";
import UpdateStatus from "../presentations/UpdateStatus";
import UpdateParcelDetails from "../presentations/UpdateParcelDetails";
import UpdateDestination from "../presentations/UpdateDestination";
import UpdatePickUp from "../presentations/UpdatePickUp";
import UpdateReceiver from "../presentations/UpdateReceiver";

class Parcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcel: {},
      editorType: "",
      isFetching: true
    };
  }

  componentDidMount() {
    this.props.processingAction();
    this.fetchParcel();
  }

  getPath = () => {
    const { isUserParcels, userId } = this.props.location.state;
    const { parcelId } = this.props.match.params;
    return isUserParcels
      ? `/users/${userId}/parcels/${parcelId}`
      : `/parcels/${parcelId}`;
  };

  fetchParcel = async () => {
    try {
      const response = await request.get(this.getPath());
      this.setState({
        ...this.state,
        parcel: response.data.parcel,
        isFetching: false
      });
    } catch (error) {
      if (error.response && error.response.data) {
        this.props.messageAction({
          type: actionTypes.SHOW_MESSAGE,
          payload: {
            styles: "alert-danger",
            message: "Something went wrong, not not fetch parcel details"
          }
        });
      }
    }
    this.props.processingAction(false);
  };

  formatAddress = data => {
    let string;
    if (data) {
      string = data.address
        ? `${data.address}, ${data.lga}, ${data.state}`
        : `${data.lga}, ${data.state}`;
    }
    return string ? string : "No record yet";
  };

  showModal = option => {
    this.setState({
      ...this.state,
      editorType: option
    });
    this.props.modalAction({
      type: actionTypes.SHOW_MODAL,
      payload: {
        title: this.getTitle(option),
        type: option === "confirm" ? "confirm" : "form",
        btnText: option === "confirm" ? "Proceed" : ""
      }
    });
  };

  cancelOrder = async () => {
    try {
      const { parcel } = this.state;
      const response = await request.update(
        `/parcels/${parcel.parcelId}/cancel`
      );
      this.renderUpdate(response.data.parcel, response.data.message);
    } catch (error) {
      this.props.messageAction({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          styles: "alert-danger",
          message: "Something went wrong, could not cancel delivery request"
        }
      });
    }
  };

  getTitle = option => {
    const titles = {
      confirm: "Confirm cancel",
      status: "Update status",
      location: "Update location",
      details: "Edit parcel details",
      destination: "Edit parcel desrination",
      pickup: "Edit pick up details",
      receiver: "Edit receiver details"
    };
    return titles[option];
  };

  getModalContent = () => {
    const { parcel, editorType } = this.state;
    const modals = {
      confirm: this.getCancelModal(),
      status: this.getStatusModal(parcel),
      location: this.getLocationModal(parcel),
      details: this.getParcelDetailsModal(parcel),
      destination: this.getDestinationModal(parcel),
      pickup: this.getPickUpModal(parcel),
      receiver: this.getReceiverModal(parcel)
    };
    return modals[editorType];
  };

  getCancelModal = () => {
    return (
      <Modal
        btnText="Proceed"
        btnStyles="btn-primary"
        onClickHandler={this.cancelOrder}
      >
        <div className="alert warning">
          <b>Are you sure you want to cancel this order?</b>
          <br />
          Click proceed to confirm this operation
        </div>
      </Modal>
    );
  };

  getParcelDetailsModal = parcel => {
    return (
      <Modal btnStyles="btn-primary">
        <UpdateParcelDetails
          renderUpdate={this.renderUpdate}
          parcelId={parcel.parcelId}
          weight={`${parcel.weight}`}
          description={parcel.description}
          deliveryMethod={parcel.deliveryMethod}
        />
      </Modal>
    );
  };

  getStatusModal = parcel => {
    return (
      <Modal btnStyles="btn-primary">
        <UpdateStatus
          renderUpdate={this.renderUpdate}
          parcelId={parcel.parcelId}
          location={parcel.deliveryStatus}
        />
      </Modal>
    );
  };

  getDestinationModal = parcel => {
    return (
      <Modal btnStyles="btn-primary" title={"Update location"}>
        <UpdateDestination
          renderUpdate={this.renderUpdate}
          parcelId={parcel.parcelId}
          destinationAddress={parcel.to.address}
          destinationStateId={parcel.to.stateId}
          destinationLGAId={parcel.to.lgaId}
        />
      </Modal>
    );
  };

  getPickUpModal = parcel => {
    return (
      <Modal btnStyles="btn-primary" title={"Update location"}>
        <UpdatePickUp
          renderUpdate={this.renderUpdate}
          parcelId={parcel.parcelId}
          pickUpAddress={parcel.from.address}
          pickUpStateId={parcel.from.stateId}
          pickUpLGAId={parcel.from.lgaId}
        />
      </Modal>
    );
  };

  getLocationModal = parcel => {
    return (
      <Modal btnStyles="btn-primary">
        <UpdateLocation
          renderUpdate={this.renderUpdate}
          parcelId={parcel.parcelId}
          location={parcel.presentLocation}
        />
      </Modal>
    );
  };

  getReceiverModal = parcel => {
    return (
      <Modal btnStyles="btn-primary">
        <UpdateReceiver
          renderUpdate={this.renderUpdate}
          parcelId={parcel.parcelId}
          receiverName={parcel.to.receiver.name}
          receiverPhone={parcel.to.receiver.phone}
        />
      </Modal>
    );
  };

  renderUpdate = (updatedParcel, message) => {
    if (this.state.editorType === "pickup") {
      updatedParcel.to = this.state.parcel.to;
    } else if (this.state.editorType === "destination") {
      updatedParcel.from = this.state.parcel.from;
    } else {
      updatedParcel.to = this.state.parcel.to;
      updatedParcel.from = this.state.parcel.from;
    }
    this.setState({
      ...this.state,
      parcel: updatedParcel.parcelId ? updatedParcel : this.state.parcel
    });
    this.props.modalAction({
      type: actionTypes.IS_SUCCESSFULL
    });
    this.props.messageAction({
      type: actionTypes.SHOW_MESSAGE,
      payload: {
        styles: "alert-success",
        message: message
      }
    });
  };

  render() {
    const fieldNames = [
      { weight: "Parcel weight" },
      { description: "Parcel description" },
      { deliveryMethod: "Delivery method" },
      { price: "Prize" },
      { deliveryStatus: "Status" },
      { SentOn: "Date sent" },
      { createdAt: "Order date" },
      { deleveredOn: "Date delivered" }
    ];
    const {
      trackingNo,
      from,
      to,
      presentLocation,
      ...rest
    } = this.state.parcel;
    return (
      <PageContent pageTitle="Parcel details">
        <div className="panel">
          <div className="section-x">
            <Link
              className="btn btn-link normal size-13"
              style={{ color: "rgb(59, 156, 252)" }}
              to={{
                pathname: this.props.location.state.isUserParcels
                  ? "/users/parcels"
                  : "/parcels",
                state: {
                  userId: this.props.location.state.userId,
                  isUserParcels: this.props.location.state.isUserParcels
                }
              }}
            >
              <i className="fa fa-angle-double-left" /> Go back
            </Link>
            {rest.deliveryStatus === "Placed" ? (
              <div className="dropdown">
                <button
                  onClick={() => dropdown("order-menu")}
                  className="btn btn-link btn-sm fine-btn normal dropbtn"
                >
                  <i className="fa fa-bars bold" /> Menu
                </button>
                <div
                  id="order-menu"
                  className="dropdown-content size-10 dropdown-content-mini"
                >
                  {this.props.user.userId === rest.userId &&
                  rest.deliveryStatus === "Placed" ? (
                    <Fragment>
                      <button
                        className="menu-btn"
                        onClick={() => this.showModal("confirm")}
                      >
                        Cancel order
                      </button>
                      <button
                        className="menu-btn"
                        onClick={() => this.showModal("details")}
                      >
                        Edit parcel details
                      </button>
                      <button
                        className="menu-btn"
                        onClick={() => this.showModal("destination")}
                      >
                        Edit parcel destination
                      </button>
                      <button
                        className="menu-btn"
                        onClick={() => this.showModal("pickup")}
                      >
                        Edit pick up details
                      </button>
                      <button
                        className="menu-btn"
                        onClick={() => this.showModal("receiver")}
                      >
                        Edit receiver details
                      </button>
                    </Fragment>
                  ) : (
                    ""
                  )}
                  {this.props.user.isAdmin &&
                  rest.deliveryStatus !== "Delivered" &&
                  rest.deliveryStatus !== "Cancelled" ? (
                    <Fragment>
                      <button
                        className="menu-btn"
                        onClick={() => this.showModal("location")}
                      >
                        Update location
                      </button>
                      <button
                        className="menu-btn"
                        onClick={() => this.showModal("status")}
                      >
                        Update status
                      </button>
                    </Fragment>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="section-x">
            <div className="card-header">
              <div className="card-title">
                <span className="bold">Tracking #: {trackingNo}</span>
              </div>
            </div>
            {fieldNames.map((field, index) => {
              return (
                <div key={index} className="field">
                  <div className="field-name">{Object.values(field)[0]}</div>
                  <div
                    className={`field-value ${Object.keys(field)[0]} ${
                      Object.keys(field)[0] === "deliveryStatus"
                        ? "red-color"
                        : ""
                    }`}
                  >
                    {rest[Object.keys(field)[0]]
                      ? rest[Object.keys(field)[0]]
                      : "No record yet"}
                  </div>
                </div>
              );
            })}
            <div className="field">
              <div className="field-name">Present Location</div>
              <div className="field-value">
                {this.formatAddress(presentLocation)}
              </div>
            </div>
            {this.state.isFetching ? (
              ""
            ) : (
              <Fragment>
                <div className="section-y">
                  <div className="field">
                    <div className="field-name">Pick up address</div>
                    <div className="field-value">
                      {this.formatAddress(from)}
                    </div>
                  </div>
                  <div className="field">
                    <div className="field-name">{"Sender's name"}</div>
                    <div className="field-value bold">{from.sender.name}</div>
                  </div>
                  <div className="field">
                    <div className="field-name">{"Sender's phone No."}</div>
                    <div className="field-value">
                      {from.sender.phone ? from.sender.phone : "--"}
                    </div>
                  </div>
                </div>
                <div className="section-y">
                  <div className="field">
                    <div className="field-name">Destination address</div>
                    <div className="field-value">{this.formatAddress(to)}</div>
                  </div>
                  <div className="field">
                    <div className="field-name">Receiver name</div>
                    <div className="field-value bold">{to.receiver.name}</div>
                  </div>
                  <div className="field">
                    <div className="field-name">
                      {"Receiver's phone number"}
                    </div>
                    <div className="field-value bold">{to.receiver.phone}</div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>

          {this.state.isFetching ? (
            ""
          ) : (
            <Map
              from={this.formatAddress(from)}
              to={this.formatAddress(to)}
              location={this.formatAddress(presentLocation)}
            />
          )}
        </div>
        {this.props.isShow ? this.getModalContent() : ""}
        {this.props.isShow ? (
          ""
        ) : (
          <div className="mt-lg">
            <AlertMessage />
          </div>
        )}
      </PageContent>
    );
  }
}

Parcel.propTypes = {
  isShow: PropTypes.bool,
  messageAction: PropTypes.func.isRequired,
  processingAction: PropTypes.func.isRequired,
  modalAction: PropTypes.func,
  isUserParcels: PropTypes.bool,
  userId: PropTypes.string
};

const mapStateToProps = ({ messageReducer, modalReducer, profileReducer }) => {
  return {
    message: messageReducer.message,
    isShow: modalReducer.isShow,
    user: profileReducer.user
  };
};

export default connect(
  mapStateToProps,
  {
    messageAction,
    processingAction,
    modalAction
  }
)(withRouter(Parcel));