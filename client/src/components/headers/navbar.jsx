import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Search from "./Search";
import PropTypes from "prop-types";
import AuthNavMenu from "../headers/AuthNavMenu";

const Navbar = props => {
  const getNavMenu = () => {
    if (props.isAuthenticated) {
      return <AuthNavMenu {...props} />;
    } else {
      return (
        <Fragment>
          {props.isAuthPage ? (
            <Link to="/" className="nav-link">
              Back
            </Link>
          ) : (
            <span>
              <Link to="/signin" className="nav-link">
                Sign in
              </Link>
              <Link to="/signup" className="nav-link">
                Sign up
              </Link>
            </span>
          )}
        </Fragment>
      );
    }
  };

  return (
    <header>
      <nav className="container navbar fixed-top">
        <div className="brand">
          <Link to="/" className="brand-name">
            SendIT<sup className="size-12">&trade;</sup>
          </Link>
        </div>
        {props.isAuthPage ? "" : <Search />}
        <div className="links">{getNavMenu()}</div>
      </nav>
    </header>
  );
};
Navbar.defaultProps = {
  isAuthPage: false
};

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isAuthPage: PropTypes.bool.isRequired
};

const mapStateToProps = ({ profileReducer }) => {
  return {
    isAuthenticated: profileReducer.isAuthenticated,
    user: profileReducer.user
  };
};

export default connect(mapStateToProps)(withRouter(Navbar));
