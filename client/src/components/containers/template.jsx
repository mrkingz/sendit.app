import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Navbar from "../headers/navbar";
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
  isAuthPage: PropTypes.bool
};

export default Template;
