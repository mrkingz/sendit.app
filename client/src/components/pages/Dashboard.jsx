import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Template from "@containers/Template";

class Dashboard extends Component {
  render() {
    return (
      <Template>
        <div className="row no-gutters">
          <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12">
            <div className="page">
              <div className="page-header">
                <span className="page-title">Dashboard</span>
              </div>
              <div className="page-content">
                <div className="dash-welcome">
                  Welcome,
                  <span className="size-16 normal" id="name" />
                  <div className="dash-wrapper">
                    <div className="dashboard" id="dashboard">
                      <Link to="/create" className="btn btn-primary">
                        <p>
                          <i className="fa fa-edit" />
                        </p>
                        Create Order
                      </Link>
                      <Link to="/parcels" className="btn btn-primary">
                        <p>
                          <i className="fa fa-list-ol" />
                        </p>
                        Delivery orders
                      </Link>
                      <Link to="/profile" className="btn btn-primary">
                        <p>
                          <i className="fa fa-user" />
                        </p>
                        My Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Template>
    );
  }
}

const mapStateToProps = ({ profileReducer }) => {
  return {
    user: profileReducer.user
  };
};

export default connect(mapStateToProps)(Dashboard);
