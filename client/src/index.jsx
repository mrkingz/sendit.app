import React from "react";
import { Provider } from "react-redux";
import ReactDom from "react-dom";
import Routes from "@routes";
import store from "@store";

import "@css/font-awesome.min.css";
import "@css/scarfold.css";
import "@css/styles.css";
import "@css/animate.css";

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

ReactDom.render(<App />, document.getElementById("app"));
