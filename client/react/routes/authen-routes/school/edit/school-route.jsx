import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {FormTabs} from "../../../../common/form-tabs/form-tabs";
import {UserViewCol} from "../../../../common/user-view-col/user-view-col";
import {customHistory} from "../../../routes";
import {userInfo} from "../../../../../common/states/user-info";
import {toDefaultRoute} from "../../../route-type";
import classnames from "classnames"
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {KComponent} from "../../../../common/k-component";
import pick from "lodash/pick"
import sortBy from "lodash/sortBy"
import isEqual from "lodash/isEqual"
import {schoolSchema} from "../../schema";
import {schoolApi} from "../../../../../api/common/school-api";
import {SchoolInfoForm} from "../school-info-form/school-info-form";
import {candidateApi} from "../../../../../api/common/candidate-api";
import {CandidateListTab} from "./candidate-list-tab/candidate-list-tab";
import {appModal} from "../../../../common/modal/modals";
import {userApi} from "../../../../../api/common/user-api";
import {schoolPresenterApi} from "../../../../../api/common/school-presenter-api";
import {accountApi} from "../../../../../api/common/account-api";
import {authenCache} from "../../../../../common/cache/authen-cache";


export class SchoolRoute extends KComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      loading: true,
      saving: false,
      draft: {},
      err: "",
      deleting: false
      // candidates: [],
      // canDraft: []
    };

    this.form = createSimpleForm(schoolSchema);
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {sID, role} = userInfo.getState();
    let {schoolID: alternateSID} = props.match.params;

    if (alternateSID && ((role === 2 && sID === alternateSID) || role !== 2)) {

      this.fetchSchool(alternateSID);


    } else {

      customHistory.push(toDefaultRoute());
    }

  };

  fetchSchool = (sID) => {
    // let promises = [schoolApi.get(sID), candidateApi.getCandidateBrief({filter: {sID}})];

    schoolApi.get(sID).then((data) => {
      let info = pick(data, ["name", "address", "phone", "email", "sID"]);
      this.form.updateData({...info}).then(() => this.setState({
        loading: false,
        draft: {...info},
        // candidates: [...candidates],
        // canDraft: [...candidates]
      }));
    }).catch(err => customHistory.push(toDefaultRoute()))
  };

  componentDidMount() {
    this.form.validateData();
  }

  editSchool = () => {
    this.setState({saving: true});
    // let {candidates, canDraft} = this.state;
    let school = this.form.getData();
    let state = userInfo.getState();
    // let promises = [
    //   schoolApi.update(school),
    //   candidateApi.updateMultiple(candidates.filter(each => {
    //     let root = canDraft.find((r) => r.cID === each.cID);
    //     return !isEqual(root, each);
    //   }))
    // ];
    schoolApi.update(school).then(() => {
      // this.setState({draft: {...school}, saving: false, canDraft: [...candidates]});
      this.setState({draft: {...school}, saving: false});
      if (state.role === 2 && school.sID === state.sID) {
        userInfo.setState(Object.assign({}, state, {...school}));
      }
    }).catch(err => {
      this.setState({err, saving: false});
    })
  };

  deleteSchool = () => {
    let {schoolID} = this.props.match.params;
    this.setState({deleting: true});

    Promise.all([candidateApi.getCandidateBrief({filter: {school: {value: schoolID}}}), schoolPresenterApi.getSpBrief({filter: {school: {value: schoolID}}})]).then(([result1, result2]) => {
      if(!result1.total && !result2.total){
        appModal.confirm({
          title: "Xác nhận",
          text: "Bạn có muốn xóa trường này?",
          btnText: "Đồng ý",
          cancelText: "Hủy bỏ"
        }).then((result) => {
          if (result) {
            schoolApi.delete(schoolID).then(() => {
              customHistory.push("/schools");

            }).catch(err => this.setState({err, deleting: false}))
          }else{
            this.setState({deleting: false});
          }
        });
      }else{
        appModal.alert({
          title: "Thông báo",
          text: `Hãy xóa hết các đại diện hoặc thí sinh của trường trước khi xóa trường!`,
        }).then(() => this.setState({deleting: false}));

      }
    }).catch((err) => this.setState({err, deleting: false}));


  };

  tabs = [
    {
      label: "Thông tin cơ bản",
      render: () => (
        <SchoolInfoForm
          form={this.form}
          err={this.state.err}
          onChange={() => this.setState({err: ""})}
        />
      )
    },
    // {
    //   label: "Danh sách thí sinh",
    //   render: () => (
    //     <CandidateListTab
    //       list={this.state.candidates}
    //       onChange={candidates => this.setState({candidates})}
    //     />
    //   )
    //
    // }
  ];


  render() {
    // let {activeTab, loading, saving, draft, err, candidates, canDraft} = this.state;
    let {activeTab, loading, saving, draft, err, deleting} = this.state;
    // let canSave = !this.form.getInvalidPaths().length && !saving && !isEqual(draft, this.form.getData()) && !err && !isEqual(sortBy(candidates), sortBy(canDraft));
    let canSave = !this.form.getInvalidPaths().length && !saving && !isEqual(draft, this.form.getData()) && !err;
    return (
      <PageTitle
        title="Thông tin trường"
      >
        <RouteTitle
          content={"Thông tin trường"}
        >
          <div className="school-route">
            {loading ? (
              <div className="loading-wrapper">
                <LoadingInline/>
              </div>
            ) : (
              <div className="row">
                <div className="col-12">
                  <FormTabs
                    tabs={this.tabs}
                    activeTab={this.tabs[activeTab]}
                    onChangeTab={(tab, index) => this.setState({activeTab: index})}
                    renderActions={() => (
                      <div className="row justify-content-end school-actions">
                        <button type="button" className="btn btn-secondary"
                                onClick={() => customHistory.push("/schools")}>Hủy bỏ
                        </button>
                        {userInfo.getState().role !== 2 && (
                          <button type="button" className="btn btn-danger" onClick={this.deleteSchool} disabled={deleting}>
                            {deleting && (
                              <LoadingInline/>
                            )}
                            Xóa trường
                          </button>
                        )

                        }

                        <button type="button"
                                className="btn btn-primary"
                                disabled={!canSave}
                                onClick={this.editSchool}
                        >
                          {saving && (
                            <LoadingInline/>
                          )}
                          Lưu thay đổi

                        </button>
                      </div>
                    )}
                  />

                </div>
              </div>
            )

            }


          </div>
        </RouteTitle>

      </PageTitle>
    );
  }
}