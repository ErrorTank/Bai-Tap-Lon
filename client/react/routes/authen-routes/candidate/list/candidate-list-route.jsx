import React from "react";
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

export class CandidateListRoute extends React.Component {
  constructor(props) {
    super(props);
    let getDefaultFilter = () => ({
      keyword: "",
      gender: {label: "Tất cả", value: null},
      school: {label: "Tất cả", value: null},
      schools: []
    });
    this.state = {
      ...getDefaultFilter()
    };
    schoolsBriefCache.get().then(schools => this.setState({schools: [{name: "Tất cả", sID: null}].concat(schools)}))
  };

  gender = [
    {
      label: "Tất cả",
      value: null,

    }, {
      label: "Nam",
      value: 0
    },{
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

  parseCanSchoolStr = (sID) => {
    return this.state.schools.find(each => each.sID === sID)
  };


  columns = [
    {
      label: "Tên đầy đủ",
      cellDisplay: candidate => candidate.name,
    }, {
      label: "Giới tính",
      cellDisplay: candidate => {
        let {label, icon} = this.parseCanGender(candidate.gender);
        return (
          <span className="gender-display">
            {icon} {label}
          </span>

        )
      }
    }, {

      label: "Trường học",
      cellDisplay: candidate => (
        <p className="school-display">
          {this.parseCanSchoolStr(candidate.sID)}
        </p>

      )
    },
  ];


  render() {
    let {school, keyword, gender, schools} = this.state;
    console.log(this.state);
    const api = (skip, take, filter, sort) => candidateApi.getCandidateBrief({skip, take, filter, sort})
      .then(({candidates, total}) => ({rows: candidates, total}));
    return (
      <PageTitle
        title={"Danh sách Thí sinh"}
      >
        <RouteTitle
          content={"Danh sách Thí sinh"}
        >
          <div className="candidate-list-route">
            <div className="m-portlet">
              <div className="m-portlet__body">
                <div className="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                  <div className="row align-items-end">
                    <div className="col-xl-8 order-2 order-xl-1 p-0">
                      <div className="form-group m-form__group row align-items-end">
                        <div className="col-md-4 pl-0">
                          <CustomSelect
                            label="Trường"
                            list={schools}
                            value={school}
                            compare={item => item.sID === school.value}
                            onChange={each => this.setState({school: {label: each.name, value: each.sID}})}
                          />
                        </div>
                        <div className="col-md-4 pl-0">
                          <CustomSelect
                            label="Giới tính"
                            list={this.gender}
                            value={gender}
                            compare={item => item.value === gender.value}
                            onChange={each => this.setState({gender: {...each}})}
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
                    <div className="col-xl-4 order-1 order-xl-2 m--align-right p-0">
                      <button type="button" className="btn btn-primary create-account"
                              onClick={() => customHistory.push("/account/new")}
                      >
                        <i className="fas fa-plus"></i> Tạo tài khoản
                      </button>
                    </div>
                  </div>
                </div>
                <ApiDataTable
                  className="account-list-table"
                  columns={this.columns}
                  filter={{
                    canLogin,
                    role,
                    keyword
                  }}
                  rowLinkTo={(row) => `account/${row.accountID}/edit`}
                  api={api}
                  pageSize={10}
                  placeholder={"Không có tài khoản nào"}
                />
              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}