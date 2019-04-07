/* eslint-disable react/forbid-prop-types */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Navbar from "../headers/Navbar";
import Footer from "../footers";

class Template extends Component {
  render() {
    return (
      <Fragment>
        <Navbar isAuthPage={this.props.isAuthPage} />
        <div className="main">{this.props.children}</div>
        <Footer />
      </Fragment>
    );
  }
}

Template.propTypes = {
  children: PropTypes.any,
  isAuthPage: PropTypes.bool
};

export default Template;
