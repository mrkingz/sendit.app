import React from "react";
import { Provider } from "react-redux";
import ReactDom from "react-dom";
import Routes from "../src/routes";
import store from "@store";
import actionTypes from "@actionTypes";

import "../assets/css/font-awesome.min.css";
import "../assets/css/scarfold.css";
import "../assets/css/styles.css";
import "../assets/css/animate.css";
import getUserProfileAction from "../src/js/actions/getUserProfileAction";
import isAuthenticated from "@utils/isAuthenticated";

if (isAuthenticated()) {
  getUserProfileAction(store.dispatch);
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
