import React, {Fragment} from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {GetLocation} from "../../../common/location-tracker";
import {Registration} from "../../../layout/registration/registration";
import {InputBase} from "../../../common/base-input/base-input";
import {createSimpleForm} from "../../../common/form-validator/form-validator";
import * as yup from "yup";
import {KComponent} from "../../../common/k-component";
import {customHistory} from "../../routes";

export class ForgotPassword extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
    this.form = createSimpleForm(yup.object().shape({
      email: yup.string().email("Email không hợp lệ").required("Email không được để trống")
    }), {
      initData: {
        email: ""
      }
    });
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.onUnmount(this.form.on("enter", () => this.submit()));
  };

  componentDidMount(){
    this.form.validateData();
  }

  submit = () => {
    console.log("dasdsa")
  };

  render() {
    let canLogin = this.form.getInvalidPaths().length === 0;
    return (
      <PageTitle
        title="Quên mật khẩu"
      >
        <GetLocation
          render={(prevLocation) => {
            console.log(prevLocation);
            return (
              <div className="forgot-password-route">
                <Registration
                  renderBody={() => (
                    <Fragment>
                      {this.form.enhanceComponent("email", ({error, onEnter, ...others}) => (
                        <InputBase
                          className="registration-input pt-0 pb-0"
                          error={error}
                          id={"email"}
                          type={"text"}
                          label={"Email"}
                          onKeyDown={onEnter}
                          {...others}
                        />
                      ), true)}
                    </Fragment>
                  )}
                  renderFooter={() => (
                    <Fragment>
                      <div className="back-to-login">
                        <span onClick={() => customHistory.push("/login")}>Trở về đăng nhập</span>
                      </div>
                      <button type="button"
                              className="btn btn-info"
                              disabled={!canLogin}
                              onClick={this.submit}
                      >
                        Xác nhận
                      </button>
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