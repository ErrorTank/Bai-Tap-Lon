import React, {Fragment} from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {GetLocation} from "../../../common/location-tracker";
import {Registration} from "../../../layout/registration/registration";
import {InputBase} from "../../../common/base-input/base-input";
import {createSimpleForm} from "../../../common/form-validator/form-validator";
import * as yup from "yup";
import {KComponent} from "../../../common/k-component";
import {customHistory} from "../../routes";
import {authenticationApi} from "../../../../api/common/authen-api";

export class ForgotPassword extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      changeForm: false
    };
    this.form = createSimpleForm(yup.object().shape({
      email: yup.string().email("Email không hợp lệ").required("Email không được để trống")
    }), {
      initData: {
        email: "",
        password: "",
        retype: ""
      }
    });
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.onUnmount(this.form.on("enter", () => this.submit()));
  };

  componentDidMount() {
    this.form.validateData();
  }

  submit = () => {
    let email = this.form.getPathData("email");
    authenticationApi.forgotPassword().then(() => {

    });
  };

  render() {
    let canSubmit = !this.form.getInvalidPaths().includes("email");
    let canChange = this.form.getInvalidPaths().length === 0;
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
                      {!this.state.changeForm ?
                        this.form.enhanceComponent("email", ({error, onEnter, ...others}) => (
                          <InputBase
                            className="registration-input pt-0 pb-0"
                            error={error}
                            id={"email"}
                            type={"text"}
                            label={"Email"}
                            onKeyDown={onEnter}
                            {...others}
                          />
                        ), true) : (
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
                        )


                      }
                    </Fragment>
                  )}
                  renderFooter={() => (
                    <Fragment>
                      {!this.state.changeForm ? (
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
                      )  :(
                        <Fragment>
                          <div className="back-to-login">
                            <span onClick={() => customHistory.push("/login")}>Gửi lại email</span>
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