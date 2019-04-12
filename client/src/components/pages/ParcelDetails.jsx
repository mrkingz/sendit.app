import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PageContent from "@containers/PageContent";
import AlertMessage from "@presentations/AlertMessage";
import Map from "@presentations/Map";
import actionTypes from "@actions/actionTypes";
import messageAction from "@actions/messageAction";
import processingAction from "@actions/processingAction";
import modalAction from "@actions/modalAction";
import Modal from "@presentations/Modal";
import dropdown from "@utils/script";
import UpdateLocation from "@presentations/UpdateLocation";
import parcelAction from "@actions/parcelAction";
import UpdateStatus from "@presentations/UpdateStatus";

class Details extends Component {
  fieldNames = [
    { weight: "Parcel weight" },
    { description: "Parcel description" },
    { deliveryMethod: "Delivery method" },
    { price: "Prize" },
    { deliveryStatus: "Status" },
    { SentOn: "Date sent" },
    { createdAt: "Order date" },
    { deleveredOn: "Date delivered" },
    { presentLocation: "Present location" }
  ];

  formatAddress = data => {
    return `${data.address}, ${data.lga}, ${data.state}`;
  };

  editParcel = () => {
    this.props.history.push(`/parcels/${this.props.parcel.parcelId}`);
  };

  showModal = option => {
    this.props.parcelAction({
      type: actionTypes.EDIT_LOCATION,
      payload: {
        editorType: option
      }
    });
    this.props.modalAction({
      type: actionTypes.SHOW_MODAL,
      payload: {
        type: option === "confirm" ? "confirm" : "Form",
        btnText: option === "confirm" ? "Proceed" : "vv"
      }
    });
  };

  getModalContent = () => {
    const { parcel } = this.props;
    switch (this.props.editorType) {
      case "confirm":
        return this.getCancelModal();
      case "parcel":
      case "status":
        return this.getStatusModal(parcel);
      case "location":
        return this.getLocationModal(parcel);
    }
  };

  getCancelModal = () => {
    return (
      <Modal
        btnText="Proceed"
        btnStyles="btn-primary"
        title={"Update status"}
        callback={e => this.cancelOrder(e)}
      >
        <div className="alert warning">
          <b>Are you sure you want to cancel this order?</b>
          <br />
          Click proceed to confirm this operation
        </div>
      </Modal>
    );
  };

  getStatusModal = parcel => {
    return (
      <Modal
        btnStyles="btn-primary"
        title={"Update status"}
        callback={e => this.updateStatus(e)}
      >
        <UpdateStatus
          parcelId={parcel.parcelId}
          location={parcel.deliveryStatus}
        />
      </Modal>
    );
  };

  getLocationModal = parcel => {
    return (
      <Modal
        btnStyles="btn-primary"
        title={"Update location"}
        callback={e => this.updateLocation(e)}
      >
        <UpdateLocation
          parcelId={parcel.parcelId}
          location={parcel.presentLocation}
        />
      </Modal>
    );
  };

  cancelOrder = () => {};

  updateLocation = e => {
    e.preventDefault();
  };

  updateStatus = e => {
    e.preventDefault();
  };

  render() {
    const { trackingNo, from, to, ...rest } = this.props.parcel;
    return (
      <PageContent pageTitle="Parcel details">
        <div className="panel">
          <div className="section-x">
            <button
              className="btn btn-link normal size-13"
              style={{ color: "rgb(59, 156, 252)" }}
              onClick={this.props.goBack}
            >
              <i className="fa fa-angle-double-left" /> Go back
            </button>
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
                      onClick={() => this.editParcel()}
                    >
                      Edit parcel details
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
          </div>
          <div className="section-x">
            <div className="card-header">
              <div className="card-title">
                <span className="bold">Tracking #: {trackingNo}</span>
              </div>
            </div>
            {this.fieldNames.map((field, index) => {
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

            <Fragment>
              <div className="section-y">
                <div className="field">
                  <div className="field-name">Pick up address</div>
                  <div className="field-value">{this.formatAddress(from)}</div>
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
                  <div className="field-name">{"Receiver's phone number"}</div>
                  <div className="field-value bold">{to.receiver.phone}</div>
                </div>
              </div>
            </Fragment>
          </div>

          <Map
            from={this.formatAddress(from)}
            to={this.formatAddress(to)}
            location={this.props.parcel.presentLocation}
          />
        </div>
        {this.props.isEditing ? this.getModalContent() : ""}
        {this.props.isEditing ? (
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

Details.propTypes = {
  messageAction: PropTypes.func.isRequired,
  processingAction: PropTypes.func.isRequired,
  modalAction: PropTypes.func,
  parcel: PropTypes.object.isRequired
};

const mapStateToProps = ({
  messageReducer,
  modalReducer,
  parcelReducer,
  profileReducer
}) => {
  return {
    message: messageReducer.message,
    isShow: modalReducer.isShow,
    parcel: parcelReducer.parcel,
    editorType: parcelReducer.editorType,
    isEditing: parcelReducer.isEditing,
    user: profileReducer.user
  };
};

export default connect(
  mapStateToProps,
  {
    messageAction,
    processingAction,
    modalAction,
    parcelAction
  }
)(withRouter(Details));
