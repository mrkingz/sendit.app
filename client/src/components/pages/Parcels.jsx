import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import request from "../../js/utils/request";
import AlertMessage from "../presentations/AlertMessage";
import ParcelCard from "../presentations/parcelCard";
import actionTypes from "../../js/actions/actionTypes";
import messageAction from "../../js/actions/messageAction";
import processingAction from "../../js/actions/processingAction";
import PageContent from "../containers/PageContent";
import ParcelDetails from "../pages/ParcelDetails";
import modalAction from "../../js/actions/modalAction";
import Modal from "../presentations/Modal";
import dropdown from "../../js/utils/script";
import parcelAction from "../../js/actions/parcelAction";

class Parcels extends Component {
  state = {
    pageTitle: "Delivery orders",
    parcels: []
  };

  /**
   * @description Render progress info so user can be aware processing is on
   *
   * @memberof Parcels
   */
  componentWillMount() {
    this.props.processingAction();
  }

  componentDidMount() {
    this.fetchParcels();
  }

  showDetails = () => this.props.parcel !== null;

  fetchParcels = async filter => {
    let response;
    try {
      response = await request.get(
        `/parcels${filter ? "?filter=".concat(filter.toLowerCase()) : ""}`
      );
      if (response.status === 200) {
        this.setState({
          parcels: response.data.parcels,
          pageTitle: filter ? filter.concat(" orders") : "Delivery orders"
        });
      }
    } catch (error) {
      if (error.status === 500) {
        this.props.messageAction({
          type: actionTypes.SERVER_ERROR,
          payload: {
            message: "Something went wrong, could not fetch parcels"
          }
        });
      }
      if (filter) {
        this.props.modalAction({
          type: actionTypes.SHOW_MODAL,
          payload: { type: "alert" }
        });
      }
      if (error.response && error.response.data) {
        this.props.messageAction({
          type: actionTypes.SHOW_MESSAGE,
          payload: {
            styles: "alert-danger",
            message: error.response.data.message
          }
        });
      }
    }
    this.props.processingAction(false);
  };

  getOrders = (option = null) => {
    this.props.processingAction();
    this.fetchParcels(option);
  };

  getParcel = parcel => {
    this.props.parcelAction({
      type: actionTypes.START_DETAILS_VIEW,
      payload: { parcel }
    });
  };

  goBack = () => {
    this.props.parcelAction({
      type: actionTypes.STOP_DETAILS_VIEW
    });
    this.props.modalAction({
      type: actionTypes.CLOSE_MODAL
    });
  };

  getContent = () => {
    return this.showDetails() ? (
      <ParcelDetails parcel={this.props.parcel} goBack={this.goBack} />
    ) : (
      <PageContent pageTitle={this.state.pageTitle}>
        <div className="panel">
          <div id="filter-div" className="filter-div section-x">
            <div className="dropdown">
              <button
                onClick={() => dropdown("filter")}
                className="btn-link fine-btn size-13 btn-sm dropbtn"
              >
                <i className="fa fa-filter" /> Filter orders
              </button>
              <div
                id="filter"
                className="dropdown-content size-11 dropdown-content-mini"
              >
                <button className="menu-btn" onClick={() => this.getOrders()}>
                  All orders
                </button>
                <button
                  className="menu-btn"
                  onClick={() => this.getOrders("Cancelled")}
                >
                  Cancelled orders
                </button>
                <button
                  className="menu-btn"
                  onClick={() => this.getOrders("Delivered")}
                >
                  Delivered orders
                </button>
                <button
                  className="menu-btn"
                  onClick={() => this.getOrders("Placed")}
                >
                  Pending orders
                </button>
                <button
                  className="menu-btn"
                  onClick={() => this.getOrders("Transiting")}
                >
                  Transiting orders
                </button>
              </div>
            </div>
          </div>
          {this.state.parcels.map((parcel, index) => {
            return (
              <ParcelCard
                key={index}
                {...parcel}
                viewDetails={() => this.getParcel(parcel)}
              />
            );
          })}
          {// We don't want message showing on the message if modal is rendering
          this.props.isShow ? "" : <AlertMessage />}
          {this.props.isShow ? <Modal /> : ""}
        </div>
      </PageContent>
    );
  };

  render() {
    return this.getContent();
  }
}

Parcels.propTypes = {
  messageAction: PropTypes.func.isRequired,
  processingAction: PropTypes.func.isRequired,
  modalAction: PropTypes.func,
  parcelAction: PropTypes.func,
  parcel: PropTypes.object,
  isShow: PropTypes.bool
};

const mapStateToProps = ({ messageReducer, modalReducer, parcelReducer }) => {
  return {
    message: messageReducer.message,
    isShow: modalReducer.isShow,
    parcel: parcelReducer.parcel
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
)(Parcels);
