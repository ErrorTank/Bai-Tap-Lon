import React, {Fragment} from "react";
import {userInfo} from "../../../../../common/states/user-info";
import {rcApi} from "../../../../../api/common/rc-api";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {ApiDataTable} from "../../../../common/data-table/api-data-table/api-data-table";
import {DebounceSearchInput} from "../../../../common/debounce-search-input/debounce-search-input";
import {IconInput} from "../../../../common/icon-input/icon-input";
import {customHistory} from "../../../routes";
import {CustomSelect} from "../../../../common/custom-select/custom-select";


export class CandidateRegistration extends React.Component {
  constructor(props) {
    super(props);
    let getDefaultFilter = () => ({
      keyword: "",
      gender: {label: "Tất cả", value: null},
      loading: false
    });
    this.state = {
      ...getDefaultFilter()
    };
  };


  parseCanGender = (role) => {
    let matcher = {
      0: {
        label: "Nam",
        icon: (
          <i className="fas fa-mars male"></i>
        )
      },
      1: {
        label: "Nữ",
        icon: (
          <i className="fas fa-venus female"></i>
        )
      },
    };
    return matcher[role];
  };


  columns = [
    {
      label: "Tên đầy đủ",
      cellDisplay: rc => rc.name,
    }, {
      label: "Giới tính",
      cellDisplay: rc => {
        let {label, icon} = this.parseCanGender(rc.gender);
        return (
          <span className="gender-display">
            {icon} {label}
          </span>

        )
      }
    }, {

      label: "Email",
      cellDisplay: rc => (
        <p className="email-display">
          {rc.email}
        </p>

      )
    }, {

      label: "Số điện thoại",
      cellDisplay: rc => (
        <p className="phone-display">
          {rc.phone}
        </p>

      )
    }
  ];



  gender = [
    {
      label: "Tất cả",
      value: null,

    }, {
      label: "Nam",
      value: 0
    }, {
      label: "Nữ",
      value: 1
    },
  ];

  render() {
    let {keyword, loading, gender} = this.state;

    const api = (skip, take, filter, sort) => rcApi.getRcBrief({skip, take, filter, sort})
      .then(({rcs, total}) => ({rows: rcs, total}));
    return (
      <PageTitle
        title={"Danh sách yêu cầu đăng ký dự thi"}
      >
        <RouteTitle
          content={"Danh sách yêu cầu đăng ký dự thi"}
        >
          <div className="rc-list-route">
            <div className="m-portlet">
              <div className="m-portlet__body">
                {loading ? (
                  <LoadingInline className={"first-load"}/>
                ) : (
                  <Fragment>
                    <div className="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                      <div className="row align-items-end">
                        <div className="col-8 p-0">
                          <div className="form-group m-form__group row align-items-end">
                            <div className="col-5 pl-0">
                              <CustomSelect
                                  label="Giới tính"
                                  list={this.gender}
                                  value={gender}
                                  compare={item => item.value === gender.value}
                                  onChange={each => this.setState({gender: {...each}})}
                              />
                            </div>
                            <div className="col-5 pl-0">
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
                        <div className="col-4 m--align-right p-0">
                          <button type="button" className="btn btn-primary create-rc"
                                  onClick={() => customHistory.push("/candidate-register/new")}
                          >
                            <i className="fas fa-plus"></i> Tạo đăng ký dự thi
                          </button>
                        </div>
                      </div>
                    </div>
                    <ApiDataTable
                      className="rc-list-table"
                      columns={this.columns}
                      filter={{
                        keyword,
                        gender,
                        sID: userInfo.getState().sID
                      }}
                      rowLinkTo={(row) => `/candidate-register/${row.rcID}/edit`}
                      api={api}
                      pageSize={10}
                      placeholder={"Không có giám thị nào"}
                    />
                  </Fragment>
                )}

              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}