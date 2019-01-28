import React from "react";
import createBrowserHistory from "history/createBrowserHistory"
export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {KComponent} from "../common/k-component";
import {ModalsRegistry} from "../common/modal/modals";
import {GuestRoute} from "./route-type";
import {Login} from "./guest-routes/login/login";



export class MainRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div id="main-route">
        <ModalsRegistry/>
        <Router
          history={customHistory}
        >
          <Switch>
            <GuestRoute path='/login' component={Login}/>
          </Switch>

        </Router>
      </div>
    );
  }
}
