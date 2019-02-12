import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {FormTabs} from "../../../../common/form-tabs/form-tabs";
import {customHistory} from "../../../routes";
import {userInfo} from "../../../../../common/states/user-info";
import {userApi} from "../../../../../api/common/user-api";
import {toDefaultRoute} from "../../../route-type";
import classnames from "classnames"
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import * as yup from "yup";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {KComponent} from "../../../../common/k-component";
import pick from "lodash/pick"
import isEqual from "lodash/isEqual"
import {accountApi} from "../../../../../api/common/account-api";
import {AccountInfoForm} from "./account-info-form/account-info-form";
import {schoolApi} from "../../../../../api/common/school-api";
import {candidateApi} from "../../../../../api/common/candidate-api";
import omit from "lodash/omit"
import {accountSchema} from "../../schema";
import {authenCache} from "../../../../../common/cache/authen-cache";
import {schoolPresenterApi} from "../../../../../api/common/school-presenter-api";


export class AccountRoute extends KComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.tabs[0],
      loading: true,
      saving: false,
      draft: {},
      inf: {},
      err: ""
    };

    this.form = createSimpleForm(accountSchema);

    this.onUnmount(this.form.on("enter", () => this.editAccount()));
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {role} = userInfo.getState();
    accountApi.checkAccountIDInUser({role, accountID: props.match.params.accountID}).then((data) => {
      let info = pick(data, ["username", "password", "role", "canLogin", "accountID"]);
      this.fetchRefInfo(info.role, info.accountID).then(inf => {
        this.form.updateData({...info}).then(() =>  this.setState({inf, loading: false, draft: {...info}}));
      });

    }).catch(err => customHistory.push(toDefaultRoute()));

  };

  componentDidMount(){
    this.form.validateData();
  };

  fetchRefInfo = async (role, accountID) => {

    let matcher = {
      0: async () => {
        return await userApi.getUserByAccountID(accountID);
      },
      1: async () => {
        return await userApi.getUserByAccountID(accountID);
      },
      2: async () => {
        return await schoolPresenterApi.getSpByAccountID(accountID);
      },
      3: async () => {
        return await candidateApi.getCandidateByAccountID(accountID);
      },
    };

    return this.state.inf.role === role ? this.state.inf : await matcher[role]();
  };

  getNavigateInfo = (cb) => {
    let {inf: info, draft} = this.state;

    let matcher = {
      0: {
        url: `/user/${info.userID}/edit`,
        text: "Xem thông tin admin"
      },
      1: {
        url: `/user/${info.userID}/edit`,
        text: "Xem thông tin người dùng"
      },
      2: {
        url: `/sp/${info.spID}/edit`,
        text: "Xem thông tin trường"
      },
      3: {
        url: `/candidate/${info.cID}/edit`,
        text: "Xem thông tin thí sinh"
      },
    };

    return cb(matcher[draft.role])
  };



  editAccount = () => {
    this.setState({saving: true});
    let account = this.form.getData();
    let state = userInfo.getState();
    let promises = [accountApi.update(account), this.fetchRefInfo(account.role, account.accountID)];
    Promise.all(promises).then(([ack, inf]) => {
      this.setState({draft: {...account}, saving: false, inf});
      if(account.accountID === state.accountID){
        if(!account.canLogin){
          userInfo.setState(null);
          authenCache.clearAuthen();
          customHistory.push("/login")
        }
        else if(account.role !== 0){
          userInfo.setState(Object.assign({}, state, {...omit(account, "password"), role: Number(account.role)}));
          customHistory.push(toDefaultRoute())
        }
      }
    }).catch(err =>{
      this.setState({err, saving: false});
    })
  };

  tabs = [
    {
      label: "Thông tin cơ bản",
      render: () => (
        <AccountInfoForm
          form={this.form}
          onChange={() => this.setState({err: ""})}
          err={this.state.err}
          renderNavigate={() => {
            let state = userInfo.getState();
            return (state.role === 0 || (state.role === 1 && ![0, 1].includes(this.state.draft.role))) ? this.getNavigateInfo(({url, text}) => (
              <p onClick={() => customHistory.push(url)}>{text}</p>
            )) : null
          }}
        />
      )
    },
  ];


  render() {
    let {activeTab, loading, saving, draft} = this.state;
    let canSave = !this.form.getInvalidPaths().length && !saving && !isEqual(draft, this.form.getData());
    return (
      <PageTitle
        title="Thông tin tài khoản"
      >
        <RouteTitle
          content={"Thông tin tài khoản"}
        >
          <div className="account-route">
            {loading ? (
              <div className="loading-wrapper">
                <LoadingInline/>
              </div>
            ) : (
              <div className="row justify-content-center">
                <div className="col-6">
                  <FormTabs
                    tabs={this.tabs}
                    activeTab={activeTab}
                    onChangeTab={tab => this.setState({activeTab: tab})}
                    renderActions={() => (
                      <div className="row justify-content-end a-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => customHistory.goBack()}>Hủy bỏ</button>
                        <button type="button"
                                className="btn btn-primary"
                                disabled={!canSave}
                                onClick={this.editAccount}
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