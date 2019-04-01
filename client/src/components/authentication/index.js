/* eslint-disable react/jsx-no-bind */
import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import authenticate from "@utils/authenticate";

const Authenticate = ({ component: Component, ...rest }) => {
  <Route
    {...rest}
    render={props => {
      return authenticate() ? (
        <Component {...rest} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: {
              from: props.location
            }
          }}
        />
      );
    }}
  />;
};

Authenticate.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object
};

export default Authenticate;
