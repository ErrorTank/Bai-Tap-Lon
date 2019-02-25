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
import {AdminDashboard} from "./authen-routes/admin-dashboard/admin-dashboard";
import {ChangePassword} from "./authen-routes/change-password/change-password";
import {UserRoute} from "./authen-routes/user/edit/user-route";
import {UserListRoute} from "./authen-routes/user/list/user-list-route";
import {AccountRoute} from "./authen-routes/account/edit/account-route";
import {AccountListRoute} from "./authen-routes/account/list/account-list-route";
import {AccountNewRoute} from "./authen-routes/account/new/account-new-route";
import {CandidateRoute} from "./authen-routes/candidate/edit/candidate-route";
import {SchoolPresenterRoute} from "./authen-routes/school-presenter/edit/sp-route";
import {CandidateListRoute} from "./authen-routes/candidate/list/candidate-list-route";
import {SpListRoute} from "./authen-routes/school-presenter/list/sp-list-route";
import {SchoolListRoute} from "./authen-routes/school/list/school-list-route";
import {SchoolNewRoute} from "./authen-routes/school/new/school-new-route";
import {SchoolRoute} from "./authen-routes/school/edit/school-route";
import {PrizeNewRoute} from "./authen-routes/prize/new/prize-new-route";
import {PrizeRoute} from "./authen-routes/prize/edit/prize-route";
import {PrizeListRoute} from "./authen-routes/prize/list/prize-list-route";
import {SupervisorListRoute} from "./authen-routes/supervisor/list/supervisor-list-route";
import {SupervisorNewRoute} from "./authen-routes/supervisor/new/supervisor-new-route";
import {SupervisorRoute} from "./authen-routes/supervisor/edit/supervisor-route";
import {OrgLocationListRoute} from "./authen-routes/org-location/list/org-location-list-route";
import {OrgLocationNewRoute} from "./authen-routes/org-location/new/org-location-new-route";
import {OrgLocationRoute} from "./authen-routes/org-location/edit/org-location-route";
import {SubjectListRoute} from "./authen-routes/subject/list/subject-list-route";
import {SubjectNewRoute} from "./authen-routes/subject/new/subject-new-route";
import {SubjectRoute} from "./authen-routes/subject/edit/subject-route";
import {CandidateRegistration} from "./authen-routes/candidate-registration/list/candidate-registration";
import {ContestListRoute} from "./authen-routes/contest/list/contest-list-route";
import {ContestNewRoute} from "./authen-routes/contest/new/contest-new-route";
import {CandidateRegistrationNewRoute} from "./authen-routes/candidate-registration/new/rc-new-route";
import {RcRoute} from "./authen-routes/candidate-registration/edit/rc-route";

const NotFoundRoute = () => {
  let getComp = (props) => {

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
            <AuthenRoute exact path='/profile' component={AdminDashboard} excludeRoles={[0,1,2]}/>
            <AuthenRoute exact path='/dashboard' component={AdminDashboard} excludeRoles={[3]}/>
            <AuthenRoute exact path='/account/new' component={AccountNewRoute} excludeRoles={[2, 3]}/>
            <AuthenRoute exact path='/prize/new' component={PrizeNewRoute} excludeRoles={[2, 3]}/>
            <AuthenRoute exact path='/school/new' component={SchoolNewRoute} excludeRoles={[2, 3]}/>
            <AuthenRoute exact path='/supervisor/new' component={SupervisorNewRoute} excludeRoles={[2, 3]}/>
            <AuthenRoute exact path='/contest/new' component={ContestNewRoute} excludeRoles={[2, 3]}/>
            <AuthenRoute exact path='/candidate-register/new' component={CandidateRegistrationNewRoute} excludeRoles={[0,1,3]}/>
            <AuthenRoute exact path='/subject/new' component={SubjectNewRoute} excludeRoles={[2, 3]}/>
            <AuthenRoute exact path='/org-location/new' component={OrgLocationNewRoute} excludeRoles={[2,3]}/>
            <AuthenRoute exact path='/school/:schoolID/edit' component={SchoolRoute} excludeRoles={[3]}/>
            <AuthenRoute exact path='/candidate-register/:rcID/edit' component={RcRoute} excludeRoles={[0,1,3]}/>
            <AuthenRoute exact path='/subject/:subjectID/edit' component={SubjectRoute} excludeRoles={[2, 3]}/>
            <AuthenRoute exact path='/candidate/:candidateID/edit' component={CandidateRoute} excludeRoles={[3]}/>
            <AuthenRoute exact path='/account/:accountID/edit' component={AccountRoute} excludeRoles={[2,3]}/>
            <AuthenRoute exact path='/org-location/:orgLocationID/edit' component={OrgLocationRoute} excludeRoles={[2,3]}/>
            <AuthenRoute exact path='/sp/:spID/edit' component={SchoolPresenterRoute} excludeRoles={[3]}/>
            <AuthenRoute exact path='/user/:userID/edit' component={UserRoute} excludeRoles={[2,3]}/>
            <AuthenRoute exact path='/prize/:prizeID/edit' component={PrizeRoute} excludeRoles={[2, 3]}/>
            <AuthenRoute exact path='/supervisor/:supervisorID/edit' component={SupervisorRoute} excludeRoles={[2, 3]}/>
            <AuthenRoute exact path='/users' component={UserListRoute} excludeRoles={[2,3, 1]}/>
            <AuthenRoute exact path='/accounts' component={AccountListRoute} excludeRoles={[2,3]}/>
            <AuthenRoute exact path='/candidates' component={CandidateListRoute} excludeRoles={[3]}/>
            <AuthenRoute exact path='/subjects' component={SubjectListRoute} excludeRoles={[2, 3]}/>
            <AuthenRoute exact path='/school-presenters' component={SpListRoute} excludeRoles={[2,3]}/>
            <AuthenRoute exact path='/schools' component={SchoolListRoute} excludeRoles={[2,3]}/>
            <AuthenRoute exact path='/org-locations' component={OrgLocationListRoute} excludeRoles={[2,3]}/>
            <AuthenRoute exact path='/prizes' component={PrizeListRoute} excludeRoles={[2,3]}/>
            <AuthenRoute exact path='/supervisors' component={SupervisorListRoute} excludeRoles={[2,3]}/>
            <AuthenRoute exact path='/contests' component={ContestListRoute} excludeRoles={[2,3]}/>
            <AuthenRoute exact path='/change-password' component={ChangePassword}/>
            <AuthenRoute exact path='/candidate-registers' component={CandidateRegistration} excludeRoles={[0,1,3]}/>
            <GuestRoute exact path='/forgot-password' component={ForgotPassword}/>
            <NotFoundRoute/>
          </Switch>

        </Router>
      </div>
    );
  }
}
