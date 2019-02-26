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
    }, {
      icon: (
        <i className="fas fa-award"></i>
      ),
      label: "Quản lý giải thưởng",
      url: `/prizes`,
      linkTo: () => customHistory.push(`/prizes`),
      roles: [0, 1],
      active: ["/prize/:prizeID/edit", "/prize/new", "/prizes"]
    }, {
      icon: (
        <i className="fas fa-user-tie"></i>
      ),
      label: "Quản lý giám thị",
      url: `/supervisors`,
      linkTo: () => customHistory.push(`/supervisors`),
      roles: [0, 1],
      active: ["/supervisor/:supervisorID/edit", "/supervisor/new", "/supervisors"]
    }, {
      icon: (
        <i className="fas fa-map-marked-alt"></i>
      ),
      label: "Quản lý địa điểm tổ chức",
      url: `/org-locations`,
      linkTo: () => customHistory.push(`/org-locations`),
      roles: [0, 1],
      active: ["/org-location/:orgLocationID/edit", "/org-location/new", "/org-locations"]
    }, {
      icon: (
        <i className="fas fa-book-reader"></i>
      ),
      label: "Quản lý môn thi",
      url: `/subjects`,
      linkTo: () => customHistory.push(`/subjects`),
      roles: [0, 1],
      active: ["/subject/:subjectsID/edit", "/subject/new", "/subjects"]
    }, {
      icon: (
        <i className="fas fa-book"></i>
      ),
      label: "Quản lý kì thi",
      url: `/contests`,
      linkTo: () => customHistory.push(`/contests`),
      roles: [0, 1],
      active: ["/contest/:contestID/edit", "/contest/new", "/contests"]
    }, {
      icon: (
          <i className="fas fa-registered"></i>
      ),
      label: "Đăng ký dự thi",
      url: `/candidate-registers`,
      linkTo: () => customHistory.push(`/candidate-registers`),
      roles: [2],
      active: ["/candidate-register/:rcID/edit", "/candidate-register/new", "/candidate-registers"]
    }, {
      icon: (
        <i className="fas fa-thumbs-up"></i>
      ),
      label: "Duyệt đăng ký dự thi",
      url: `/approve-request`,
      linkTo: () => customHistory.push(`/approve-request`),
      roles: [0, 1],
      active: ["/approve-request"]
    }, {
      icon: (
        <i className="fas fa-columns"></i>
      ),
      label: "Quản lý phiếu báo điểm",
      url: `/results`,
      linkTo: () => customHistory.push(`/results`),
      roles: [0, 1],
      active: ["/result/new", "/results", "/result/:resultID/edit"]
    }
  ];

  render() {
    let {role} = userInfo.getState();
    let path = this.props.match.path;
    return (
      <div className="navigations">
        <div>
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

      </div>
    );
  }
}