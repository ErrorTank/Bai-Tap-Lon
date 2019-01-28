import React from "react";
import {PageTitle} from "../../common/page-title/page-title";

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
          <h2 className="not-found-title">404 Không Tìm Thấy!</h2>
          <div className="explain">
            <p>Trang bạn tìm "{path}" không tồn tại.</p>
            <p className="redirect">
              Nhấn vào <span>Đây</span> để quay về {isLogin ? "Trang chủ" : "Trang đăng nhập"}
            </p>
          </div>
        </div>
      </PageTitle>
    );
  }
}
