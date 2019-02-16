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


export class SchoolRoute extends KComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
      loading: true,
      saving: false,
      draft: {},
      err: "",
      candidates: [],
      canDraft: []
    };

    this.form = createSimpleForm(schoolSchema);
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {sID, role} = userInfo.getState();
    let {sID: alternateSID} = props.match.params;
    if (alternateSID && ((role === 2 && sID !== alternateSID) || role !== 2)) {
      this.fetchSchool(alternateSID);


    } else {
      customHistory.push(toDefaultRoute());
    }

  };

  fetchSchool = (sID) => {
    let promises = [schoolApi.get(sID), candidateApi.getCandidateBrief({filter: {sID}})];

    Promise.all(promises).then(([data, candidates]) => {
      let info = pick(data, ["name", "address", "phone", "email"]);
      this.form.updateData({...info}).then(() => this.setState({
        loading: false,
        draft: {...info},
        candidates: [...candidates],
        canDraft: [...candidates]
      }));
    }).catch(err => customHistory.push(toDefaultRoute()))
  };

  componentDidMount() {
    this.form.validateData();
  }

  editSchool = () => {
    this.setState({saving: true});
    let {candidates, canDraft} = this.state;
    let school = this.form.getData();
    let state = userInfo.getState();
    let promises = [
      schoolApi.update(school),
      candidateApi.updateMultiple(candidates.filter(each => {
        let root = canDraft.find((r) => r.cID === each.cID);
        return !isEqual(root, each);
      }))
    ];
    Promise.all(promises).then(() => {
      this.setState({draft: {...school}, saving: false, canDraft: [...candidates]});
      if (state.role === 2 && school.sID === state.sID) {
        userInfo.setState(Object.assign({}, state, {...school}));
      }
    }).catch(err => {
      this.setState({err, saving: false});
    })
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
    }, {
      label: "Danh sách thí sinh",
      render: () => (
        <CandidateListTab
          list={this.state.candidates}
          onChange={candidates => this.setState({candidates})}
        />
      )

    }
  ];

  deleteSchool = () => {

  };


  render() {
    let {activeTab, loading, saving, draft, err, candidates, canDraft} = this.state;
    let canSave = !this.form.getInvalidPaths().length && !saving && !isEqual(draft, this.form.getData()) && !err && !isEqual(sortBy(candidates), sortBy(canDraft));
    return (
      <PageTitle
        title="Thông tin trường"
      >
        <RouteTitle
          content={"Thông tin trường"}
        >
          <div className="user-route">
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
                      <div className="row justify-content-end u-actions">
                        <button type="button" className="btn btn-secondary"
                                onClick={() => customHistory.push("/school")}>Hủy bỏ
                        </button>
                        <button type="button" className="btn btn-danger" onClick={this.deleteSchool}>Xóa trường</button>
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