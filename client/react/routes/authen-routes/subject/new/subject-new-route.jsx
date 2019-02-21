import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {KComponent} from "../../../../common/k-component";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {subjectSchema} from "../../schema";

import {customHistory} from "../../../routes";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";

import {MultipleStepsTabs} from "../../../../common/multiple-steps-tabs/multiple-steps-tabs";


import {subjectApi} from "../../../../../api/common/subject-api";
import {SubjectInfoForm} from "../subject-info-form/subject-info-form";


export class SubjectNewRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      activeTab: 0,
      saving: false
    };
    this.form = createSimpleForm(subjectSchema, {
      initData: {
        name: "",
      }
    });


    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.form.validateData();
  };

  createNewSubject = () => {
    this.setState({saving: true});
    let info = this.form.getData();
    console.log({
      info
    });
    subjectApi.create(info).then((result) => {
      customHistory.push(`/subject/${result.subjectID}/edit`)
    }).catch(err => this.setState({err, saving: false}));


  };





  steps = [
    {
      step: 0,
      label: "Thiết lập thông tin",
      render: () => (
        <div className="row justify-content-center">
          <div className="col-12">
            <SubjectInfoForm
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
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/subjects")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={this.createNewSubject}
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
      <PageTitle title="Tạo môn thi mới">
        <RouteTitle content="Tạo môn thi mới">
          <div className="subject-new-route">
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