import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {KComponent} from "../../../../common/k-component";
import * as yup from "yup";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {prizeSchema} from "../../schema";
import {userInfo} from "../../../../../common/states/user-info";
import {customHistory} from "../../../routes";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {MultipleStepsTabs} from "../../../../common/multiple-steps-tabs/multiple-steps-tabs";
import isEqual from "lodash/isEqual";
import {PrizeInfoForm} from "../prize-info-form/prize-info-form";
import {prizeApi} from "../../../../../api/common/prize-api";


export class PrizeNewRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      activeTab: 0,
      saving: false,
      loading: false
    };
    this.form = createSimpleForm(prizeSchema, {
      initData: {
        name: "",
        content: "",
        dir: []
      }
    });
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.form.validateData();
  };

  createNewPrize = () => {
    this.setState({saving: true});
    let info = this.form.getData();
    console.log({
      info
    });
    let newData = {...info};
    if(info.dir.length){
      newData.dir = newData.dir.map(each => {
        return each.file;
      })
    }
    prizeApi.createPrize(newData).then(({prizeID}) => {
      customHistory.push(`/prize/${prizeID}/edit`)
    }).catch(err => this.setState({err, saving: false}));

  };


  steps = [
    {
      step: 0,
      label: "Thiết lập giải thưởng",
      render: () => (
        <div className="row justify-content-center">
          <div className="col-12  ">
            <PrizeInfoForm
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
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/prizes")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={this.createNewPrize}
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
    console.log(this.form.getData())
    return (
      <PageTitle title="Tạo giải thưởng mới">
        <RouteTitle content="Tạo giải thưởng mới">
          <div className="prize-new-route">
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