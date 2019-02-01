import React from "react";
import createBrowserHistory from "history/createBrowserHistory"
export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {KComponent} from "../common/k-component";
import {ModalsRegistry} from "../common/modal/modals";
import {GuestRoute, toDefaultRoute} from "./route-type";
import {Login} from "./guest-routes/login/login";
import {userInfo} from "../../common/states/user-info";

import {AuthenLayout} from "../layout/authen-layout/authen-layout";
import {NotFoundPage} from "./not-found/not-found";
import {ForgotPassword} from "./guest-routes/forgot-password/forgot-password";

const NotFoundRoute = () => {
  let getComp = (props) => {
    console.log(props);
    if (!userInfo.getState()) {
      return (
        <NotFoundPage isLogin = {false} path={props.location.pathname}/>
      );

    }
    return (
      <AuthenLayout location={props.location} match={props.match}>
        <NotFoundPage isLogin = {true} path={props.location.pathname}/>
      </AuthenLayout>
    )
  };

  return (
    <Route
      render={props => getComp(props)}
    />
  )
};

export class MainRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {
    return (
      <div id="main-route">
        <ModalsRegistry/>
        <Router
          history={customHistory}
        >
          <Switch>
            <GuestRoute exact path='/' render={props => <Redirect to="/login"/>}/>
            <GuestRoute exact path='/login' component={Login}/>
            <GuestRoute exact path='/forgot-password' component={ForgotPassword}/>
            <NotFoundRoute/>
          </Switch>

        </Router>
      </div>
    );
  }
}
