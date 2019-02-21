import React from "react";
import {InputBase} from "../../../../common/base-input/base-input";
import {KComponent} from "../../../../common/k-component";
import {Select} from "../../../../common/select/select";




export class SubjectInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

  };


  render() {
    let {form, err, onChange: propsOnChange, renderNavigate = () => null} = this.props;
    return (
      <div className="subject-info-form">
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


          <div className="row justify-content-center">
            <div className="col-6">
              {form.enhanceComponent("name", ({error, onEnter, onChange, ...others}) => (
                <InputBase
                  className="s-input pt-0"
                  error={error}
                  id={"name"}
                  onKeyDown={onEnter}
                  onChange={e => {
                    propsOnChange();
                    onChange(e);
                  }}
                  type={"text"}
                  label={"Tên môn"}
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