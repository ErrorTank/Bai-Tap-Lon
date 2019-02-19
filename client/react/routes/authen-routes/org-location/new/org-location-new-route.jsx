import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {KComponent} from "../../../../common/k-component";
import * as yup from "yup";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {orgLocationSchema} from "../../schema";
import {userInfo} from "../../../../../common/states/user-info";
import {customHistory} from "../../../routes";

import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {UserInfoForm} from "../../user/user-info-form/user-info-form";
import {CandidateInfoForm} from "../../candidate/candidate-info-form/candidate-info-form";
import {SchoolPresenterInfoForm} from "../../school-presenter/school-presenter-info-form/school-presenter-info-form";
import {MultipleStepsTabs} from "../../../../common/multiple-steps-tabs/multiple-steps-tabs";
import isEqual from "lodash/isEqual";
import {userApi} from "../../../../../api/common/user-api";
import {schoolPresenterApi} from "../../../../../api/common/school-presenter-api";
import {candidateApi} from "../../../../../api/common/candidate-api";
import {accountApi} from "../../../../../api/common/account-api";
import {OrgLocationInfoForm} from "../form/org-location-info/org-location-info-form";
import {InitialRoomInfoForm} from "../form/initial-room-info/initial-room-info-form";


export class OrgLocationNewRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      activeTab: 0,
      saving: false,
      loading: false
    };
    this.form = createSimpleForm(orgLocationSchema, {
      initData: {
        name: "",
        address: "",
        phone: 1,
        rooms: []
      }
    });


    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    this.form.validateData();
  };

  createNewOrgLocation = () => {
    this.setState({saving: true});
    let account = this.accountForm.getData();
    let info = this.infoForm.getData();
    console.log({
      account,
      info
    });
    let apiMatcher = {
      0: () => {
        return userApi.checkUserExisted({...this.infoForm.getData()})
      },
      1: () => {
        return userApi.checkUserExisted({...this.infoForm.getData()})
      },
      2: () => {
        return schoolPresenterApi.checkSpExisted({...this.infoForm.getData()})
      },
      3: () => {
        return candidateApi.checkCandidateExisted({...this.infoForm.getData()})
      },
    };
    let callApi = apiMatcher[account.role];
    callApi().then(() => {
      console.log("success")
      accountApi.createAccount({account, info}).then(({accountID}) => {
        customHistory.push(`/account/${accountID}/edit`)
      }).catch(err => this.setState({err, saving: false}))
    }).catch(err => this.setState({err, saving: false}));

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
          <div className="col-8">
            <OrgLocationInfoForm
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
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/org-locations")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={this.createNewOrgLocation}
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
          <div className="col-8">
            <InitialRoomInfoForm
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
        let canFinish = !this.infoForm.getInvalidPaths().length && !this.state.err;
        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/org-locations")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={this.createNewOrgLocation}
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
    console.log(this.infoForm.getData())
    return (
      <PageTitle title="Tạo địa điểm tổ chức mới">
        <RouteTitle content="Tạo địa điểm tổ chức mới">
          <div className="org-location-new-route">
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