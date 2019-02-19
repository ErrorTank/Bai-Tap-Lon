import React from "react";
import {InputBase} from "../../../../../common/base-input/base-input";





export class OrgLocationInfoForm extends React.Component {
  constructor(props) {
    super(props);


  };



  render() {
    let {form, err, onChange: propsOnChange, renderNavigate = () => null} = this.props;
    return (
      <div className="org-location-info-form">
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
                  className="ol-input pt-0"
                  error={error}
                  id={"name"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  type={"text"}
                  label={"Tên địa điểm"}
                  {...others}
                />
              ), true)}
            </div>
            <div className="col-6">

              {form.enhanceComponent("address", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="ol-input pt-0"
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

          </div>
          <div className="row">
            <div className="col-6">
              {form.enhanceComponent("phone", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="ol-input pt-0"
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


        </div>

      </div>
    );
  }
}