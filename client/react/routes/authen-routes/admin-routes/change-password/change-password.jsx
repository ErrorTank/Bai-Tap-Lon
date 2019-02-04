import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../common/route-title/route-title";
import {InputBase} from "../../../../common/base-input/base-input";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import * as yup from "yup";

const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt"),
  password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt"),
});

export class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      retype: ""
    };
    this.form = createSimpleForm(changePasswordSchema, {
      initData: {
        oldPassword: "",
        password: ""
      }
    });
    this.onUnmount(this.form.on("enter", () => this.handleChangePassword()));
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
  };

  handleChangePassword = () => {
    console.log("change")
  };

  render() {
    return (
      <PageTitle
        title="Đổi mật khẩu"
      >
        <RouteTitle
          content={"Đổi mật khẩu"}
        >
          <div className="change-password">
            <div className="m-portlet m-portlet--tabs">
              <form className="m-form m-form--fit m-form--label-align-right">
                <div className="m-portlet__body">
                  <div className="form-group m-form__group m--margin-top-10">
                    <div className="alert m-alert m-alert--default">
                      Nhập đẩy đủ các trường dưới đây và bấm vào nút "Đổi mật khẩu".
                    </div>

                  </div>
                  {this.form.enhanceComponent("oldPassword", ({error, onEnter, ...others}) => (
                    <InputBase
                      className="registration-input pt-0"
                      error={error}
                      id={"oldPassword"}
                      onKeyDown={onEnter}
                      type={"password"}
                      label={"Mật khẩu cũ"}
                      {...others}
                    />
                  ), true)}
                  {this.form.enhanceComponent("password", ({error, onEnter, ...others}) => (
                    <InputBase
                      className="registration-input pt-0"
                      error={error}
                      id={"oldPassword"}
                      onKeyDown={onEnter}
                      type={"password"}
                      label={"Mật khẩu cũ"}
                      {...others}
                    />
                  ), true)}
                </div>
              </form>
            </div>
          </div>
        </RouteTitle>

      </PageTitle>
    );
  }
}