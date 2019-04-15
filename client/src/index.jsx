import React from "react";
import { Provider } from "react-redux";
import ReactDom from "react-dom";
import decode from "jwt-decode";
import Routes from "../src/routes";
import store from "@store";
import actionTypes from "@actionTypes";

import "../assets/css/font-awesome.min.css";
import "../assets/css/scarfold.css";
import "../assets/css/styles.css";
import "../assets/css/animate.css";

import authenticate from "@utils/authenticate";

if (authenticate()) {
  store.dispatch({
    type: actionTypes.SET_CURRENT_USER,
    payload: { user: decode(localStorage.getItem("token")) }
  });
} else {
  store.dispatch({
    type: actionTypes.LOGOUT_CURRENT_USER,
    payload: {}
  });
}

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

ReactDom.render(<App />, document.getElementById("app"));
