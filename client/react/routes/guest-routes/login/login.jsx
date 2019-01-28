import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <PageTitle
        title="Đăng Nhập"
      >
        <div className="login-route">
          LoginRoute
        </div>
      </PageTitle>
    );
  }
}
