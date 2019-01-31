import React from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {GetLocation} from "../../../common/location-tracker";
import {InputBase} from "../../../common/base-input/base-input";
import {createSimpleForm} from "../../../common/form-validator/form-validator"
import * as yup from "yup"
import {KComponent} from "../../../common/k-component";

const loginSchema = yup.object().shape({
  username: yup.string().
  min(6, "Tên đăng nhập lớn hơn 6 kí tự").
  max(20, "Tên đăng nhập nhỏ hơn 20 kí tự").
  onlyWord("Tên đăng nhập không được có kí tự đặc biệt").
  haveChar("Tên đăng nhập phải có kí tự alphabet").
  haveNumber("Tên đăng nhập phải có chữ số"),
  password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt")
});

export class Login extends KComponent {
  constructor(props) {
    super(props);
    this.form = createSimpleForm(loginSchema, {
      initData: {
        username: "",
        password: ""
      }
    });
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
  };

  render() {
    const canLogin = this.form.getInvalidPaths().length;
    return (
      <PageTitle
        title="Đăng Nhập"
      >
        <GetLocation
          render={(prevLocation) => {
            console.log(prevLocation);
            return (
              <div className="login-route">
                <div className="login-panel-wrap">
                  <div className="login-panel m-form m-form--state">
                    <div className="panel-header">
                      <div className="app-logo">
                        <img src="./assets/img/Framelogo.svg"/>
                      </div>
                    </div>
                    <div className="panel-body">
                      {this.form.enhanceComponent("username", ({error, ...others}) => (
                        <InputBase
                          className="login-input"
                          error={error}
                          id={"username"}
                          type={"text"}
                          label={"Tên đăng nhập"}
                          {...others}
                        />
                      ), true)}
                      {this.form.enhanceComponent("password", ({error, ...others}) => (
                        <InputBase
                          className="login-input"
                          error={error}
                          id={"password"}
                          type={"password"}
                          label={"Mật khẩu"}
                          {...others}
                        />
                      ), true)}
                    </div>
                    <div className="panel-footer">
                      <button type="button" className="btn btn-info" disabled={!canLogin}>Đăng nhập</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }}
        />
      </PageTitle>
    );
  }
}
