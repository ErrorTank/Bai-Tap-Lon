import React, {Fragment} from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {customHistory} from "../../../routes";

import {IconInput} from "../../../../common/icon-input/icon-input";
import {DebounceSearchInput} from "../../../../common/debounce-search-input/debounce-search-input";
import {ApiDataTable} from "../../../../common/data-table/api-data-table/api-data-table";
import {supervisorApi} from "../../../../../api/common/supervisor-api";
import {rcApi} from "../../../../../api/common/rc-api";
import {userInfo} from "../../../../../common/states/user-info";
import {CustomSelect} from "../../../../common/custom-select/custom-select";
import {schoolApi} from "../../../../../api/common/school-api";
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {approveModal} from "../../../../common/modal/approve-modal/approve-modal";


export class ApproveRequest extends React.Component {
  constructor(props) {
    super(props);
    let getDefaultFilter = () => ({
      keyword: "",
      school: {label: "Tất cả", value: null},
      schools: [],
      loading: true
    });
    this.state = {
      ...getDefaultFilter()
    };
    schoolApi.getSchoolsBrief().then(schools => this.setState({
      schools: [{label: "Tất cả", value: null}].concat(schools.map(each => ({label: each.name, value: each.sID}))),
      loading: false
    }));
  };

  parseCanSchoolStr = (sID) => {
    return this.state.schools.find(each => each.value === sID).label
  };

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
      label: "Email",
      cellDisplay: rc => (
        <p className="email-display">
          {rc.email}
        </p>
      ),
    },  {
      label: "Giới tính",
      cellDisplay: rc => {
        let {label, icon} = this.parseCanGender(rc.gender);
        return (
          <span className="gender-display">
            {icon} {label}
          </span>

        )
      }
    },   {

      label: "Trường học",
      cellDisplay: rc => (
        <p className="school-display">
          {this.parseCanSchoolStr(rc.sID)}
        </p>

      )
    }
  ];

  approveCandidate = (row) => {
    console.log(row)
    approveModal.open({
      value: {...row}
    }).then(() => this.forceUpdate());
  };


  render() {
    let {keyword, school, schools, loading} = this.state;

    const api = (skip, take, filter, sort) => rcApi.getRcBrief({skip, take, filter, sort})
      .then(({rcs, total}) => ({rows: rcs, total}));
    return (
      <PageTitle
        title={"Danh sách đăng ký dự thi"}
      >
        <RouteTitle
          content={"Danh sách đăng ký dự thi"}
        >
          <div className="approve-request">
            <div className="m-portlet">
              <div className="m-portlet__body">
                {loading ? (
                  <LoadingInline className={"first-load"}/>
                ) : (
                  <Fragment>
                    <div className="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                      <div className="row align-items-end">
                        <div className="col-6 p-0">
                          <div className="form-group m-form__group row align-items-end">
                            <div className="col-5 pl-0">
                              <CustomSelect
                                label="Trường"
                                list={schools}
                                value={school}
                                compare={item => item.value === school.value}
                                onChange={each => this.setState({school: {label: each.label, value: each.value}})}
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
                      </div>
                    </div>
                    <ApiDataTable
                      className="approve-request-list-table"
                      columns={this.columns}
                      filter={{
                        keyword,
                        school
                      }}
                      // rowLinkTo={(row) => `/supervisor/${row.supervisorID}/edit`}
                      onClickRow={this.approveCandidate}

                      api={api}
                      pageSize={10}
                      placeholder={"Không có yêu cầu nào"}
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