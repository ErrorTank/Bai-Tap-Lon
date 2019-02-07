import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {InputBase} from "../../../../common/base-input/base-input";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import * as yup from "yup";
import {KComponent} from "../../../../common/k-component";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {userApi} from "../../../../../api/common/user-api";
import {userInfo} from "../../../../../common/states/user-info";

const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt"),
  password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt").notEqualTo(yup.ref("oldPassword"), "Mật khẩu mới không được trùng mật khẩu cũ"),
  retype: yup.string().equalTo(yup.ref("password"), "Phải trùng với mật khẩu mới")
});

const loginErrs = {
  "wrong_password": "Mật khẩu cũ không chính xác, vui lòng nhập lại.",
};

let getExternalError = (err) => {
  console.log(err);

  if(loginErrs.hasOwnProperty(err)){
    return loginErrs[err];
  }
  return "Đã có lỗi xảy ra, vui lòng thử lại sau."
};

export class ChangePassword extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: ""
    };
    this.form = createSimpleForm(changePasswordSchema, {
      initData: {
        oldPassword: "",
        password: "",
        retype: ""
      },
      validateAll: true
    });
    this.onUnmount(this.form.on("enter", () => this.handleChangePassword()));
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
  };

  handleChangePassword = () => {
    this.setState({loading: true});
    let {accountID} = userInfo.getState();
    let {oldPassword, password} = this.form.getData();
    userApi.changePassword(accountID, {oldPassword, password}).then(() => {
      this.setState({error: "", loading: false});
      return this.form.resetData();
    }, err => {
      this.setState({error: getExternalError(err.message), loading: false})
    })
  };

  componentDidMount() {
    this.form.validateData();
  }

  render() {
    let canSubmit = this.form.getInvalidPaths().length === 0;
    let {error, loading} = this.state;
    return (
      <PageTitle
        title="Đổi mật khẩu"
      >
        <RouteTitle
          content={"Đổi mật khẩu"}
        >
          <div className="change-password-route">
            <div className="row justify-content-center">
              <div className="m-portlet m-portlet--tabs col-6">
                <form className="m-form m-form--fit m-form--label-align-right m-form--state">
                  <div className="m-portlet__body">

                    <div className="form-group m-form__group m--margin-top-10">
                      <div className="alert m-alert m-alert--default">
                        Nhập đẩy đủ các trường dưới đây và bấm vào nút "Đổi mật khẩu".
                      </div>

                    </div>
                    {error && (
                      <div className="err-server">
                        {error}
                      </div>
                    )}
                    {this.form.enhanceComponent("oldPassword", ({error, onEnter, onChange, ...others}) => (
                      <InputBase
                        className="cp-input pt-0"
                        error={error}
                        id={"oldPassword"}
                        onKeyDown={onEnter}
                        onChange={e => {
                          error && this.setState({error: ""});
                          onChange(e);
                        }}
                        type={"password"}
                        label={"Mật khẩu cũ"}
                        {...others}
                      />
                    ), true)}
                    {this.form.enhanceComponent("password", ({error, onEnter, onChange, ...others}) => (
                      <InputBase
                        className="cp-input pt-0"
                        error={error}
                        onChange={e => {
                          error && this.setState({error: ""});
                          onChange(e);
                        }}
                        id={"password"}
                        onKeyDown={onEnter}
                        type={"password"}
                        label={"Mật khẩu mới"}
                        {...others}
                      />
                    ), true)}
                    {this.form.enhanceComponent("retype", ({error, onEnter, onChange, ...others}) => (
                      <InputBase
                        className="cp-input pt-0"
                        error={error}
                        id={"retype"}
                        onKeyDown={onEnter}
                        onChange={e => {
                          error && this.setState({error: ""});
                          onChange(e);
                        }}
                        type={"password"}
                        label={"Nhập lại mật khẩu mới"}
                        {...others}
                      />
                    ), true)}
                    <div className="form-group m-form__group base-input cp-input pt-0">
                      <button type="button" className="btn"
                              disabled={!canSubmit || loading}
                              onClick={() => this.handleChangePassword()}
                      >
                        {loading ? (
                          <LoadingInline
                            className={"cp-loading"}
                          />
                        ) : "Đổi mật khẩu"

                        }

                      </button>
                    </div>

                  </div>
                </form>
              </div>
            </div>

          </div>
        </RouteTitle>

      </PageTitle>
    );
  }
}