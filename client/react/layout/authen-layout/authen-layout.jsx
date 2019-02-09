import React from "react";
import {NavBar} from "./nav-bar/nav-bar";
import {MenuBar} from "./menu-bar/menu-bar";


export class AuthenLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="authen-layout">
        <NavBar/>
        <MenuBar match={this.props.match}/>
        <div className="authen-body">
          {this.props.children}
        </div>

      </div>
    );
  }
}
