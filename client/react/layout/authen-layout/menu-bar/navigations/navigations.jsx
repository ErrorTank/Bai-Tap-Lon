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
      roles: [0, 1, 2],
      active: ["/dashboard"]
    }, {
      icon: (
        <i className="fas fa-user"></i>
      ),
      label: "Quản lý tài khoản",
      url: "/accounts",
      linkTo: () => customHistory.push("/accounts"),
      roles: [0, 1],
      active: ["/accounts", "/account/:accountID/edit", "/account/new"]
    }, {
      icon: (
        <i className="fas fa-users"></i>
      ),
      label: "Tra cứu người dùng",
      url: "/users",
      linkTo: () => customHistory.push("/users"),
      roles: [0],
      active: ["/users", "/user/:userID/edit"]
    }, {
      icon: (
        <i className="fas fa-chalkboard-teacher"></i>
      ),
      label: "Tra cứu đại diện trường",
      url: "/school-presenters",
      linkTo: () => customHistory.push("/school-presenters"),
      roles: [0, 1],
      active: ["/school-presenters", "/sp/:spID/edit"]
    }, {
      icon: (
        <i className="fas fa-graduation-cap"></i>
      ),
      label: "Tra cứu thí sinh",
      url: "/candidates",
      linkTo: () => customHistory.push("/candidates"),
      roles: [0, 1, 2],
      active: ["/candidates", "/candidate/:candidateID/edit"]
    }, {
      icon: (
        <i className="fas fa-school"></i>
      ),
      label: "Quản lý trường",
      url: "/schools",
      linkTo: () => customHistory.push("/schools"),
      roles: [0, 1],
      active: ["/schools", "/school/new", "/school/:schoolID/edit"]
    } , {
      icon: (
        <i className="fas fa-school"></i>
      ),
      label: "Trường của tôi",
      url: `/school/:schoolID/edit`,
      linkTo: () => customHistory.push(`/school/${userInfo.getState().sID}/edit`),
      roles: [2],
      active: ["/school/:schoolID/edit"]
    }
  ];

  render() {
    let {role} = userInfo.getState();
    let path = this.props.match.path;
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