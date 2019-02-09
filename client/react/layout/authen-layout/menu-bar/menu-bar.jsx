import React from "react";
import {customHistory} from "../../../routes/routes";
import {Navigations} from "./navigations/navigations";

export class MenuBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="k-menu-bar fixed-top">
        <div className="menu-header">
          <div className="menu-brand"
               onClick={() => customHistory.push("/dashboard")}
          >
            <img src="/assets/img/Framelogo.svg"/>
          </div>
        </div>

        <div className="menu-body">
          <Navigations match={this.props.match}/>
        </div>
      </div>
    );
  }
}