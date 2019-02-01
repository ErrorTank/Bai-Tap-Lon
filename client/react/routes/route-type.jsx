import React from "react";
import {rolesHelper, userInfo} from "../../common/states/user-info";
import {Route, Redirect} from "react-router-dom"
import {TrackLocation} from "../common/location-tracker";
import {AuthenLayout} from "../layout/authen-layout/authen-layout";

export const toDefaultRoute = () => {
  let role = rolesHelper.getRole();
  if (role === null)
    return "/login";
  switch (role.role) {
    case 0:
      return `/info`;
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return `/dashboard`;
    default:
      return "/login";
  }
};

export const GuestRoute = ({render, component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => !userInfo.getState() ? render ? render(props) : (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: toDefaultRoute(),
        }}
      />
    )}
  />
);
export const AuthenRoute = ({component: Component, ...rest}) => {
  let getComp = (props) => {
    if (!userInfo.getState()) {
      return (
        <Redirect to={{pathname: "/login"}}/>
      )
    }

    return (
      <TrackLocation
        location={props.location}
        render={() => (
          <AuthenLayout location={props.location} match={props.match}>
            <Component {...props} />
          </AuthenLayout>
        )}
      />

    )
  };
  return (
    <Route
      {...rest}
      render={props => getComp(props)}
    />
  );
};
