import React from "react";
import createBrowserHistory from "history/createBrowserHistory"
export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {KComponent} from "../common/k-component";
import {ModalsRegistry} from "../common/modal/modals";
import {AuthenRoute, GuestRoute, toDefaultRoute} from "./route-type";
import {Login} from "./guest-routes/login/login";
import {userInfo} from "../../common/states/user-info";

import {AuthenLayout} from "../layout/authen-layout/authen-layout";
import {NotFoundPage} from "./not-found/not-found";
import {ForgotPassword} from "./guest-routes/forgot-password/forgot-password";
import {AdminDashboard} from "./authen-routes/admin-routes/admin-dashboard/admin-dashboard";
import {ChangePassword} from "./authen-routes/admin-routes/change-password/change-password";

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
            <AuthenRoute exact path='/dashboard' component={AdminDashboard}/>
            <AuthenRoute exact path='/change-password' component={ChangePassword}/>
            <GuestRoute exact path='/forgot-password' component={ForgotPassword}/>
            <NotFoundRoute/>
          </Switch>

        </Router>
      </div>
    );
  }
}
