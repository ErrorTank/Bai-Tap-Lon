import React from "react";
import {KComponent} from "../../../../../common/k-component";
import {LoadingInline} from "../../../../../common/loading-inline/loading-inline";
import {orgLocationsBriefCache, subjectsBriefCache} from "../../../../../../common/api-cache/common-cache";
import {InputBase} from "../../../../../common/base-input/base-input";
import {Select} from "../../../../../common/select/select";
import {SwitchBtn} from "../../../../../common/switch/switch-btn";
import {orgLocationApi} from "../../../../../../api/common/org-location-api";
import {subjectApi} from "../../../../../../api/common/subject-api";


export class ContestInfoForm extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orgLocations: [],
      subjects: []
    };
    Promise.all([orgLocationApi.getBrief(), subjectApi.getBrief()]).then(([orgLocations, subjects]) => {
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
                {form.enhanceComponent("contestName", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="con-input pt-0"
                    error={error}
                    id={"contestName"}
                    onKeyDown={onEnter}
                    onChange={e => {
                      propsOnChange();
                      onChange(e);
                    }}
                    type={"text"}
                    label={"Tên kì thi "}
                    {...others}
                  />
                ), true)}
              </div>
              <div className="col-6">

                {form.enhanceComponent("subjectID", ({value, onChange}) => (
                  <Select
                    className="con-input pt-0"
                    options={this.state.subjects}
                    value={value}
                    displayAs={(each) => each.name + " (" + each.subjectID + ")"}
                    getValue={each => each.subjectID}
                    onChange={e => {
                      propsOnChange();
                      onChange(e.target.value)
                    }}
                    label={"Môn thi"}
                    placeholder="Chọn môn thi"
                  />

                ), true)}

              </div>

            </div>
            <div className="row">
              <div className="col-6">
                {form.enhanceComponent("fee", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="con-input pt-0"
                    error={error}
                    id={"fee"}
                    onKeyDown={onEnter}
                    onChange={e => {
                      propsOnChange();
                      onChange(Number(e.target.value));
                    }}
                    type={"number"}
                    label={"Phí dự thi"}
                    {...others}
                  />
                ), true)}
              </div>
              <div className="col-6">
                {form.enhanceComponent("orgLocationID", ({error, onEnter, onChange, value, ...others}) => (
                  <Select
                    className="con-input pt-0"
                    options={this.state.orgLocations}
                    value={value}
                    getValue={each => each.orgLocationID}
                    displayAs={each => each.name}
                    onChange={e => {
                      propsOnChange();
                      onChange(e)
                    }}
                    label={"Địa điểm"}
                    placeholder="Chọn địa điểm"
                  />

                ), true)}
              </div>

            </div>
            <div className="row">
              <div className="col-10">
                {form.enhanceComponent("content", ({error, onEnter, onChange, ...others}) => (
                  <InputBase
                    className="con-input pt-0"
                    error={error}
                    inputType={"textarea"}
                    id={"content"}
                    onKeyDown={onEnter}
                    onChange={e => {
                      propsOnChange();
                      onChange(e);
                    }}
                    label={"Mô tả"}
                    {...others}
                  />
                ), true)}
              </div>
            </div>
            <div className="row">
              <div className="col-10">

                {form.enhanceComponent("canSeeResult", ({value, onChange}) => (
                  <SwitchBtn
                    className="con-input pt-0 mt-4"
                    value={value}
                    onToggle={value => {
                      propsOnChange();
                      onChange(value ? 1 : 0)
                    }}
                    label={"Được xem kết quả"}
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