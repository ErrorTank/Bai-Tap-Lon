import React from "react";
import {InputBase} from "../../../../common/base-input/base-input";
import {KComponent} from "../../../../common/k-component";
import {Select} from "../../../../common/select/select";



export class UserInfoForm extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

  };

  render() {
    let {form} = this.props;
    return (
      <div className="user-info-form">
        <div className="m-form m-form--fit m-form--label-align-right m-form--state">
          <div className="row">
            <div className="emp-id-wrap pb-5 col">
              <div>
                Mã nhân viên: <span className="emp-id"> {form.getPathData("employeeID")}</span>
              </div>

            </div>
          </div>

          <div className="row ">
            <div className="col-6">
              {form.enhanceComponent("name", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="uif-input pt-0"
                  error={error}
                  id={"name"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    this.setState({error: ""});
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
                  onChange={e => onChange(e.target.value)}
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
                    this.setState({error: ""});
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
                    this.setState({error: ""});
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
                    this.setState({error: ""});
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
                    this.setState({error: ""});
                    onChange(e);
                  }}
                  type={"text"}
                  label={"Chứng minh thư"}
                  {...others}
                />
              ), true)}
            </div>

          </div>

        </div>

      </div>
    );
  }
}