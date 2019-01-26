import React from "react";
import createBrowserHistory from "history/createBrowserHistory"
export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {KComponent} from "../common/k-component";



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

            <GuestRoute path='' render={(props) => <Redirect to="/login"/>}/>
          </Switch>

        </Router>
      </div>
    );
  }
}
