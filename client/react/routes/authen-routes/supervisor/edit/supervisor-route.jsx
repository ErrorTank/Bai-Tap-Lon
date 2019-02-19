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
import isEqual from "lodash/isEqual"
import {supervisorSchema} from "../../schema";
import {supervisorApi} from "../../../../../api/common/supervisor-api";
import {SupervisorInfoForm} from "../supervisor-info-form/supervisor-info-form";
import {appModal} from "../../../../common/modal/modals";


export class SupervisorRoute extends KComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.tabs[0],
      loading: true,
      saving: false,
      draft: {},
      err: "",
      deleting: false
    };

    this.form = createSimpleForm(supervisorSchema);
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {supervisorID} = props.match.params;
    if(supervisorID ){

      this.fetchSupervisor(supervisorID)
    }else{
      customHistory.push(toDefaultRoute());
    }

  };

  fetchSupervisor = (supervisorID) => {
    supervisorApi.get(supervisorID).then(data => {
      let info = pick(data, ["supervisorID", "name", "address", "phone", "email"]);
      this.form.updateData({...info}).then(() =>  this.setState({loading: false, draft: {...info}}));
    }).catch(err => customHistory.push(toDefaultRoute()))
  };

  componentDidMount(){
    this.form.validateData();
  }

  editSupervisor = () => {
    this.setState({saving: true});
    let supervisor = this.form.getData();

    supervisorApi.update(supervisor).then(() => {

      this.setState({draft: {...supervisor}, saving: false});
    }).catch(err =>{
      this.setState({err, saving: false});
    })
  };

  deleteSupervisor = () => {
    let {supervisorID} = this.props.match.params;
    this.setState({deleting: true});
    appModal.confirm({
      title: "Xác nhận",
      text: "Bạn có muốn xóa giám thị này?",
      btnText: "Đồng ý",
      cancelText: "Hủy bỏ"
    }).then((result) => {
      if (result) {

        supervisorApi.delete(supervisorID).then(() => {

          customHistory.push("/supervisors");

        }).catch(err => {

          this.setState({err, deleting: false})
        })
      }else{
        this.setState({deleting: false});
      }
    });


  };

  tabs = [
    {
      label: "Thông tin cơ bản",
      render: () => (
        <SupervisorInfoForm
          form={this.form}
          err={this.state.err}
          onChange={() => this.setState({err: ""})}
        />
      )
    },
  ];


  render() {
    let {activeTab, loading, saving, draft, err, deleting} = this.state;
    console.log(this.form.getData())
    console.log(draft)
    console.log(this.form.getInvalidPaths())
    console.log(saving)
    console.log(err)

    let canSave = !this.form.getInvalidPaths().length && !saving && !isEqual(draft, this.form.getData()) && !err;
    console.log(canSave)
    return (
      <PageTitle
        title="Thông tin giám thị"
      >
        <RouteTitle
          content={"Thông tin giám thị"}
        >
          <div className="supervisor-route">
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
                      <div className="row justify-content-end s-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/supervisors")}>Hủy bỏ</button>
                        <button type="button" className="btn btn-danger" onClick={this.deleteSupervisor} disabled={deleting}>
                          {deleting && (
                            <LoadingInline/>
                          )}
                          Xóa giám thị
                        </button>
                        <button type="button"
                                className="btn btn-primary"
                                disabled={!canSave}
                                onClick={this.editSupervisor}
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