import React from "react";
import {rolesHelper, userInfo} from "../../common/states/user-info";
import {Route, Redirect} from "react-router-dom"
import {TrackLocation} from "../common/location-tracker";
import {AuthenLayout} from "../layout/authen-layout/authen-layout";
import {authenCache} from "../../common/cache/authen-cache";

export const toDefaultRoute = () => {
  let role = rolesHelper.getRole();
  if (role === null)
    return "/login";
  switch (role) {
    case 0:
    case 1:
    case 2:
      return `/dashboard`;
    case 3:
      return `/info`;

    default:
      return "/login";
  }
};

export const GuestRoute = ({render, component: Component, ...rest}) => {

  return (
    <Route
      {...rest}
      render={props => !authenCache.getAuthen() ? render ? render(props) : (
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
};
export const AuthenRoute = ({component: Component, excludeRoles = null, ...rest}) => {
  let getComp = (props) => {
    let info = userInfo.getState();
    if (!authenCache.getAuthen()) {
      return (
        <Redirect to={{pathname: "/login"}}/>
      )
    }
    if(info && excludeRoles && excludeRoles.length){

      if(excludeRoles.includes(info.role)){
        return (
          <Redirect
            to={{
              pathname: toDefaultRoute(),
            }}
          />
        )
      }
    }
    return (
      <AuthenLayout location={props.location} match={props.match}>
        <Component {...props}/>
      </AuthenLayout>
    )
  };
  return (
    <Route
      {...rest}
      render={props => {

        return (
          <TrackLocation
            location={props.match.url}
            render={() => getComp(props)}
          />


        )
      }}
    />
  );
};
