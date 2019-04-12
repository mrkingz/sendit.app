/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-multi-comp */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import actionTypes from "@actions/actionTypes";
import modalAction from "@actions/modalAction";
import ButtonGroup from "@presentations/ButtonGroup";
import AlertMessage from "@presentations/AlertMessage";
import classnames from "classnames";

const Modal = props => {
  const closeModal = e => {
    e.persist();
    if (e.target.classList.contains("static") || e.target !== e.currentTarget) {
      return;
    }
    props.modalAction({
      type: actionTypes.CLOSE_MODAL
    });
  };

  const getModalContent = ({ btnText, type, callback }) => {
    return props.type === "alert" || props.type === "confirm" ? (
      <Fragment>
        {props.children ? props.children : <AlertMessage />}
        <div className="btn-group align-center">
          <ButtonGroup
            buttonProps={[
              {
                btnStyles: type === "alert" ? "hide" : props.btnStyles,
                text: btnText,
                onClickHandler: callback
              },
              {
                btnStyles: "btn-primary",
                text: "Close",
                onClickHandler: e => closeModal(e)
              }
            ]}
          />
        </div>
      </Fragment>
    ) : (
      props.children
    );
  };

  return (
    <div
      className={classnames("modal", {
        show: props.isShow,
        static: props.isStatic
      })}
      tabIndex={-1}
      onClick={closeModal}
    >
      <div className={`modal-content ${props.size}`}>
        <div className="modal-header">
          <button className="close" tabIndex="-1" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-title ">{props.title}</div>
          {getModalContent({
            btnText: props.btnText,
            type: props.type,
            callback: props.onClickHandler
          })}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  btnText: PropTypes.string,
  isShow: PropTypes.bool,
  btnStyles: PropTypes.string,
  isStatic: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
  modalAction: PropTypes.func,
  callback: PropTypes.any,
  onClickHandler: PropTypes.func
};

const mapStateToProps = ({ modalReducer }) => {
  return {
    isShow: modalReducer.isShow,
    size: modalReducer.size,
    type: modalReducer.type,
    isStatic: modalReducer.isStatic
  };
};
export default connect(
  mapStateToProps,
  {
    modalAction
  }
)(Modal);
