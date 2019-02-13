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

import {accountApi} from "../../../../../api/common/account-api";
import {schoolApi} from "../../../../../api/common/school-api";
import {SchoolPresenterInfoForm} from "../school-presenter-info-form/school-presenter-info-form";
import {schoolPresenterSchema} from "../../schema";
import {schoolPresenterApi} from "../../../../../api/common/school-presenter-api";


export class SchoolPresenterRoute extends KComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.tabs[0],
      loading: true,
      saving: false,
      draft: {},
      err: ""
    };

    this.form = createSimpleForm(schoolPresenterSchema);
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {spID} = props.match.params;
    this.fetchSpInfo(spID);

  };

  fetchSpInfo = (spID) => {
    schoolPresenterApi.get(spID).then((sp) => {
      this.form.updateData({...sp}).then(() =>  this.setState({loading: false, draft: {...sp}}));
    }).catch(err => customHistory.push(toDefaultRoute()))
  };

  componentDidMount(){
    this.form.validateData();
  }

  editSp = () => {
    this.setState({saving: true});
    let sp = this.form.getData();
    schoolPresenterApi.update(sp).then(() => {
      this.setState({draft: {...sp}, saving: false});
    }).catch(err =>{
      this.setState({err, saving: false});
    })
  };

  tabs = [
    {
      label: "Thông tin cơ bản",
      render: () => (
        <SchoolPresenterInfoForm
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
        title="Thông tin Đại diện trường"
      >
        <RouteTitle
          content={"Thông tin Đại diện trường"}
        >
          <div className="sp-route">
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
                      <div className="row justify-content-end sp-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/school-presenters")}>Hủy bỏ</button>
                        <button type="button"
                                className="btn btn-primary"
                                disabled={!canSave}
                                onClick={this.editSp}
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