import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@presentations/Button";

const ParcelCard = props => {
  const {
    trackingNo,
    weight,
    description,
    deliveryMethod,
    deliveryStatus,
    createdAt,
    viewDetails
  } = props;

  return (
    <div className="card">
      <div className="nexted">
        <div className="card-header">
          <div className="card-title">
            <span className="bold">Tracking #: {trackingNo}</span>
          </div>
        </div>
        <div className="card-wrapper">
          <div className="card-row">
            <div className="data-header">Weight</div>
            <div className="data weight">{weight}</div>
          </div>
          <div className="card-row">
            <div className="data-header">Parcel description</div>
            <div className="data">{description || "Not available"}</div>
          </div>
          <div className="card-row">
            <div className="data-header">Delivery method</div>
            <div className="data">{deliveryMethod}</div>
          </div>
          <div className="card-row">
            <div className="data-header">Status</div>
            <div className="data red-color">{deliveryStatus}</div>
          </div>
        </div>
        <div className="card-footer">
          <span>
            <span className="bold">Date: </span>
            {createdAt}
          </span>
          <Button
            onClick={viewDetails}
            btnStyle="btn btn-link btn-sm fine-btn"
            text="Details"
          />
        </div>
      </div>
    </div>
  );
};

ParcelCard.propTypes = {
  trackingNo: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  deliveryMethod: PropTypes.string.isRequired,
  deliveryStatus: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  viewDetails: PropTypes.func.isRequired
};
export default withRouter(ParcelCard);
