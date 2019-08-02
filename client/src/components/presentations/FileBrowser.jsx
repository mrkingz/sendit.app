/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "../presentations/Modal";
import modalAction from "../../js/actions/modalAction";
import actionTypes from "../../js/actions/actionTypes";
import request from "../../js/utils/request";
import messageAction from "../../js/actions/messageAction";
import BaseComponent from "../globals/BaseComponent";
import ReactHtmlParser from "react-html-parser";
import processingAction from "../../js/actions/processingAction";

class FileBrowser extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      file: null,
      step: 1,
      hasPhotoUploaded: !!this.props.user.photoURL,
      error: ""
    };
  }

  browsePhoto = e => {
    const uploadedFile = e.target.files[0];
    this.setState({
      ...this.state,
      file: uploadedFile,
      step: 2
    });
    this.props.renderUpdate({
      ...this.props.user,
      tempPhoto: URL.createObjectURL(uploadedFile)
    });
  };

  uploadPhoto = async () => {
    const { hasError, message } = this.validatePhoto(this.state.file);
    if (hasError) {
      this.setState({
        ...this.state,
        error: message
      });
    } else {
      await this.saveUploadedPhoto(this.state.file);
      this.setState({
        ...this.state,
        file: null,
        step: 1,
        hasPhotoUploaded: true
      });
    }
  };

  saveUploadedPhoto = async file => {
    try {
      this.props.processingAction(true);

      const form = new FormData();
      form.append("photo", file);
      const { data } = await request.update("/auth/uploadPhoto", form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      this.props.renderUpdate({ ...data.user }, data.message);
      this.props.processingAction(false);
    } catch (error) {
      this.showErrorMessage(
        "Something went wrong, could not save uploaded photo"
      );
    }
  };

  cancelUpload = () => {
    this.setState({
      ...this.state,
      step: 1
    });
    this.props.renderUpdate({
      ...this.props.user,
      tempPhoto: null
    });
  };

  removePhoto = async option => {
    this.props.stopOpenEditModal();
    if (!option) {
      this.showConfirmModal();
    } else {
      try {
        this.props.processingAction(true);

        const { data } = await request.update("/auth/removePhoto");
        this.props.modalAction({
          type: actionTypes.IS_SUCCESSFUL,
          payload: { message: data.message }
        });

        const { tempPhoto, ...user } = this.props.user;
        this.setState({
          ...this.state,
          hasPhotoUploaded: false,
          photoURL: null,
          tempPhoto: null
        });
        this.props.renderUpdate({ ...user, photoURL: null, tempPhoto: null });
        this.props.processingAction(false);
      } catch (error) {
        this.showErrorMessage("Something went wrong, could not remove photo");
      }
    }
  };

  getImageExtension = file => file.name.split(".").pop();

  validatePhoto = file => {
    const size = file.size / 1024 / 1024; // in MB
    const ext = this.getImageExtension(file);
    const formats = ["jpg", "png", "jpeg"];
    let message = null;
    if (!formats.includes(ext)) {
      message = `Photo format must be one of <b>${formats.join(", ")}</b>`;
    } else if (size > 2) {
      message = "File size exceeds 2 MB";
    }
    return { hasError: message !== null, message };
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

  displayButton = () => {
    switch (this.state.step) {
      case 1:
        if (this.state.hasPhotoUploaded) {
          return (
            <button
              id="remove"
              className="btn btn-sm btn-link fine-btn size-11"
              onClick={() => this.removePhoto(false)}
            >
              Remove photo
            </button>
          );
        } else {
          return (
            <form id="upload" encType="multipart/form-data">
              <label className="input-label fine-btn">
                <input
                  type="file"
                  name="photo"
                  onChange={this.browsePhoto}
                  required
                />
                <span>Upload photo</span>
              </label>
            </form>
          );
        }
      case 2:
        return (
          <Fragment>
            <button
              id="save"
              className="btn btn-sm btn-link fine-btn size-12"
              onClick={this.uploadPhoto}
            >
              Save
            </button>
            <button
              id="cancel"
              className="btn btn-sm btn-link fine-btn size-12 mx-md"
              onClick={this.cancelUpload}
            >
              Cancel
            </button>
          </Fragment>
        );
    }
  };

  render() {
    return (
      <Fragment>
        <div className="mt-lg">{this.displayButton()}</div>
        {!this.props.canOpenEditModal ? (
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
        ) : (
          ""
        )}
        <span className="error">{ReactHtmlParser(this.state.error)}</span>
      </Fragment>
    );
  }
}

FileBrowser.propTypes = {
  canOpenEditModal: PropTypes.bool,
  user: PropTypes.object,
  modalAction: PropTypes.func,
  messageAction: PropTypes.func,
  renderUpdate: PropTypes.func
};

export default connect(
  null,
  {
    modalAction,
    messageAction,
    processingAction
  }
)(FileBrowser);
