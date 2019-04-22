import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import request from "../../js/utils/request";
import PageContent from "../containers/PageContent";
import dropdown from "../../js/utils/script";
import avatar from "../../../assets/images/avatar.png";
import FileBrowser from "../presentations/FileBrowser";
import processingAction from "../../js/actions/processingAction";
import UserOrders from "../presentations/UserOrders";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isFetching: true
    };
  }
  componentWillMount() {
    this.props.processingAction();
  }

  async componentDidMount() {
    await this.fetchOrderHistory();
    this.props.processingAction(false);
  }

  fetchOrderHistory = async () => {
    try {
      const response = await request.get("/auth/profileDetails");
      this.setState({
        user: response.data.user,
        isFetching: false
      });
    } catch (error) {
      //
    }
  };

  editNameModal = () => {};
  updatePhoneModal = () => {};
  changePasswordModal = () => {};

  render() {
    const fieldNames = [
      { firstname: "First name" },
      { lastname: "Last name" },
      { email: "Email address" },
      { phoneNumber: " Phone number" }
    ];
    return (
      <PageContent pageTitle="Profile details">
        <div className="panel">
          <div className="section-x">
            <div className="row no-gutters">
              <div className="col-12">
                <div className="dropdown hide">
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
                    <button className="menu-btn" onClick={this.editNameModal()}>
                      Update name
                    </button>
                    <button
                      className="menu-btn"
                      id="phone-btn"
                      onClick={this.updatePhoneModal()}
                    >
                      Update phone number
                    </button>
                    <button
                      className="menu-btn"
                      onClick={this.changePasswordModal("event, user")}
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
                          src={
                            this.state.user.photoURL
                              ? this.state.user.photoURL
                              : avatar
                          }
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
                              htmlFor={Object.keys(data)[0]}
                              className="data-label"
                            >
                              {Object.values(data)[0]}
                            </label>
                            <div className="data-value" id="data-firstname">
                              {this.state.user[Object.keys(data)[0]]
                                ? this.state.user[Object.keys(data)[0]]
                                : "--"}
                            </div>
                          </div>
                        );
                      })}
                      <FileBrowser photoURL={this.state.user.photoURL} />
                    </div>
                  </div>
                </div>
                {this.state.isFetching ? (
                  ""
                ) : (
                  <UserOrders
                    userId={this.state.user.userId}
                    orders={this.state.user.orders}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </PageContent>
    );
  }
}
Profile.propTypes = {
  processingAction: PropTypes.func
};
const mapStateToProps = ({ profileReducer }) => {
  return {
    user: profileReducer.user
  };
};
export default connect(
  mapStateToProps,
  {
    processingAction
  }
)(Profile);
