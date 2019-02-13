import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {customHistory} from "../../../routes";
import {CustomSelect} from "../../../../common/custom-select/custom-select";
import {Roles, userInfo} from "../../../../../common/states/user-info";
import {IconInput} from "../../../../common/icon-input/icon-input";
import {DebounceSearchInput} from "../../../../common/debounce-search-input/debounce-search-input";

export class AccountListRoute extends React.Component {
  constructor(props) {
    super(props);
    let getDefaultFilter = () => ({
      keyword: "",
      canLogin: {label: "Tất cả", value: null},
      role: {label: "Tất cả", value: null}
    });
    this.state = {
      ...getDefaultFilter()
    };
  };

  loginStatus = [
    {
      label: "Được",
      value: 1
    }, {
      label: "Không",
      value: 0
    },
  ];



  getRolesByPrivilege = () => {
    let {role} = userInfo.getState();
    let matcher = {
      0: each => each,
      1: each => each.role === 2 || each.role === 3,
    };
    return [{label: "Tất cả", value: null}].concat(Roles.map(matcher[role]))
  };

  render() {
    let {role, keyword, canLogin} = this.state;
    console.log(this.state);
    return (
      <PageTitle
        title={"Danh sách tài khoản"}
      >
        <RouteTitle
          content={"Danh sách tài khoản"}
        >
          <div className="account-list-route">
            <div className="m-portlet">
              <div className="m-portlet__body">
                <div className="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                  <div className="row align-items-end">
                    <div className="col-xl-8 order-2 order-xl-1">
                      <div className="form-group m-form__group row align-items-end">
                        <div className="col-md-4 pl-0">
                          <CustomSelect
                            label="Role"
                            list={this.getRolesByPrivilege()}
                            value={role}
                            compare={item => item.value === role.value}
                            onChange={each => this.setState({role: {...each}})}
                          />
                        </div>
                        <div className="col-md-4 pl-0">
                          <CustomSelect
                            label="Đăng nhập"
                            list={[{label: "Tất cả", value: null}].concat(this.loginStatus)}
                            value={canLogin}
                            compare={item => item.value === canLogin.value}
                            onChange={each => this.setState({canLogin: {...each}})}
                          />
                        </div>
                        <div className="col-md-4 pl-0">
                          <DebounceSearchInput
                            timeout={1000}
                            value={keyword}
                            renderInput={({onChange, value}) => (
                              <IconInput
                                value={value}
                                placeholder={"Tìm kiếm"}
                                onChange={onChange}
                                icon={(
                                  <i className="fas fa-search"></i>
                                )}
                              />
                            )}
                            onSearch={(keyword) => this.setState({keyword})}
                          />

                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 order-1 order-xl-2 m--align-right">
                      <button type="button" className="btn btn-primary create-account"
                              onClick={() => customHistory.push("/account/new")}
                      >
                        <i className="fas fa-plus"></i> Tạo tài khoản
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}