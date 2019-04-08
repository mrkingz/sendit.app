import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import processing from "@images/processing.gif";
import classnames from "classnames";

const Processing = props => {
  return (
    <div className={classnames("modal static", { show: props.showProcessing })}>
      <div className="modal-content modal-sm spinner">
        <div className="bold" id="spinner-img">
          <div>
            <img style={{ height: "140px" }} src={processing} />
            <div>Please wait...</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Processing.propTypes = {
  showProcessing: PropTypes.bool
};

const mapStateToProps = ({ processingReducer }) => {
  return {
    showProcessing: processingReducer.showProcessing
  };
};
export default connect(mapStateToProps)(Processing);
