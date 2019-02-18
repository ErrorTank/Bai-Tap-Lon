import React, {Fragment} from "react";
import {PageTitle} from "../../../common/page-title/page-title";
import {GetLocation} from "../../../common/location-tracker";
import {InputBase} from "../../../common/base-input/base-input";
import {createSimpleForm} from "../../../common/form-validator/form-validator"
import * as yup from "yup"
import {KComponent} from "../../../common/k-component";
import {Registration} from "../../../layout/registration/registration";
import {customHistory} from "../../routes";
import {LoadingInline} from "../../../common/loading-inline/loading-inline";
import {authenticationApi} from "../../../../api/common/authen-api";
import {userInfo} from "../../../../common/states/user-info";
import {authenCache} from "../../../../common/cache/authen-cache";
import {toDefaultRoute} from "../../route-type";
import {parseQueryString} from "../../../../common/string-utils";

const loginSchema = yup.object().shape({
  username: yup.string().min(6, "Tên đăng nhập lớn hơn 6 kí tự").max(20, "Tên đăng nhập nhỏ hơn 20 kí tự").onlyWord("Tên đăng nhập không được có kí tự đặc biệt").haveChar("Tên đăng nhập phải có kí tự alphabet").haveNumber("Tên đăng nhập phải có chữ số"),
  password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt")
});

const loginErrs = {
  "not_existed": "Tài khoản không tồn tại, vui lòng đăng nhập lại.",
  "password_wrong": "Sai mật khẩu, vui lòng đăng nhập lại hoặc đổi mật khẩu mới.",
  "token_expired": "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.",
  "cannot_login": "Tài khoản này không được phép đăng nhập."
};

let getExternalError = (err) => {
  console.log(err);

  if(loginErrs.hasOwnProperty(err)){
    return loginErrs[err];
  }
  return "Đã có lỗi xảy ra, vui lòng thử lại sau."
};

let getError = (search) => {
  let params = parseQueryString(search);
  return params.hasOwnProperty("error") ? loginErrs.hasOwnProperty(params.error) ? getExternalError(params.error) : "" : "";
};

export class Login extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: getError(props.location.search),
      loading: false
    };

    this.form = createSimpleForm(loginSchema, {
      initData: {
        username: "",
        password: ""
      }
    });
    this.onUnmount(this.form.on("enter", () => this.handleLogin()));
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
  };

  componentDidMount() {
    this.form.validateData();
  }



  prepareInstance = (res) => {
    authenCache.setAuthen(res.token, { expires: 7 });
    userInfo.setState({...res.info})
      .then(() => {
        let newRoute = toDefaultRoute();
        console.log(this.prevLocation)
        customHistory.push(this.prevLocation || newRoute);
      })
      .catch(err => console.log(err))
  };

  handleLogin = () => {
    this.setState({loading: true});
    let data = this.form.getData();
    authenticationApi.login(data).then((res) => {
      this.prepareInstance(res);

    }, (err) => {
      this.setState({error: getExternalError(err.message), loading: false});
    })
  };

  render() {
    let canLogin = this.form.getInvalidPaths().length === 0;

    return (
      <PageTitle
        title="Đăng Nhập"
      >
        <GetLocation
          render={(prevLocation) => {
            this.prevLocation = prevLocation;
            return (
              <div className="login-route">
                <Registration
                  serverError={this.state.error}
                  renderBody={() => (
                    <Fragment>
                      {this.form.enhanceComponent("username", ({error, onChange, onEnter,...others}) => (
                        <InputBase
                          className="registration-input pt-0"
                          error={error}
                          id={"username"}
                          onKeyDown={onEnter}
                          type={"text"}
                          label={"Tên đăng nhập"}
                          onChange={e => {

                            this.setState({error: ""});
                            onChange(e);
                          }}
                          {...others}
                        />
                      ), true)}
                      {this.form.enhanceComponent("password", ({error,  onChange, onEnter,  ...others}) => (
                        <InputBase
                          className="registration-input pt-0 pb-0"
                          error={error}
                          id={"password"}
                          type={"password"}
                          onKeyDown={onEnter}
                          onChange={e => {
                            this.setState({error: ""});
                            onChange(e);
                          }}
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
                      <button type="button" className="btn btn-info registration-btn"
                              disabled={!canLogin || this.state.loading}
                              onClick={() => this.handleLogin()}
                      >
                        {this.state.loading ? (
                          <LoadingInline
                            className={"registration-loading"}
                          />
                        ) : "Đăng nhập"

                        }

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
