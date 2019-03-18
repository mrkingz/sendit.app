import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { IndexPage } from "@pages";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/:page?" component={IndexPage} />
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
