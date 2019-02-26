import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {KComponent} from "../../../../common/k-component";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {resultSchema, schoolSchema} from "../../schema";

import {customHistory} from "../../../routes";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";

import {MultipleStepsTabs} from "../../../../common/multiple-steps-tabs/multiple-steps-tabs";


import {resultApi} from "../../../../../api/common/result-api";
import {ResultInfoForm} from "../form/result-form";


export class ResultNewRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      activeTab: 0,
      saving: false
    };
    this.form = createSimpleForm(resultSchema, {
      initData: {
        contestID: "",
        cID: "",
        mark: 0,

      }
    });


    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.form.validateData();
  };

  createNewResult = () => {
    this.setState({saving: true});
    let info = this.form.getData();
    console.log({
      info
    });
    resultApi.create(info).then((result) => {
      customHistory.push(`/result/${result.rID}/edit`)
    }).catch(err => this.setState({err, saving: false}));


  };





  steps = [
    {
      step: 0,
      label: "Thiết lập thông tin",
      render: () => (
        <div className="row justify-content-center">
          <div className="col-12">
            <ResultInfoForm
              form={this.form}
              onChange={() => this.setState({err: ""})}
              err={this.state.err}
            />
          </div>
        </div>


      ),
      renderActions: () => {
        let canFinish = !this.form.getInvalidPaths().length && !this.state.err;

        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/results")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={this.createNewResult}
            >
              Hoàn thành
              {this.state.saving && (
                <LoadingInline/>
              )}
            </button>
          </div>
        )
      }
    }
  ];

  render() {
    let {activeTab} = this.state;
    return (
      <PageTitle title="Tạo Phiếu báo điểm mới">
        <RouteTitle content="Tạo Phiếu báo điểm mới">
          <div className="result-new-route">
            <MultipleStepsTabs
              currentStep={activeTab}
              steps={this.steps}

            />
          </div>
        </RouteTitle>
      </PageTitle>

    );
  }
}