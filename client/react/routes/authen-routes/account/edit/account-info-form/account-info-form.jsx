import React from "react";
import {InputBase} from "../../../../../common/base-input/base-input";
import {KComponent} from "../../../../../common/k-component";
import {Select} from "../../../../../common/select/select";
import {Roles, userInfo} from "../../../../../../common/states/user-info";
import {customHistory} from "../../../../routes";
import {userApi} from "../../../../../../api/common/user-api";



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
    return msg[err.message];
  };

  render() {
    let {form, err, onChange: propsOnChange, renderNavigate} = this.props;
    let info = userInfo.getState();
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

          <div className="row justify-content-center">
            <div className="col-12">
              {form.enhanceComponent("username", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="aif-input pt-0"
                  error={error}
                  id={"username"}
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
            <div className="col-12">
              {form.enhanceComponent("password", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="aif-input pt-0"
                  error={error}
                  id={"password"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  type={"password"}
                  label={"Mật khẩu"}
                  {...others}
                />
              ), true)}
            </div>
            <div className="col-12">

              {form.enhanceComponent("role", ({value, onChange}) => (
                <Select
                  className="aif-input pt-0"
                  options={Roles}
                  value={value}
                  onChange={e => {
                    propsOnChange();
                    onChange(e.target.value)
                  }}
                  label={"Role"}
                />

              ), true)}

            </div>

          </div>
          {renderNavigate()}

        </div>

      </div>
    );
  }
}