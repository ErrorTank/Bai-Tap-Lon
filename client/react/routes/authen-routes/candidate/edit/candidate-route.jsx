import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {FormTabs} from "../../../../common/form-tabs/form-tabs";
import {UserViewCol} from "../../../../common/user-view-col/user-view-col";
import {customHistory} from "../../../routes";
import {userInfo} from "../../../../../common/states/user-info";
import {userApi} from "../../../../../api/common/user-api";
import {toDefaultRoute} from "../../../route-type";
import classnames from "classnames"
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {KComponent} from "../../../../common/k-component";
import pick from "lodash/pick"
import isEqual from "lodash/isEqual"
import {candidateSchema} from "../../schema";
import {CandidateInfoForm} from "../candidate-info-form/candidate-info-form";
import {accountApi} from "../../../../../api/common/account-api";
import {schoolApi} from "../../../../../api/common/school-api";
import {candidateApi} from "../../../../../api/common/candidate-api";



export class CandidateRoute extends KComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.tabs[0],
      loading: true,
      saving: false,
      draft: {},
      err: ""
    };

    this.form = createSimpleForm(candidateSchema);
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {role, sID} = userInfo.getState();
    let {candidateID} = props.match.params;
    if(role === 2){

      schoolApi.checkCandidate(candidateID, sID).then(() => {
        this.fetchCandidateInfo(candidateID);
      }).catch(err => customHistory.push(toDefaultRoute()))

    }else{
      this.fetchCandidateInfo(candidateID);
    }

  };

  fetchCandidateInfo = (cID) => {
    candidateApi.get(cID).then((candidate) => {
      this.form.updateData({...candidate}).then(() =>  this.setState({loading: false, draft: {...candidate}}));
    }).catch(err => customHistory.push(toDefaultRoute()))
  };

  componentDidMount(){
    this.form.validateData();
  }

  editCandidate = () => {
    this.setState({saving: true});
    let candidate = this.form.getData();
    candidateApi.update(candidate).then(() => {
      this.setState({draft: {...candidate}, saving: false});
    }).catch(err =>{
      this.setState({err, saving: false});
    })
  };

  tabs = [
    {
      label: "Thông tin cơ bản",
      render: () => (
        <CandidateInfoForm
          form={this.form}
          err={this.state.err}
          onChange={() => this.setState({err: ""})}
          renderNavigate={() => {
            let info = userInfo.getState();
            return  [0, 1].includes(info.role) ? (
              <p onClick={() => customHistory.push(`/account/${this.form.getPathData("accountID")}/edit`)}>Xem thông tin tài khoản</p>

            ) : null
          }}
        />
      )
    },
  ];


  render() {
    let {activeTab, loading, saving, draft, err} = this.state;
    let canSave = !this.form.getInvalidPaths().length && !saving && !isEqual(draft, this.form.getData()) && !err;
    return (
      <PageTitle
        title="Thông tin thí sinh"
      >
        <RouteTitle
          content={"Thông tin thí sinh"}
        >
          <div className="candidate-route">
            {loading ? (
              <div className="loading-wrapper">
                <LoadingInline/>
              </div>
            ) : (
              <div className="row">
                <div className="col-xl-3 col-lg-4">
                  <UserViewCol
                    info={draft}
                  />

                </div>
                <div className="col-xl-9 col-lg-8">
                  <FormTabs
                    tabs={this.tabs}
                    activeTab={activeTab}
                    onChangeTab={tab => this.setState({activeTab: tab})}
                    renderActions={() => (
                      <div className="row justify-content-end c-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/candidates")}>Hủy bỏ</button>
                        <button type="button"
                                className="btn btn-primary"
                                disabled={!canSave}
                                onClick={this.editCandidate}
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