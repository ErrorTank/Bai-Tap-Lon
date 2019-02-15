import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {KComponent} from "../../../../common/k-component";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {schoolSchema} from "../../schema";

import {customHistory} from "../../../routes";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";

import {MultipleStepsTabs} from "../../../../common/multiple-steps-tabs/multiple-steps-tabs";

import {SchoolInfoForm} from "../edit/school-info-form";
import {schoolApi} from "../../../../../api/common/school-api";


export class SchoolNewRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      activeTab: 0,
      saving: false
    };
    this.form = createSimpleForm(schoolSchema, {
      initData: {
        name: "",
        phone: "",
        email: "",
        address: ""
      }
    });


    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.form.validateData();
  };

  createNewSchool = () => {
    this.setState({saving: true});
    let info = this.form.getData();
    console.log({
      info
    });
    schoolApi.checkSchoolExisted(info).then(()=> {
      schoolApi.create(info).then((result) => {
        customHistory.push(`/school/${result.sID}/edit`)
      }).catch(err => this.setState({err, saving: false}));
    }).catch(err => this.setState({err, saving: false}));


  };





  steps = [
    {
      step: 0,
      label: "Thiết lập thông tin",
      render: () => (
        <div className="row justify-content-center">
          <div className="col-12">
            <SchoolInfoForm
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
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/schools")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={this.createNewSchool}
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
      <PageTitle title="Tạo tài khoản mới">
        <RouteTitle content="Tạo tài khoản mới">
          <div className="school-new-route">
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