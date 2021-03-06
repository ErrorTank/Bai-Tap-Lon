import React from "react";
import {InputBase} from "../../../../../common/base-input/base-input";
import {KComponent} from "../../../../../common/k-component";
import {Select} from "../../../../../common/select/select";
import {Roles, userInfo} from "../../../../../../common/states/user-info";
import {customHistory} from "../../../../routes";
import {userApi} from "../../../../../../api/common/user-api";
import {SwitchBtn} from "../../../../../common/switch/switch-btn";
import {AppPasswordInput} from "../../../../../common/app-password-input/app-password-input";



export class AccountInfoForm extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

  };



  generateError =() => {
    let {err, form} = this.props;
    let {username} = form.getData();
    let msg = {
      "username_existed": `Tên đăng nhập ${username} đã tồn tại!`
    };
    return  (err.hasOwnProperty("message") && msg.hasOwnProperty(err.message))  ?  msg[err.message] : "Đã có lỗi xảy ra!";
  };

  getRoles = () => {
    let state = userInfo.getState();
    let matcher = {
      0: () => true,
      1: (each) => each.value !== 0 && each.value !== 1
    };
    return Roles.filter(matcher[state.role])
  };

  render() {
    let {form, err, onChange: propsOnChange, renderNavigate = () => null, disabledRole = false} = this.props;
    return (
      <div className="account-info-form">
        <div className="m-form m-form--fit m-form--label-align-right m-form--state">
          {err && (
            <div className="row">
              <div className="server-error pb-3 col">
                <p>
                  {this.generateError()}
                </p>

              </div>
            </div>
          )

          }

          <div className="row justify-content-center form-wrap">
            <div className="col-10 form-field">
              {form.enhanceComponent("username", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="aif-input pt-0"
                  error={error}
                  id={"username1"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  type={"text"}
                  label={"Tên đăng nhập"}
                  {...others}
                />
              ), true)}
            </div>
            <div className="col-10 form-field">
              {form.enhanceComponent("password", ({error, onEnter, onChange, ...others}) => (
                <AppPasswordInput
                  className="aif-input pt-0"
                  error={error}
                  id={"password1"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  label={"Mật khẩu"}
                  {...others}
                />
              ), true)}
            </div>
            <div className="col-10 form-field">

              {form.enhanceComponent("role", ({value, onChange}) => (
                <Select
                  className="aif-input pt-0"
                  disabled={disabledRole}
                  options={this.getRoles()}
                  value={value}
                  onChange={e => {
                    propsOnChange();
                    onChange(Number(e.target.value))
                  }}
                  label={"Role"}
                  placeholder={"Chọn Role"}
                />

              ), true)}

            </div>

            <div className="col-10 form-field">

              {form.enhanceComponent("canLogin", ({value, onChange}) => (
                <SwitchBtn
                  className="aif-input pt-0 mt-4"
                  value={value}
                  onToggle={value => {
                    propsOnChange();
                    onChange(value ? 1: 0)
                  }}
                  label={"Được đăng nhập"}
                />

              ), true)}

            </div>
          </div>

          <div className="row">
            <div className="col optional-nav form-field">
              {renderNavigate()}

            </div>
          </div>



        </div>

      </div>
    );
  }
}