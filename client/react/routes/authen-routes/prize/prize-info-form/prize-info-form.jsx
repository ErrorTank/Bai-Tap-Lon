import React from "react";
import {InputBase} from "../../../../common/base-input/base-input";
import {KComponent} from "../../../../common/k-component";
import {Select} from "../../../../common/select/select";
import {userInfo} from "../../../../../common/states/user-info";
import {customHistory} from "../../../routes";


export class PrizeInfoForm extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
    };

  };


  render() {
    let {form, err, onChange: propsOnChange} = this.props;
    return (
      <div className="prize-info-form">
        <div className="m-form m-form--fit m-form--label-align-right m-form--state">
          {err && (
            <div className="row">
              <div className="server-error pb-3 col">
                <p>
                  Đã có lỗi xảy ra!
                </p>

              </div>
            </div>
          )}

          <div className="row ">
            <div className="col-6">
              {form.enhanceComponent("name", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="p-input pt-0"
                  error={error}
                  id={"name"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  type={"text"}
                  label={"Tên giải"}
                  {...others}
                />
              ), true)}
            </div>
            <div className="col-6">
              {form.enhanceComponent("content", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="p-input pt-0"
                  error={error}
                  id={"content"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  type={"text"}
                  label={"Mô tả"}
                  {...others}
                />
              ), true)}
            </div>

          </div>
          <div className="row">

            <div className="col-10">
              {form.enhanceComponent("dir", ({error, onEnter, onChange, ...others}) => (
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



        </div>

      </div>
    );
  }
}