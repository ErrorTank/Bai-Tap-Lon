import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {KComponent} from "../../../../common/k-component";
import * as yup from "yup";




export class AccountNewRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <PageTitle title="Tạo tài khoản mới">
        <RouteTitle content="Tạo tài khoản mới">
          <div className="account-new-route">

          </div>
        </RouteTitle>
      </PageTitle>

    );
  }
}