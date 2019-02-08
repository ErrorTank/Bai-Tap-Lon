import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {AuthenLayout} from "../../../layout/authen-layout/authen-layout";

export class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <PageTitle
        title="Trang chủ"
      >
        <div className="admin-dashboard">

        </div>
      </PageTitle>
    );
  }
}
