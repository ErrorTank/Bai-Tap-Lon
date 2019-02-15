import React, {Fragment} from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {customHistory} from "../../../routes";
import {CustomSelect} from "../../../../common/custom-select/custom-select";
import {Roles, userInfo} from "../../../../../common/states/user-info";
import {IconInput} from "../../../../common/icon-input/icon-input";
import {DebounceSearchInput} from "../../../../common/debounce-search-input/debounce-search-input";
import {ApiDataTable} from "../../../../common/data-table/api-data-table/api-data-table";
import {schoolsBriefCache} from "../../../../../common/api-cache/common-cache";
import {candidateApi} from "../../../../../api/common/candidate-api";
import {schoolApi} from "../../../../../api/common/school-api";
import pick from "lodash/pick"
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {userApi} from "../../../../../api/common/user-api";

export class UserListRoute extends React.Component {
  constructor(props) {
    super(props);
    let getDefaultFilter = () => ({
      keyword: "",
      accountType: {label: "Tất cả", value: null},
      loading: false

    });
    this.state = {
      ...getDefaultFilter()
    };

  };

  accTypes = [
    {
      label: "Tất cả",
      value: null,

    }, {
      label: "Admin",
      value: 0
    }, {
      label: "Ban tổ chức",
      value: 1
    },
  ];





  columns = [
    {
      label: "Tên đầy đủ",
      cellDisplay: user => user.name,
    },{

      label: "Mã nhân viên",
      cellDisplay: user => user.employeeID
    } ,{

      label: "Email",
      cellDisplay: user => (
        <p className="email-display">
          {user.email}
        </p>

      )
    }
  ];


  render() {
    let {keyword, accountType, loading} = this.state;
    console.log(this.state);
    const api = (skip, take, filter, sort) => userApi.getUserBrief({skip, take, filter, sort})
      .then(({users, total}) => ({rows: users, total}));
    return (
      <PageTitle
        title={"Danh sách người dùng"}
      >
        <RouteTitle
          content={"Danh sách người dùng"}
        >
          <div className="user-list-route">
            <div className="m-portlet">
              <div className="m-portlet__body">
                {loading ? (
                  <LoadingInline className={"first-load"}/>
                ) : (
                  <Fragment>
                    <div className="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                      <div className="row align-items-end">
                        <div className="col order-2 order-xl-1 p-0">
                          <div className="form-group m-form__group row align-items-end">

                            <div className="col-md-4 pl-0">
                              <CustomSelect
                                label="Role"
                                list={this.accTypes}
                                value={accountType}
                                compare={item => item.value === accountType.value}
                                onChange={each => this.setState({accountType: {...each}})}
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
                      </div>
                    </div>
                    <ApiDataTable
                      className="user-list-table"
                      columns={this.columns}
                      filter={{
                        accountType,
                        keyword
                      }}
                      rowLinkTo={(row) => `/user/${row.userID}/edit`}
                      api={api}
                      pageSize={10}
                      placeholder={"Không có người dùng nào"}
                    />
                  </Fragment>
                )

                }

              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}