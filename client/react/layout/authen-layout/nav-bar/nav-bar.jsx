import React from "react";
import {customHistory} from "../../../routes/routes";
import {Logo} from "../../../common/logo/logo";
import {UserProfile} from "./user-profile/user-profile";

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (

      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light k-navbar">
        <div className="container">
          <a className="navbar-brand"
             onClick={() => customHistory.push("/dashboard")}
          >
            <img src="./assets/img/Framelogo.svg"/>
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
                  aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ml-auto ">
              {/*<li className="nav-item active">*/}
                {/*<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>*/}
              {/*</li>*/}
              {/*<li className="nav-item">*/}
                {/*<a className="nav-link" href="#">Features</a>*/}
              {/*</li>*/}
              <li className="nav-item">
                <a className="nav-link p-0">
                  <UserProfile/>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    );
  }
}