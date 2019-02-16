import React, {Fragment} from "react";
import {Logo} from "../../../../common/logo/logo";
import {userInfo} from "../../../../../common/states/user-info";
import classnames from "classnames"
import {userApi} from "../../../../../api/common/user-api";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {authenCache} from "../../../../../common/cache/authen-cache";
import {customHistory} from "../../../../routes/routes";

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,

    };

  };

  handleSignout = () => {
    userInfo.setState(null).then(() => {
      authenCache.clearAuthen();
      customHistory.push("/login");
    });

  };

  viewProfile = () => {
    this.setState({hover: false});
    customHistory.push(this.getUrl());
  };

  changePassword = () => {
    this.setState({hover: false});
    customHistory.push("/change-password");
  };

  getUrl = () =>{
    let info = userInfo.getState();
    if([0, 1].includes(info.role)){
      return `/user/${info.userID}/edit`
    }else if(info.role === 2){
      return `/sp/${info.spID}/edit`
    }else if(info.role === 3){
      return `/profile`;
    }
  };

  render() {

    let {hover} = this.state;
    let {name, email} = userInfo.getState();
    return (
      <div className="user-nav-profile"
           onMouseEnter={() => !hover && this.setState({hover: true})}
           onMouseLeave={() => hover && this.setState({hover: false})}
      >
        <div className={classnames(
          "user-nav-detail",
          {"hide": !hover}
        )}>
          <div className={classnames(
            "profile-detail"
          )}>
            {(name && email) ? (
              <Fragment>
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
                  <div className="body-item"
                       onClick={this.viewProfile}
                  >
                    <div className="icon">
                      <i className="far fa-user-circle"></i>
                    </div>
                    <div className="label">
                      Thông tin cá nhân
                    </div>
                  </div>
                  <div className="body-item"
                       onClick={this.changePassword}
                  >
                    <div className="icon">
                      <i className="fas fa-key"></i>
                    </div>
                    <div className="label"

                    >
                      Đổi mật khẩu
                    </div>
                  </div>
                  <div className="body-item"
                       onClick={this.handleSignout}
                  >
                    <div className="icon">
                      <i className="fas fa-sign-out-alt"></i>
                    </div>
                    <div className="label">
                      Đăng xuất
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <LoadingInline
                className={"nav-profile-loading"}
              />
            )

            }

          </div>
        </div>
        <div className={classnames(
          "profile-toggle",
          {"high-light": hover}
        )}>
          <Logo/>

        </div>

      </div>
    );
  }
}