import React from "react";
import {Logo} from "../../../../common/logo/logo";
import {userInfo} from "../../../../../common/states/user-info";

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  };

  render() {
    let {email, name} = this.props;

    return (
      <div className="user-nav-profile">
        <div className="profile-toggle">
          <Logo/>

        </div>
        <div className="profile-detail">
          <div className="detail-header">

            <div className="part-left">
              <Logo/>
            </div>
            <div className="part-right">
              <div className="name">
                {name}
              </div>
              <div className="email">
                {email}
              </div>
            </div>


          </div>
          <div className="detail-body">

          </div>
        </div>
      </div>
    );
  }
}