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

const accountSchema = yup.object().shape({
  name: yup.string().max(50, "Tên không được vượt quá 50 ký tự").required("Tên không được để trống"),
  address: yup.string().max(200, "Địa chỉ không được vượt quá 200 ký tự"),
  phone: yup.string().required("SĐT không được để trống").isPhone("SĐT không hợp lệ"),
  email: yup.string().email("Email không hợp lệ").required("Email không được để trống"),
  CMT: yup.string().max(20, "CMT không được vượt quá 20 ký tự").onlyWord("CMT không được có ký tự đặc biệt").required("CMT không được để trống"),
  gender: yup.boolean().required()
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

    this.form = createSimpleForm(userSchema);

    this.onUnmount(this.form.on("enter", () => this.editUser()));
    this.onUnmount(this.form.on("change", () => this.forceUpdate()));
    let {userID, role} = userInfo.getState();
    if (!props.match.params.userID || (role === 1 && userID !== props.params.match.userID)) {
      customHistory.push(toDefaultRoute());
    } else {
      userApi.get(props.match.params.userID).then(data => {
        let info = pick(data, ["name", "gender", "address", "phone", "email", "CMT", "userID", "employeeID"]);
        this.form.updateData({...info}).then(() =>  this.setState({loading: false, draft: {...info}}));
      }).catch(err => customHistory.push(toDefaultRoute()))
    }

  };

  componentDidMount(){
    this.form.validateData();
  }

  editUser = () => {
    this.setState({saving: true});
    let user = this.form.getData();
    userApi.update(user).then(() => {
      this.setState({draft: user, saving: false})
    })
  };

  tabs = [
    {
      label: "Thông tin cơ bản",
      render: () => (
        <UserInfoForm
          form={this.form}
        />
      )
    },
  ];

  handleSignout = () => {
    userInfo.setState(null).then(() => {
      authenCache.clearAuthen();
      customHistory.push("/login");
    });

  };

  render() {
    let {activeTab, loading, saving, draft} = this.state;
    let canSave = !this.form.getInvalidPaths().length && !saving && !isEqual(draft, this.form.getData());
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
                    utils={[
                      {
                        label: "Đăng xuất",
                        icon: className => (
                          <i className={classnames("fas fa-sign-out-alt", className)}/>
                        ),
                        onClick: this.handleSignout
                      }
                    ]}
                  />

                </div>
                <div className="col-xl-9 col-lg-8">
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