import React, {Fragment} from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {GetLocation} from "../../../common/location-tracker";
import {InputBase} from "../../../common/base-input/base-input";
import {createSimpleForm} from "../../../common/form-validator/form-validator"
import * as yup from "yup"
import {KComponent} from "../../../common/k-component";
import {Registration} from "../../../layout/registration/registration";
import {customHistory} from "../../routes";

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
    this.state = {
      error: ""
    };
    this.form = createSimpleForm(loginSchema, {
      initData: {
        username: "",
        password: ""
      }
    });
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
  };

  componentDidMount(){
    this.form.validateData();
  }

  render() {
    let canLogin = this.form.getInvalidPaths().length === 0;

    return (
      <PageTitle
        title="Đăng Nhập"
      >
        <GetLocation
          render={(prevLocation) => {
            console.log(prevLocation);
            return (
              <div className="login-route">
                <Registration
                  serverError={this.state.error}
                  renderBody={() => (
                    <Fragment>
                      {this.form.enhanceComponent("username", ({error, ...others}) => (
                        <InputBase
                          className="registration-input"
                          error={error}
                          id={"username"}
                          type={"text"}
                          label={"Tên đăng nhập"}
                          {...others}
                        />
                      ), true)}
                      {this.form.enhanceComponent("password", ({error, ...others}) => (
                        <InputBase
                          className="registration-input pt-0 pb-0"
                          error={error}
                          id={"password"}
                          type={"password"}
                          label={"Mật khẩu"}
                          {...others}
                        />
                      ), true)}
                    </Fragment>
                  )}
                  renderFooter={() => (
                    <Fragment>
                      <div className="forgot-password">
                        <span onClick={() => customHistory.push("/forgot-password")}>Quên mật khẩu?</span>
                      </div>
                      <button type="button" className="btn btn-info" disabled={!canLogin}>Đăng nhập</button>
                    </Fragment>
                  )}
                />
              </div>


            )
          }}
        />
      </PageTitle>
    );
  }
}
