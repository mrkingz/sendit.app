/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-multi-comp */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import actionTypes from "../../js/actions/actionTypes";
import modalAction from "../../js/actions/modalAction";
import ButtonGroup from "./ButtonGroup";
import Button from "../presentations/Button";
import AlertMessage from "./AlertMessage";
import classnames from "classnames";
import success from "../../../assets/images/success.png";

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

  const alertModal = () => {
    return (
      <Fragment>
        <div className="shake animated align-center my-lg">
          <AlertMessage />
        </div>
        <div
          className="btn-group align-center"
          style={{ paddingBottom: ".6rem", paddingTop: ".2rem" }}
        >
          <Button
            btnStyle="btn-primary"
            text="Close"
            onClick={e => closeModal(e)}
          />
        </div>
      </Fragment>
    );
  };

  const confrimModal = () => {
    return (
      <Fragment>
        {props.children}
        <div className="btn-group align-center mb-lg">
          <ButtonGroup
            buttonProps={[
              {
                btnStyles: props.btnStyles,
                text: props.btnText,
                onClickHandler: props.onClickHandler
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
    );
  };

  const formModal = () => {
    return <Fragment>{props.children}</Fragment>;
  };

  const getModalContent = type => {
    switch (type) {
      case "alert":
        return alertModal();
      case "confirm":
        return confrimModal();
      default:
        return formModal();
    }
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
          <div className="modal-title ">
            {props.isSuccessful && props.type === "alert" ? (
              <p>
                <img
                  className="bounceInDown animated"
                  src={success}
                  alt=""
                  style={{ height: "50px", width: "50px" }}
                />
              </p>
            ) : (
              ""
            )}
            {props.title}
          </div>
          {getModalContent(props.type)}
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
  onClickHandler: PropTypes.func,
  isSuccessful: PropTypes.bool
};

const mapStateToProps = ({ modalReducer }) => {
  return {
    isShow: modalReducer.isShow,
    size: modalReducer.size,
    type: modalReducer.type,
    isStatic: modalReducer.isStatic,
    title: modalReducer.title,
    isSuccessful: modalReducer.isSuccessful
  };
};
export default connect(
  mapStateToProps,
  {
    modalAction
  }
)(Modal);
