import React from "react";
import {PageTitle} from "../../common/page-title/page-title";
import {customHistory} from "../routes";
import {toDefaultRoute} from "../route-type";

export class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {isLogin, path} = this.props;

    return (
      <PageTitle
        title={"Trang không tồn tại"}
      >
        <div className="not-found-page">
          <div className="logo-404-image"><img src="/assets/img/404logo.png" alt="404 Logo Place"/></div>
          <p className="not-found-title">Không Tìm Thấy!</p>
          <div className="explain">
            <p>Trang bạn tìm "{path}" đã bị di chuyển, xóa, đổi tên hoặc chưa từng tồn tại.</p>
            <p className="redirect">
              <span onClick={() => customHistory.push(isLogin ? toDefaultRoute() : "/login")} > {isLogin ? "Trang chủ" : "Trang đăng nhập"} </span>
            </p>
          </div>
        </div>
      </PageTitle>
    );
  }
}
