import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {customHistory} from "../../../routes";

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
            <div className="m-portlet">
              <div className="m-portlet__body">
                <div className="list-header row justify-content-end">
                  <button type="button" className="btn btn-primary create-account"
                          onClick={() => customHistory.push("/account/new")}
                  >
                    <i className="fas fa-plus"></i> Tạo tài khoản
                  </button>
                </div>
              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}