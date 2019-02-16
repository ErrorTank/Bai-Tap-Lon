import React from "react";
import {KComponent} from "../../../../common/k-component";
import {InputBase} from "../../../../common/base-input/base-input";
import {Select} from "../../../../common/select/select";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {schoolApi} from "../../../../../api/common/school-api";
import {schoolsBriefCache} from "../../../../../common/api-cache/common-cache";


export class SchoolPresenterInfoForm extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      schools: []
    };
    schoolsBriefCache.get().then(schools => this.setState({schools, loading: false}))
  };


  generateError = () => {
    let {err, form} = this.props;
    let {email} = form.getData();
    let msg = {
      "email_existed": `Email ${email} đã tồn tại!`
    };
    return  (err.hasOwnProperty("message") && msg.hasOwnProperty(err.message))  ?  msg[err.message] : "Đã có lỗi xảy ra!";
  };


  render() {
    let {form, err, onChange: propsOnChange, renderNavigate = () => null, blockChangeSchool = false} = this.props;
    return (
      <div className="sp-info-form">
        {this.state.loading ? (
          <LoadingInline/>
        ) : (
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

            <div className="row ">
              <div className="col-6">
                {form.enhanceComponent("name", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="sp-input pt-0"
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

                {form.enhanceComponent("sID", ({value, onChange}) => (
                  <Select
                    className="sp-input pt-0"
                    options={this.state.schools}
                    value={value}
                    alt={(each) => each.name + " (" + each.address + ")"}
                    displayAs={(each) => each.name + " (" + each.address + ")"}
                    getValue={each => each.sID}
                    disabled={blockChangeSchool}
                    onChange={e => {
                      propsOnChange();
                      !blockChangeSchool && onChange(e.target.value)
                    }}
                    label={"Trường đại diện"}
                    placeholder="Chọn trường"
                  />

                ), true)}

              </div>

            </div>
            <div className="row">
              <div className="col-6">
                {form.enhanceComponent("address", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="sp-input pt-0"
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
                    className="sp-input pt-0"
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
                    className="sp-input pt-0"
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

            </div>
            <div className="row">
              <div className="col optional-nav">
                {renderNavigate()}
              </div>
            </div>

          </div>
        )

        }


      </div>
    );
  }
}