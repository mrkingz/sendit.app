import React, { Fragment } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

const AlertMessage = props => {
  return (
    <Fragment>
      {props.message ? (
        <div className="control-group">
          <div className={`alert ${props.styles}`}>
            {ReactHtmlParser(props.message)}
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.string,
  styles: PropTypes.string
};

const mapStateToProps = ({ messageReducer }) => {
  return {
    message: messageReducer.message,
    styles: messageReducer.styles
  };
};

export default connect(mapStateToProps)(AlertMessage);
