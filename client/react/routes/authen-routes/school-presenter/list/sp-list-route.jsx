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
import pick from "lodash/pick"
import {LoadingInline} from "../../../../common/loading-inline/loading-inline";
import {schoolPresenterApi} from "../../../../../api/common/school-presenter-api";
import {schoolApi} from "../../../../../api/common/school-api";

export class SpListRoute extends React.Component {
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


  columns = [
    {
      label: "Tên đầy đủ",
      cellDisplay: candidate => candidate.name,
    },  {

      label: "Email",
      cellDisplay: candidate => (
        <p className="email-display">
          {candidate.email}
        </p>

      )
    }, {

      label: "Trường học",
      cellDisplay: candidate => (
        <p className="school-display">
          {userInfo.getState().role === 2 ? this.state.school.label : this.parseCanSchoolStr(candidate.sID)}
        </p>

      )
    }
  ];


  render() {
    let {school, keyword, schools, loading} = this.state;
    console.log(this.state);
    const api = (skip, take, filter, sort) => schoolPresenterApi.getSpBrief({skip, take, filter, sort})
      .then(({sps, total}) => ({rows: sps, total}));
    return (
      <PageTitle
        title={"Danh sách Đại diện trường"}
      >
        <RouteTitle
          content={"Danh sách Đại diện trường"}
        >
          <div className="sp-list-route">
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
                                label="Trường"
                                list={schools}
                                value={school}
                                compare={item => item.value === school.value}
                                onChange={each => this.setState({school: {label: each.label, value: each.value}})}
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
                      className="sp-list-table"
                      columns={this.columns}
                      filter={{
                        school,
                        keyword
                      }}
                      rowLinkTo={(row) => `/sp/${row.spID}/edit`}
                      api={api}
                      pageSize={10}
                      placeholder={"Không có đại diện trường nào"}
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