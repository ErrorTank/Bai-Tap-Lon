import React from "react";
import {customHistory} from "../../../../routes/routes";
import {userInfo} from "../../../../../common/states/user-info";
import classnames from "classnames"

export class Navigations extends React.Component {
  constructor(props) {
    super(props);
  };

  navs = [
    {
      icon: (
        <i className="fas fa-home"></i>
      ),
      label: "Trang chủ",
      url: "/dashboard",
      linkTo: () => customHistory.push("/dashboard"),
      roles: [0, 1],
      active: ["/dashboard"]
    }, {
      icon: (
        <i className="fas fa-user"></i>
      ),
      label: "Quản lý tài khoản",
      url: "/accounts",
      linkTo: () => customHistory.push("/accounts"),
      roles: [0, 1],
      active: ["/accounts", "/account"]
    }, {
      icon: (
        <i className="fas fa-users"></i>
      ),
      label: "Tra cứu người dùng",
      url: "/users",
      linkTo: () => customHistory.push("/users"),
      roles: [0],
      active: ["/users", "/user"]
    }
  ];

  render() {
    let {role} = userInfo.getState();
    let path = this.props.match.path;
    console.log(path)
    return (
      <div className="navigations">
        {this.navs.filter(each => each.roles.includes(role)).map((each, i) => (
          <div className={classnames("each-nav", {"active": each.active.find(url => path.includes(url))})}
               key={i}
               onClick={each.linkTo}
          >

            {each.icon}{each.label}
          </div>
        ))

        }
      </div>
    );
  }
}