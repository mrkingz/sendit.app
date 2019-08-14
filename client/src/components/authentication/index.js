/* eslint-disable react/jsx-no-bind */
import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";
import isAuthenticated from "@utils/isAuthenticated";

const Authenticate = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        const properties = { ...props, ...rest };
        return isAuthenticated() ? (
          <Component {...properties} />
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
    />
  );
};

Authenticate.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object
};

export default Authenticate;
