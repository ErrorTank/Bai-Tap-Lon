import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";

export class AccountListRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <PageTitle
        title={"Danh sách tài khoản"}
      >
        <RouteTitle
          content={"Danh sách tài khoản"}
        >
          <div className="account-list-route">

          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}