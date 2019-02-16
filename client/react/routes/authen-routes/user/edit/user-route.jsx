import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {FormTabs} from "../../../../common/form-tabs/form-tabs";
import {UserViewCol} from "../../../../common/user-view-col/user-view-col";
import {customHistory} from "../../../routes";
import {userInfo} from "../../../../../common/states/user-info";
import {authenCache} from "../../../../../common/cache/authen-cache";
import {userApi} from "../../../../../api/common/user-api";
import {toDefaultRoute} from "../../../route-type";
import classnames from "classnames"
import {UserInfoForm} from "../user-info-form/user-info-form";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import * as yup from "yup";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {KComponent} from "../../../../common/k-component";
import pick from "lodash/pick"
import isEqual from "lodash/isEqual"
import {userSchema} from "../../schema";


export class UserRoute extends KComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.tabs[0],
      loading: true,
      saving: false,
      draft: {},
      err: ""
    };

    this.form = createSimpleForm(userSchema);
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {userID, role} = userInfo.getState();
    let {userID: alternateUserID} = props.match.params;
    if(alternateUserID && ((role === 1 && userID !== alternateUserID) || role !== 1)){
      this.fetchUser(alternateUserID)
    }else{
      customHistory.push(toDefaultRoute());
    }

  };

  fetchUser = (userID) => {
    userApi.get(userID).then(data => {
      let info = pick(data, ["name", "gender", "address", "phone", "email", "CMT", "userID", "employeeID", "accountID"]);
      this.form.updateData({...info}).then(() =>  this.setState({loading: false, draft: {...info}}));
    }).catch(err => customHistory.push(toDefaultRoute()))
  };

  componentDidMount(){
    this.form.validateData();
  }

  editUser = () => {
    this.setState({saving: true});
    let user = this.form.getData();
    let state = userInfo.getState();
    userApi.update(user).then(() => {
      this.setState({draft: {...user}, saving: false});
      if(user.userID === state.userID){
        userInfo.setState(Object.assign({}, state, {...user}));
      }
    }).catch(err =>{
      this.setState({err, saving: false});
    })
  };

  tabs = [
    {
      label: "Thông tin cơ bản",
      render: () => (
        <UserInfoForm
          form={this.form}
          err={this.state.err}
          onChange={() => this.setState({err: ""})}
          renderNavigate={() => {
            let info = userInfo.getState();
            return info.role === 0 ? (
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
        title="Thông tin người dùng"
      >
        <RouteTitle
          content={"Thông tin người dùng"}
        >
          <div className="user-route">
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
                      <div className="row justify-content-end u-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => customHistory.push("/users")}>Hủy bỏ</button>
                        <button type="button"
                                className="btn btn-primary"
                                disabled={!canSave}
                                onClick={this.editUser}
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