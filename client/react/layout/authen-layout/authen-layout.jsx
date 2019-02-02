import React from "react";
import {NavBar} from "./nav-bar/nav-bar";

export class AuthenLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="authen-layout">
        <NavBar/>
        {this.props.children}
      </div>
    );
  }
}
