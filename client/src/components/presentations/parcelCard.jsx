import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ParcelCard = ({
  trackingNo,
  weight,
  description,
  deliveryMethod,
  deliveryStatus,
  createdAt,
  parcelId
}) => {
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
          <Link
            to={`/parcels/${parcelId}`}
            className="btn btn-link btn-sm fine-btn"
          >
            Details
          </Link>
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
  parcelId: PropTypes.number.isRequired
};
export default ParcelCard;
