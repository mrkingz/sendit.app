import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dropdown from "@utils/script";
import actionTypes from "@actionTypes";

const AuthNavMenu = props => {
  const { firstname, lastname } = props.user;
  const logOut = () => {
    props.dispatch({
      type: actionTypes.LOGOUT_CURRENT_USER
    });
    props.history.push("/");
    localStorage.removeItem("token");
  };

  return (
    <Fragment>
      {props.location.pathname == "/dashboard" ? (
        ""
      ) : (
        <div className="dropdown">
          <button
            onClick={dropdown("menu-dropdown")}
            className="btn btn-transparent dropbtn"
          >
            <i
              className="fa fa-bars"
              onClick={() => dropdown("menu-dropdown")}
            />
          </button>
          <div
            id="menu-dropdown"
            className="dropdown-content size-11 align-left"
          >
            <Link to="/dashboard" className="menu-btn">
              <i className="fa fa-dashboard" /> Dashboard
            </Link>
            <Link to="/create" className="menu-btn">
              <i className="fa fa-edit" /> New order
            </Link>
            <Link to="/orders" className="menu-btn">
              <i className="fa fa-list-ol" /> Delivery orders
            </Link>
          </div>
        </div>
      )}
      <div className="dropdown">
        <button
          id="avatar"
          onClick={() => dropdown("user-dropdown")}
          className="btn btn-transparent dropbtn"
        >
          <i className="fa fa-user-circle" />{" "}
          <i className="fa fa-caret-down size-18 normal ml-md" />
        </button>
        <div id="user-dropdown" className="dropdown-content size-11 align-left">
          <div className="panel px-md user-name">
            <div className="size-14 bold">{`${firstname} ${lastname}`}</div>
          </div>
          <Link to="/profile" className="menu-btn">
            <i className="fa fa-user-o" /> My profile
          </Link>
          <button className="menu-btn" onClick={logOut}>
            <i className="fa fa-sign-out" /> Sign out
          </button>
        </div>
      </div>
    </Fragment>
  );
};

AuthNavMenu.propTypes = {
  history: PropTypes.object,
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  pathname: PropTypes.string
};

export default AuthNavMenu;
