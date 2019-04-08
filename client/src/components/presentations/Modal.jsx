/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-multi-comp */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import actionTypes from "@actions/actionTypes";
import modalAction from "@actions/modalAction";
import ButtonGroup from "@presentations/ButtonGroup";
import AlertMessage from "@presentations/AlertMessage";
import messageAction from "@actions/messageAction";

const Modal = props => {
  const closeModal = () => {
    props.modalAction({
      type: actionTypes.CLOSE_MODAL
    });
  };

  const getModalContent = ({ btnText, type, callback }) => {
    return props.type === "alert" || props.type === "confirm" ? (
      <Fragment>
        <AlertMessage />
        <div className="btn-group align-center">
          <ButtonGroup
            buttonProps={[
              {
                btnStyles: type === "alert" ? "hide" : props.style,
                text: btnText,
                onClickHandler: callback
              },
              {
                btnStyles: "btn-primary",
                text: "Close",
                onClickHandler: () => closeModal()
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
    <div className={`modal ${props.isShow ? "show" : "hide"}`}>
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
  styles: PropTypes.string,
  isStatic: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
  modalActio: PropTypes.func,
  callback: PropTypes.funct,
  onClickHandler: PropTypes.func
};

const mapStateToProps = ({ modalReducer }) => {
  return {
    title: modalReducer.title,
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
