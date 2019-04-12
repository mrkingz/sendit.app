/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ButtonGroup from "@presentations/ButtonGroup";
import messageAction from "@actions/messageAction";
import AlertMessage from "@presentations/AlertMessage";

const ParcelPreview = props => {
  const {
    fields: {
      pickUpAddress,
      destinationAddress,
      pickUpStateId,
      pickUpLGAId,
      destinationStateId,
      destinationLGAId,
      receiverPhone,
      ...rest
    },
    states,
    pickUpLGAs,
    destinationLGAs
  } = props.state;

  const fieldNames = [
    { weight: "Parcel weight" },
    { description: "Parcel description" },
    { deliveryMethod: "Delivery method" },
    { pickUpAddress: "Pick up location" },
    { destinationAddress: "Parcel destination" },
    { receiverName: "Receiver's name" }
  ];

  /**
   * @description Get the name of a L.G Area
   *
   * @param {array} lgaList list of L.G. Area
   * @param {int} lgaId L.G. Area id
   * @returns
   */
  const getLGAName = (lgaList, lgaId) => {
    for (let i = 0; i < lgaList.length; i++) {
      if (lgaList[i]["lgaId"].toString() === lgaId.toString()) {
        return lgaList[i]["lga"];
      }
    }
  };

  /**
   * @description Compute delivery price
   *
   * @static
   * @param {int|float} weight
   * @param {number} [distance=1] the total distance
   * @returns {number} the computed delivery price
   */
  const computePrice = (weight, distance = 1) => {
    return Number(weight) * 1000 * Number(distance);
  };

  /**
   * @description Format address
   *
   * @param {string} address
   * @returns {string} the formatted address
   */
  const joinAddress = address => {
    if (address === "pickUpAddress" && pickUpAddress) {
      return `${pickUpAddress}, ${getLGAName(pickUpLGAs, pickUpLGAId)}, ${
        states[pickUpStateId - 1].state
      }`;
    }
    if (address === "destinationAddress" && destinationAddress) {
      return `${destinationAddress}, ${getLGAName(
        destinationLGAs,
        destinationLGAId
      )}, ${states[destinationStateId - 1].state}`;
    }
  };

  /**
   * Format phone to include country code
   *
   * @static
   * @param {string} phoneNumber
   * @param {string} countryCode
   * @returns {string} the formated phone number
   */
  const formatPhoneNumber = (phoneNumber, countryCode) => {
    countryCode = countryCode.replace("009", "").replace();
    countryCode = !countryCode.startsWith("+")
      ? `+${countryCode}`
      : countryCode;
    return countryCode.concat(phoneNumber.substr(-10));
  };
  return (
    <Fragment>
      <div className="section bounceIn animate">
        <div className="panel">
          {fieldNames.map((field, index) => {
            return (
              <div className="field" key={index}>
                <div className="field-name">{Object.values(field)[0]}</div>
                <div className={`field-value ${Object.keys(field)[0]}`}>
                  {Object.keys(field)[0].indexOf("Address") > -1
                    ? joinAddress(Object.keys(field)[0])
                    : rest[Object.keys(field)[0]]}
                </div>
              </div>
            );
          })}
          <div className="field">
            <div className="field-name">{"Receiver's phone number"}</div>
            <div className="field-value">
              {formatPhoneNumber(receiverPhone, rest.countryCode)}
            </div>
          </div>
          <div className="field">
            <div className="field-name">Estimated date of arrival</div>
            <div className="field-value red-color">
              {`Maximum of ${
                rest.deliveryMethod === "Fast" ? 3 : 7
              } days from pick up date`}
            </div>
          </div>
          <div className="bid-alert">
            <div className="outter-alert-wrapper dash-wrapper">
              <div className="inner-alert-wrapper">
                <div className="nexted">
                  <div className="alert alert-info cost">
                    Delivery cost: &#8358;{" "}
                    <span>{computePrice(rest.weight)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AlertMessage />
          <div className="btn-group align-center">
            <ButtonGroup
              buttonProps={[
                {
                  btnStyles: "btn-primary",
                  text: props.isProcessing ? "Processing..." : "Submit",
                  isDisabled: props.isProcessing,
                  onClickHandler: props.saveOrder
                },
                {
                  btnStyles: "btn-primary-inverse fine-btn",
                  text: "Edit order",
                  isDisabled: props.isProcessing,
                  onClickHandler: props.previewHandler
                }
              ]}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ParcelPreview.propTypes = {
  states: PropTypes.object,
  pickUpLGAs: PropTypes.array,
  destinationLGAs: PropTypes.array,
  pickUpStateId: PropTypes.string,
  pickUpLGAId: PropTypes.string,
  destinationStateId: PropTypes.string,
  destinationLGAId: PropTypes.string,
  saveOrder: PropTypes.func.isRequired,
  previewHandler: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool,
  message: PropTypes.string
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
)(ParcelPreview);
