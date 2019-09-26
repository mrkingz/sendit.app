import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

import Modal from "../presentations/Modal";
import dropdown from "../../js/utils/script";
import PageContent from "../containers/PageContent";
import UpdateName from "../presentations/UpdateName";
import UserOrders from "../presentations/UserOrders";
import BaseComponent from "../globals/BaseComponent";
import avatar from "../../../assets/images/avatar.png";
import FileBrowser from "../presentations/FileBrowser";
import actionTypes from "../../js/actions/actionTypes";
import modalAction from "../../js/actions/modalAction";
import messageAction from "../../js/actions/messageAction";
import ChangePassword from "../presentations/ChangePassword";
import processingAction from "../../js/actions/processingAction";
import UpdatePhoneNumber from "../presentations/UpdatePhoneNumber";
import updateProfileAction from "../../js/actions/updateProfileAction";

class Profile extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      editorType: null,
      canOpedEditModal: false
    };
  }

  static getDerivedStateFromProps(prevProps, prevState) {
    if (prevProps.user !== prevState.user) {
      return { ...prevState, user: prevProps.user };
    }
    return null;
  }

  /**
   * @description Get the appropriate modal title
   *
   * @param {String} option the edit modal type
   * @memberof Profile
   */
  getTitle = option => {
    const titles = {
      name: "Update name",
      phoneNumber: "Update phone number",
      password: "Change password"
    };
    return titles[option];
  };

  showModal = option => {
    this.setState({
      ...this.state,
      canOpedEditModal: true,
      editorType: option
    });
    this.props.modalAction({
      type: actionTypes.SHOW_MODAL,
      payload: {
        title: this.getTitle(option),
        type: option === "confirm" ? "confirm" : "form",
        btnText: option === "confirm" ? "Proceed" : ""
      }
    });
  };

  displayModal = () => {
    const modalContents = {
      name: this.getUpdateNameModalConetent(),
      password: this.getChangePasswordModalContent(),
      phoneNumber: this.getUpdatePhoneNumberModalContent()
    };
    return (
      <Modal btnStyles="btn-primary">
        {modalContents[this.state.editorType]}
      </Modal>
    );
  };

  getChangePasswordModalContent = () => {
    return <ChangePassword user={this.state.user} />;
  };

  getUpdateNameModalConetent = () => {
    return (
      <UpdateName user={this.state.user} renderUpdate={this.renderUpdate} />
    );
  };

  getUpdatePhoneNumberModalContent = () => {
    return (
      <UpdatePhoneNumber
        user={this.state.user}
        renderUpdate={this.renderUpdate}
      />
    );
  };

  /**
   * @description Renders user details with the updated value
   *
   * @memberof Profile
   */
  renderUpdate = (updatedUser, message) => {
    this.setState({
      ...this.state,
      user: { ...this.state.user, ...updatedUser }
    });

    this.props.updateProfileAction({
      type: actionTypes.UPDATE_USER,
      payload: { user: updatedUser }
    });
    if (message) {
      this.props.modalAction({
        type: actionTypes.IS_SUCCESSFUL,
        payload: { message }
      });
    }
  };

  getKeyFromData = data => Object.keys(data)[0];

  getPhotoURL = () => {
    const { tempPhoto, photoURL } = this.state.user;
    if (tempPhoto) {
      return tempPhoto;
    }
    return photoURL ? photoURL : avatar;
  };

  stopOpenEditModal = () => {
    this.setState({
      ...this.state,
      canOpedEditModal: false
    });
  };

  render = () => {
    const fieldNames = [
      { firstname: "First name" },
      { lastname: "Last name" },
      { email: "Email address" },
      { phoneNumber: " Phone number" }
    ];
    const { isShow } = this.props;
    const { user } = this.state;
    return (
      <PageContent pageTitle="Profile details">
        <div className="panel">
          <div className="section-x">
            <div className="row no-gutters">
              <div className="col-12">
                <div className="dropdown">
                  <button
                    onClick={() => dropdown("menu")}
                    className="btn btn-link dropbtn btn-sm size-13 fine-btn"
                  >
                    <i className="fa fa-bars" /> Menu
                  </button>
                  <div
                    id="menu"
                    className="dropdown-content size-11 dropdown-content-mini"
                  >
                    <button
                      className="menu-btn"
                      onClick={() => this.showModal("name")}
                    >
                      Update name
                    </button>
                    <button
                      className="menu-btn"
                      id="phone-btn"
                      onClick={() => this.showModal("phoneNumber")}
                    >
                      Update phone number
                    </button>
                    <button
                      className="menu-btn"
                      onClick={() => this.showModal("password")}
                    >
                      Change password
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-lg">
              <div className="col-12">
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-m-12">
                    <div className="outter-div-wrapper">
                      <div className="align-center avatar-div">
                        <img
                          id="image"
                          src={this.getPhotoURL()}
                          alt=""
                          className="avatar"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-8 col-m-12">
                    <div className="mt-sm">
                      {fieldNames.map((data, index) => {
                        return (
                          <div key={index} className="data-row">
                            <label
                              htmlFor={this.getKeyFromData(data)}
                              className="data-label"
                            >
                              {Object.values(data)[0]}
                            </label>
                            <div
                              className={classnames("data-value", {
                                "data-name":
                                  this.getKeyFromData(data).indexOf("name") > -1
                              })}
                            >
                              {user[this.getKeyFromData(data)]
                                ? user[this.getKeyFromData(data)]
                                : "--"}
                            </div>
                          </div>
                        );
                      })}
                      {user.hasOwnProperty("photoURL") ? (
                        <FileBrowser
                          user={user}
                          renderUpdate={this.renderUpdate}
                          canOpedEditModal={!this.state.canOpedEditModal}
                          stopOpenEditModal={this.stopOpenEditModal}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                {isShow && this.state.canOpedEditModal
                  ? this.displayModal()
                  : ""}
                {user.orders ? (
                  <UserOrders userId={user.userId} orders={user.orders} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    );
  };
}

Profile.propTypes = {
  isShow: PropTypes.bool,
  processingAction: PropTypes.func,
  modalAction: PropTypes.func,
  messageAction: PropTypes.func
};
const mapStateToProps = ({ modalReducer, profileReducer }) => {
  return {
    isShow: modalReducer.isShow,
    user: profileReducer.user
  };
};
export default connect(
  mapStateToProps,
  {
    modalAction,
    processingAction,
    messageAction,
    updateProfileAction
  }
)(Profile);
