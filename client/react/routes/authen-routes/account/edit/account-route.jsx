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
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import * as yup from "yup";
import {createSimpleForm} from "../../../../common/form-validator/form-validator";
import {KComponent} from "../../../../common/k-component";
import pick from "lodash/pick"
import isEqual from "lodash/isEqual"
import {accountApi} from "../../../../../api/common/account-api";
import {AccountInfoForm} from "./account-info-form/account-info-form";

const accountSchema = yup.object().shape({
  username: yup.string().min(6, "Tên đăng nhập lớn hơn 6 kí tự").max(20, "Tên đăng nhập nhỏ hơn 20 kí tự").onlyWord("Tên đăng nhập không được có kí tự đặc biệt").haveChar("Tên đăng nhập phải có kí tự alphabet").haveNumber("Tên đăng nhập phải có chữ số"),
  password: yup.string().min(6, "Mật khẩu bắt buộc từ 6 ký tự trở lên").onlyWord("Mật khẩu không được có kí tự đặc biệt"),
  role: yup.number().required(),
  canLogin: yup.number().required()
});

export class AccountRoute extends KComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.tabs[0],
      loading: true,
      saving: false,
      draft: {}
    };

    this.form = createSimpleForm(accountSchema);

    this.onUnmount(this.form.on("enter", () => this.editAccount()));
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {role} = userInfo.getState();
    accountApi.checkAccountIDInUser({role, accountID: props.match.params.accountID}).then((data) => {
      let info = pick(data, ["username", "password", "role", "canLogin", "accountID"]);
      this.form.updateData({...info}).then(() =>  this.setState({loading: false, draft: {...info}}));
    }).catch(err => customHistory.push(toDefaultRoute()));

  };

  componentDidMount(){
    this.form.validateData();
  }

  editAccount = () => {
    this.setState({saving: true});
    let account = this.form.getData();
    accountApi.update(account).then(() => {
      this.setState({draft: account, saving: false})
    })
  };

  tabs = [
    {
      label: "Thông tin cơ bản",
      render: () => (
        <AccountInfoForm
          form={this.form}
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
              <FormTabs
                tabs={this.tabs}
                activeTab={activeTab}
                onChangeTab={tab => this.setState({activeTab: tab})}
                renderActions={() => (
                  <div className="row justify-content-end u-actions">
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
            )

            }


          </div>
        </RouteTitle>

      </PageTitle>
    );
  }
}