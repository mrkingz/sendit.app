import React from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import PropTypes from "prop-types";

const Navbar = ({ isAuthPage }) => {
  return (
    <header>
      <nav className="container navbar fixed-top">
        <div className="brand">
          <Link to="/" className="brand-name">
            SendIT<sup className="size-12">&trade;</sup>
          </Link>
        </div>
        {isAuthPage ? "" : <Search />}
        <div className="links">
          {isAuthPage ? (
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
        </div>
      </nav>
    </header>
  );
};
Navbar.defaultProps = {
  isAuthPage: false
};

Navbar.propTypes = {
  isAuthPage: PropTypes.bool.isRequired
};
export default Navbar;
