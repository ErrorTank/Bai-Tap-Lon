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
import {subjectApi} from "../../../../../api/common/subject-api";
import {ContestExamDate} from "../form/contest-exam-date/contest-exam-date";
import {appModal} from "../../../../common/modal/modals";
import {ExamDateCandidate} from "../form/exam-date-candidate/exam-date-candidate";
import {ExamDateSupervisor} from "../form/exam-date-supervisor/exam-date-supervisor";


export class ContestNewRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      err: "",
      activeTab: 0,
      saving: false,
      loading: false
    };
    this.initData = {
      contestName: "",
      content: "",
      fee: 0,
      canSeeResult: 0,
      examDates: [],
      subjectID: "",
      orgLocationID: "",
      candidates: [],
      supervisors: []
    };
    this.form = createSimpleForm(contestSchema, {
      initData: this.initData
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

  switchTabActions = (step) => {
    let matcher = {
      0: {
        act: () => {
          this.form.resetData({...this.initData});

        },
        label: "Quay trở về bước này sẽ tự động xóa toàn bộ dữ liệu về buổi thi, bạn có muốn tiếp tục?"
      },

    };
    return matcher[step];
  };

  handleBackToFirst = () => {
    let action = this.switchTabActions(0);
    let {act, label } = action;
    appModal.confirm({
      text: label,
      title: "Xác nhận",
      btnText: "Đồng ý",
      cancelText: "Hủy bỏ"
    }).then((result) => {
      if(result){
        act();
        this.setState({activeTab: 0});
      }
    })

  };

  handleClickLabel = (step) => {
    let currentStep = this.state.activeTab;
    if(step < currentStep){
      if(step === 0)
        this.handleBackToFirst();
      else{
        this.setState({activeTab: step});
      }
    }else{
      if(step !== 0 && this.form.getPathData("examDates").length){
        this.setState({activeTab: step});
      }
    }



  };


  nextStep = (step) => {
    let {activeTab} = this.state;
    if(activeTab === 1 && step === -1){
      this.handleBackToFirst();
    }else{
      this.setState({activeTab: this.state.activeTab + step});
    }

    // let subjectID = this.form.getPathData("subjectID");
    // subjectApi.getRoomsBySubjectID(subjectID).then(rooms => {
    //
    // });
  };

  steps = [
    {
      step: 0,
      label: "Thông tin",
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
        let invalids = this.form.getInvalidPaths();
        return (!invalids.length || (invalids.length === 1 && invalids[0] === 'examDates')) && !this.state.err && !this.state.loading;
      },
      renderActions: () => {
        let invalids = this.form.getInvalidPaths();
        let canNext = (!invalids.length || (invalids.length === 1 && invalids[0] === 'examDates')) && !this.state.err && !this.state.loading;
        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/contests")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-success"
                    disabled={!canNext}
                    onClick={() => this.nextStep(1)}
            >
              Tiếp theo
            </button>
          </div>
        )
      }
    }, {
      step: 1,
      label: "Buổi thi",
      render: () => (
        <div className="row justify-content-center">
          <div className="col-12 p-0">
            <ContestExamDate
              form={this.form}
              onChange={() => this.setState({err: ""})}
              err={this.state.err}
            />
          </div>
        </div>


      ),

      renderActions: () => {
        let canNext = this.form.getPathData("examDates").length;
        let canFinish = !this.form.getInvalidPaths().length && !this.state.error && !this.state.saving && !this.state.loading;
        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/contests")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-danger"
                    onClick={() => this.nextStep(-1)}
            >
              Trở về
            </button>
            <button type="button"
                    className="btn btn-success"
                    disabled={!canNext}
                    onClick={() => this.nextStep(1)}
            >
              Tiếp theo
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={() => this.createNewContest()}
            >
              Hoàn thành
            </button>
          </div>
        )
      }
    },{
      step: 2,
      label: "Thí sinh",
      render: () => (
        <div className="row justify-content-center">
          <div className="col-12 p-0">
            <ExamDateCandidate
              form={this.form}
              onChange={() => this.setState({err: ""})}
              err={this.state.err}
            />
          </div>
        </div>


      ),

      renderActions: () => {
        let canNext = true;
        let canFinish = !this.form.getInvalidPaths().length && !this.state.error && !this.state.saving && !this.state.loading;
        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/contests")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-danger"
                    onClick={() => this.nextStep(-1)}
            >
              Trở về
            </button>
            <button type="button"
                    className="btn btn-success"
                    disabled={!canNext}
                    onClick={() => this.nextStep(1)}
            >
              Tiếp theo
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={() => this.createNewContest()}
            >
              Hoàn thành
            </button>
          </div>
        )
      }
    },{
      step: 3,
      label: "Giám thị",
      render: () => (
        <div className="row justify-content-center">
          <div className="col-12 p-0">
            <ExamDateSupervisor
              form={this.form}
              onChange={() => this.setState({err: ""})}
              err={this.state.err}
            />
          </div>
        </div>


      ),

      renderActions: () => {
        let canFinish = !this.form.getInvalidPaths().length && !this.state.error && !this.state.saving && !this.state.loading;
        return (
          <div className="">
            <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/contests")}>Hủy bỏ
            </button>
            <button type="button"
                    className="btn btn-danger"
                    onClick={() => this.nextStep(-1)}
            >
              Trở về
            </button>
            <button type="button"
                    className="btn btn-primary"
                    disabled={!canFinish}
                    onClick={() => this.createNewContest()}
            >
              Hoàn thành
            </button>
          </div>
        )
      }
    },
  ];

  render() {
    let {activeTab} = this.state;
    console.log(this.form.getData())
    return (
      <PageTitle title="Tạo kì thi mới">
        <RouteTitle content="Tạo kì thi mới">
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