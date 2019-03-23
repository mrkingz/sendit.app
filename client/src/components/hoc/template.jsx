/* eslint-disable react/display-name */
import React, { Component, Fragment } from "react";
import Navbar from "../headers/navbar";
import Footer from "../footers";

const Template = CurrentPage => {
  return () => {
    return (
      <Fragment>
        <Navbar />
        <CurrentPage />
        <Footer />
      </Fragment>
    );
  };
};
export default Template;
