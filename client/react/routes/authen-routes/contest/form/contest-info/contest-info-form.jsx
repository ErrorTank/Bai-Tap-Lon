import React from "react";
import {KComponent} from "../../../../../common/k-component";
import {LoadingInline} from "../../../../../common/loading-inline/loading-inline";
import {orgLocationsBriefCache, subjectsBriefCache} from "../../../../../../common/api-cache/common-cache";
import {InputBase} from "../../../../../common/base-input/base-input";
import {Select} from "../../../../../common/select/select";


export class ContestInfoForm extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orgLocations: [],
      subjects: []
    };
    Promise.all([orgLocationsBriefCache.get(), subjectsBriefCache.get()]).then(([orgLocations, subjects]) => {
      this.setState({orgLocations, subjects, loading: false})
    })

  };


  render() {
    let {form, err, onChange: propsOnChange, renderNavigate = () => null} = this.props;
    return (
      <div className="contest-info-form">
        {this.state.loading ? (
          <LoadingInline/>
        ) : (
          <div className="m-form m-form--fit m-form--label-align-right m-form--state">
            {err && (
              <div className="row">
                <div className="server-error pb-3 col">
                  <p>
                    Đã có lỗi xảy ra!
                  </p>

                </div>
              </div>
            )

            }

            <div className="row ">
              <div className="col-6">
                {form.enhanceComponent("name", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="con-input pt-0"
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
                    className="contest-input pt-0"
                    options={this.state.schools}
                    value={value}
                    displayAs={(each) => each.name + " (" + each.address + ")"}
                    getValue={each => each.sID}
                    onChange={e => {
                      propsOnChange();
                      onChange(e.target.value)
                    }}
                    label={"Học trường"}
                    placeholder="Chọn trường"
                  />

                ), true)}

              </div>

            </div>
            <div className="row">
              <div className="col-6">
                {form.enhanceComponent("address", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="contest-input pt-0"
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
                    className="contest-input pt-0"
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
                    className="contest-input pt-0"
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
                    className="contest-input pt-0"
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
              <div className="col-6">

                {form.enhanceComponent("gender", ({value, onChange}) => (
                  <Select
                    className="contest-input pt-0"
                    options={[{label: "Nam", value: 0}, {label: "Nữ", value: 1}]}
                    value={value}
                    onChange={e => {
                      propsOnChange();
                      onChange(Number(e.target.value))
                    }}
                    label={"Giới tính"}
                    placeholder="Chọn giới tính"
                  />

                ), true)}

              </div>
              <div className="col-6">
                {form.enhanceComponent("dob", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="contest-input pt-0"
                    error={error}
                    id={"dob"}
                    onKeyDown={onEnter}
                    onChange={e => {
                      propsOnChange();
                      onChange(e);
                    }}
                    type={"date"}
                    label={"Ngày sinh"}
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