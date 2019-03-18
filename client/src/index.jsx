import React, { Fragment } from "react";
import ReactDom from "react-dom";
import Routes from "@routes";
import { IndexPage } from "@pages";

import "@css/style.css";

const App = () => {
  return <Routes />;
};

ReactDom.render(<App />, document.getElementById("app"));
