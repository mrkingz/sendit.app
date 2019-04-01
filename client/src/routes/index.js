import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Authenticate from "@auth";
import routes from "./routes";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.public.map(({ exact, path, component }, index) => (
          <Route key={index} exact={exact} path={path} component={component} />
        ))}
        {routes.protected.map(({ exact, path, component }, index) => (
          <Authenticate
            key={index}
            exact={exact}
            path={path}
            component={component}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
};
export default Routes;
