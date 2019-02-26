import React, {Fragment} from "react";
import {InputBase} from "../../../../common/base-input/base-input";
import {KComponent} from "../../../../common/k-component";
import {Select} from "../../../../common/select/select";
import {candidateApi} from "../../../../../api/common/candidate-api";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {contestApi} from "../../../../../api/common/contest-api";




export class ResultInfoForm extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      candidates: [],
      contests: []
    };



    contestApi.getContestsBrief().then(contests => {
      this.setState({contests, loading: false})


    })

  };



  generateError =() => {
    let {err, form} = this.props;
    let {email} = form.getData();
    let msg = {
      "email_existed": `Email ${email} đã tồn tại!`
    };
    return (err.hasOwnProperty("message") && msg.hasOwnProperty(err.message))  ?  msg[err.message] : "Đã có lỗi xảy ra!";
  };

  render() {
    let {form, err, onChange: propsOnChange, renderNavigate = () => null} = this.props;
    return (
      <div className="result-info-form">
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

          {this.state.loading ? (
            <LoadingInline/>
          ) : (
            <Fragment>
              <div className="row ">
                <div className="col-6">
                  {form.enhanceComponent("contestID", ({error, onEnter, onChange, value, ...others}) => (
                    <Select
                      className="s-input pt-0"
                      options={this.state.contests}
                      value={value}
                      displayAs={(each) => each.contestName}
                      getValue={each => each.contestID}
                      onChange={e => {
                        candidateApi.getCandidatesByContestID(e.target.value).then(candidates => {
                          this.setState({loading: false, candidates});
                        });
                        onChange(e.target.value)
                      }}
                      label={"Kì thi"}
                      placeholder="Chọn kì thi"
                    />
                  ), true)}
                </div>
                <div className="col-6">

                  {form.getPathData("contestID") && form.enhanceComponent("cID", ({error, onEnter, onChange , value, ...others}) => (
                    <Select
                      className="s-input pt-0"
                      options={this.state.candidates}
                      value={value}
                      displayAs={(each) => each.name + ` (${each.SBD})`}
                      getValue={each => each.contestID}
                      onChange={e => {
                        propsOnChange();
                        onChange(e.target.value)
                      }}
                      label={"Thí sinh"}
                      placeholder="Chọn thí sinh"
                    />
                  ), true)}

                </div>

              </div>
              <div className="row">
                <div className="col-6">
                  {form.enhanceComponent("mark", ({error, onEnter, onChange, ...others}) => (
                    <InputBase
                      className="s-input pt-0"
                      error={error}
                      id={"mark"}
                      onKeyDown={onEnter}
                      onChange={e => {
                        propsOnChange();
                        onChange(e);
                      }}
                      type={"number"}
                      label={"Điểm thi"}
                      {...others}
                    />
                  ), true)}
                </div>

              </div>
            </Fragment>
          )

          }




        </div>

      </div>
    );
  }
}