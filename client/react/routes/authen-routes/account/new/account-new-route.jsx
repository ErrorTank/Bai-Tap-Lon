import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {KComponent} from "../../../../common/k-component";
import * as yup from "yup";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {accountSchema, candidateSchema, schoolPresenterSchema, userSchema} from "../../schema";
import {userInfo} from "../../../../../common/states/user-info";
import {customHistory} from "../../../routes";
import {AccountInfoForm} from "../edit/account-info-form/account-info-form";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {UserInfoForm} from "../../user/edit/user-info-form/user-info-form";
import {CandidateInfoForm} from "../../candidate/candidate-info-form/candidate-info-form";
import {SchoolPresenterInfoForm} from "../../school-presenter/school-presenter-info-form/school-presenter-info-form";
import {MultipleStepsTabs} from "../../../../common/multiple-steps-tabs/multiple-steps-tabs";
import isEqual from "lodash/isEqual";


export class AccountNewRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      activeTab: 0,
      saving: false
    };
    this.accountForm = createSimpleForm(accountSchema, {
      initData: {
        username: "",
        password: "",
        canLogin: 1,
        role: ""
      }
    });

    this.infoForm = createSimpleForm();
    this.onUnmount(this.accountForm.on("change", () => this.forceUpdate()));
    this.onUnmount(this.infoForm.on("change", () => this.forceUpdate()));
    this.accountForm.validateData();
  };

  createNewAccount = () => {
    console.log(this.accountForm.getData())
    console.log(this.infoForm.getData())
  };

  renderStep = () => {
    let role = this.accountForm.getPathData("role");

    let matcher = {
      0: () => {


        return (
          <UserInfoForm
            form={this.infoForm}
            err={this.state.err}
            onChange={() => this.setState({err: ""})}
          />
        )
      },
      1: () => {


        return (
          <UserInfoForm
            form={this.infoForm}
            err={this.state.err}
            onChange={() => this.setState({err: ""})}
          />
        )
      },
      2: () => {

        return (
          <SchoolPresenterInfoForm
            form={this.infoForm}
            err={this.state.err}
            onChange={() => this.setState({err: ""})}
          />
        )
      },
      3: () => {

        return (
          <CandidateInfoForm
            form={this.infoForm}
            err={this.state.err}
            onChange={() => this.setState({err: ""})}
          />
        )
      },
    };
    return matcher[role]();
  };

  handleClickLabel = (step) =>{
    let {activeTab: currentStep} = this.state;
    if(step < currentStep){
      this.setState({activeTab: 0}, () => {
        this.infoForm.resetData();
      });
    }
  };
  schemaMatcher = {
    0: {
      schema: userSchema,
      initData: {
        gender: 0
      }
    },
    1: {
      schema: userSchema,
      initData: {
        gender: 0
      }
    },
    2: {
      schema: schoolPresenterSchema,
      initData: {
        sID: ""
      }
    },
    3: {
      schema: candidateSchema,
      initData: {
        sID: "",
        dob: "1990-01-01",
        gender: 0
      }
    },
  };

  prepareInfoForm = () => {
    let {initData, schema} = this.schemaMatcher[this.accountForm.getPathData("role")];
    this.infoForm.setSchema(schema);
    this.infoForm.setInitData(initData);
    this.infoForm.resetData();
  };

  steps = [
    {
      step: 0,
      label: "Thiết lập tài khoản",
      render: () => (
        <div className="row justify-content-center">
          <div className="col-8">
            <AccountInfoForm
              form={this.accountForm}
              onChange={() => this.setState({err: ""})}
              err={this.state.err}
            />
          </div>
        </div>


      ),
      renderActions: () => {
        let canNext = !this.accountForm.getInvalidPaths().length ;
        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/accounts")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canNext}
                    onClick={() => {
                      this.prepareInfoForm();
                      this.setState({activeTab: 1})

                    }}
            >
              Tiếp theo
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        )
      }
    }, {
      step: 1,
      label: "Thông tin cơ bản",
      render: () => this.renderStep(),
      renderActions: () => {
        let canFinish = !this.infoForm.getInvalidPaths().length;
        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/accounts")}>Hủy bỏ
            </button>
            <button type="button" className="btn btn-danger"
                    onClick={() => this.setState({activeTab: 0})}>
              <i className="fas fa-angle-left"></i>
              Trở về
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={this.createNewAccount}
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
      <PageTitle title="Tạo tài khoản mới">
        <RouteTitle content="Tạo tài khoản mới">
          <div className="account-new-route">
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