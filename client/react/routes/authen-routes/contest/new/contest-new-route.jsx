import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {KComponent} from "../../../../common/k-component";
import omit from "lodash/omit"
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {contestSchema} from "../../schema";
import {customHistory} from "../../../routes";

import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {MultipleStepsTabs} from "../../../../common/multiple-steps-tabs/multiple-steps-tabs";
import {contestApi} from "../../../../../api/common/contest-api";
import {ContestInfoForm} from "../form/contest-info/contest-info-form";


export class ContestNewRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      activeTab: 0,
      saving: false,
      loading: false
    };
    this.form = createSimpleForm(contestSchema, {
      initData: {
        contestName: "",
        content: "",
        fee: 0,
        canSeeResult: 0,
        examDates: []
      }
    });


    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.form.validateData();
  };

  createNewContest = () => {
    this.setState({saving: true});
    let location = this.form.getData();
    console.log({
      location
    });

    contestApi.createContest({...location, rooms: location.rooms.map(each => omit(each, 'keyID'))}).then(({contestID}) => {
      customHistory.push(`/contest/${contestID}/edit`)
    }).catch(err => this.setState({err, saving: false}))

  };


  handleClickLabel = (step) => {
    this.setState({activeTab: step});
  };



  steps = [
    {
      step: 0,
      label: "Thiết lập thông tin",
      render: () => (
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 p-0">
            <ContestInfoForm
              form={this.form}
              onChange={() => this.setState({err: ""})}
              err={this.state.err}
            />
          </div>
        </div>


      ),
      isDone: () => {
        return this.form.isValid();
      },
      renderActions: () => {
        let canFinish = !this.form.getInvalidPaths().length && !this.state.err;
        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/contests")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={this.createNewContest}
            >
              Hoàn thành
              {this.state.saving && (
                <LoadingInline/>
              )}
            </button>
          </div>
        )
      }
    }, {
      step: 1,
      label: "Thiết lập phòng",
      render: () => (
        <div className="row justify-content-center">
          <div className="col-12 p-0">
            <ContestInfoForm
              form={this.form}
              onChange={() => this.setState({err: ""})}
              err={this.state.err}
            />
          </div>
        </div>


      ),
      isDone: () => {
        return this.form.isValid();
      },
      renderActions: () => {
        let canFinish = !this.form.getInvalidPaths().length && !this.state.err;
        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/contests")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={this.createNewContest}
            >
              Hoàn thành
              {this.state.saving && (
                <LoadingInline/>
              )}
            </button>
          </div>
        )
      }
    },
  ];

  render() {
    let {activeTab} = this.state;

    return (
      <PageTitle title="Tạo địa điểm tổ chức mới">
        <RouteTitle content="Tạo địa điểm tổ chức mới">
          <div className="contest-new-route">
            <MultipleStepsTabs
              onClickLabel={this.handleClickLabel}
              currentStep={activeTab}
              steps={this.steps}

            />
          </div>
        </RouteTitle>
      </PageTitle>

    );
  }
}