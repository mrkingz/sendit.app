/* eslint-disable no-extra-boolean-cast */
import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "../presentations/Modal";
import modalAction from "../../js/actions/modalAction";
import actionTypes from "../../js/actions/actionTypes";
import request from "../../js/utils/request";
import messageAction from "../../js/actions/messageAction";

class FileBrowser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoURL: this.props.photoURL,
      isUploading: false
    };
  }

  browsePhoto = e => {
    const file = e.target.files[0];
    console.log(URL.createObjectURL(e.target.files[0]));
  };
  uploadPhoto = () => {};
  cancelUpload = () => {};
  removePhoto = async option => {
    if (!option) {
      this.showConfirmModal();
    } else {
      try {
        const response = await request.update("/auth/removePhoto", null);
        this.props.modalAction({
          type: actionTypes.IS_SUCCESSFULL,
          payload: { message: response.data.message }
        });
      } catch (error) {
        this.props.messageAction({
          type: actionTypes.SHOW_MESSAGE,
          payload: { message: "Something went wrong, could not remove photo" }
        });
      }
    }
  };

  showConfirmModal = () => {
    this.props.modalAction({
      type: actionTypes.SHOW_MODAL,
      payload: {
        title: "Confirm",
        type: "confirm",
        btnText: "Proceed"
      }
    });
  };
  render() {
    return (
      <Fragment>
        {this.props.photoURL ? (
          ""
        ) : (
          <form className="mt-lg" id="upload" encType="multipart/form-data">
            <label className="input-label fine-btn">
              <input
                id="photo"
                type="file"
                name="photo"
                onChange={this.browsePhoto}
                required
              />
              <span>Upload photo</span>
            </label>
          </form>
        )}
        {this.state.isUploading ? (
          <div id="group-btn">
            <button
              id="save"
              className="btn btn-sm btn-link fine-btn"
              onClick={this.uploadPhoto}
            >
              Save
            </button>
            <button
              id="cancel"
              className="btn btn-sm btn-link fine-btn mx-md"
              onClick={this.cancelUpload}
            >
              Cancel
            </button>
          </div>
        ) : (
          ""
        )}
        {!!this.state.photoURL ? (
          <div>
            <button
              className="btn btn-sm btn-link fine-btn"
              onClick={() => this.removePhoto(false)}
            >
              Remove photo
            </button>
          </div>
        ) : (
          ""
        )}
        <Modal
          btnText="Proceed"
          btnStyles="btn-primary"
          onClickHandler={() => this.removePhoto(true)}
        >
          <div className="alert warning">
            <b>Are you sure you want to remove profile photo?</b>
            <br />
            Click proceed to confirm this operation
          </div>
        </Modal>
      </Fragment>
    );
  }
}

FileBrowser.propTypes = {
  photoURL: PropTypes.string,
  modalAction: PropTypes.func,
  messageAction: PropTypes.func
};

export default connect(
  null,
  {
    modalAction,
    messageAction
  }
)(FileBrowser);
