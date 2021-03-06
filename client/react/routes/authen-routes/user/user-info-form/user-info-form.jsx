import React from "react";
import {InputBase} from "../../../../common/base-input/base-input";
import {KComponent} from "../../../../common/k-component";
import {Select} from "../../../../common/select/select";
import {userInfo} from "../../../../../common/states/user-info";
import {customHistory} from "../../../routes";



export class UserInfoForm extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

  };

  generateError =() => {
    let {err, form} = this.props;
    let {email, CMT, employeeID} = form.getData();
    let msg = {
      "email_existed": `Email ${email} đã tồn tại!`,
      "CMT_existed": `CMT ${CMT} đã tồn tại!`,
      "employeeID_existed": `Mã nhân viên ${employeeID} đã tồn tại!`,
    };
    return (err.hasOwnProperty("message") && msg.hasOwnProperty(err.message))  ?  msg[err.message] : "Đã có lỗi xảy ra!";
  };

  render() {
    let {form, err, onChange: propsOnChange, renderNavigate = () => null, editEmp = false} = this.props;
    return (
      <div className="user-info-form">
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

          {(!editEmp && form.getPathData("employeeID")) && (
            <div className="row">
              <div className="emp-id-wrap pb-5 col">
                <div>
                  Mã nhân viên: <span className="emp-id"> {form.getPathData("employeeID")}</span>
                </div>

              </div>
            </div>
          )

          }
          {editEmp && (
            <div className="row">
              <div className="col-6">
                {form.enhanceComponent("employeeID", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="uif-input pt-0"
                    error={error}
                    id={"employeeID"}
                    onKeyDown={onEnter}
                    onChange={e => {
                      propsOnChange();
                      onChange(e);
                    }}
                    type={"text"}
                    label={"Mã nhân viên"}
                    {...others}
                  />
                ), true)}
              </div>
            </div>
          )}

          <div className="row ">
            <div className="col-6">
              {form.enhanceComponent("name", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="uif-input pt-0"
                  error={error}
                  id={"name"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  type={"text"}
                  label={"Tên đầy đủ"}
                  {...others}
                />
              ), true)}
            </div>
            <div className="col-6">

              {form.enhanceComponent("gender", ({value, onChange}) => (
                <Select
                  className="uif-input pt-0"
                  options={[{label: "Nam", value: 0}, {label: "Nữ", value:1}]}
                  value={value}
                  onChange={e => {
                    propsOnChange();
                    onChange(e.target.value)
                  }}
                  label={"Giới tính"}
                  placeholder="Chọn giới tính"
                />

              ), true)}

            </div>

          </div>
          <div className="row">
            <div className="col-6">
              {form.enhanceComponent("address", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="uif-input pt-0"
                  error={error}
                  id={"address"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  type={"text"}
                  label={"Địa chỉ"}
                  {...others}
                />
              ), true)}
            </div>
            <div className="col-6">
              {form.enhanceComponent("phone", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="uif-input pt-0"
                  error={error}
                  id={"phone"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  type={"text"}
                  label={"Số điện thoại"}
                  {...others}
                />
              ), true)}
            </div>

          </div>
          <div className="row">
            <div className="col-6">
              {form.enhanceComponent("email", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="uif-input pt-0"
                  error={error}
                  id={"email"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  type={"text"}
                  label={"Email"}
                  {...others}
                />
              ), true)}
            </div>
            <div className="col-6">
              {form.enhanceComponent("CMT", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="uif-input pt-0"
                  error={error}
                  id={"cmt"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  type={"text"}
                  label={"Chứng minh thư"}
                  {...others}
                />
              ), true)}
            </div>

          </div>
          <div className="row">
            <div className="col optional-nav">
              {renderNavigate()}
            </div>
          </div>


        </div>

      </div>
    );
  }
}