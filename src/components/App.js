import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  HOME_PATH,
  PAYMENT_OPTIONS_PATH,
  SUBSCRIPTIONS_PATH,
} from "../config/paths";
import Authorization from "./common/Authorization";
import MemberProfileScreen from "./main/MemberProfileScreen";
import MainProviders from "./context/MainProviders";
import Subscriptions from "./main/Subscriptions";
import PaymentOptions from "./main/PaymentOptions";

export const App = () => (
  <MainProviders>
    <Router>
      <Switch>
        <Route
          path={HOME_PATH}
          exact
          component={Authorization()(MemberProfileScreen)}
        />
        <Route
          path={SUBSCRIPTIONS_PATH}
          exact
          component={Authorization()(Subscriptions)}
        />
        <Route
          path={PAYMENT_OPTIONS_PATH}
          exact
          component={Authorization()(PaymentOptions)}
        />
        <Redirect to={HOME_PATH} />
      </Switch>
    </Router>
  </MainProviders>
);

export default App;
