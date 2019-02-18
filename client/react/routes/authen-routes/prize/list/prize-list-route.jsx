import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {customHistory} from "../../../routes";

import {IconInput} from "../../../../common/icon-input/icon-input";
import {DebounceSearchInput} from "../../../../common/debounce-search-input/debounce-search-input";
import {accountApi} from "../../../../../api/common/account-api";
import {ApiDataTable} from "../../../../common/data-table/api-data-table/api-data-table";
import {schoolApi} from "../../../../../api/common/school-api";


export class PrizeListRoute extends React.Component {
  constructor(props) {
    super(props);
    let getDefaultFilter = () => ({
      keyword: "",
    });
    this.state = {
      ...getDefaultFilter()
    };
  };



  columns = [
    {
      label: "Tên trường",
      cellDisplay: school => (
        <p className="school-display">
          {school.name}
        </p>
      ),
    }, {
      label: "Email",
      cellDisplay: school => (
        <p className="email-display">
          {school.email}
        </p>
      ),
    }, {

      label: "Địa chỉ",
      cellDisplay: school => (
        <p className="school-display">
          {school.address}
        </p>

      )
    },
  ];


  render() {
    let {keyword} = this.state;
    console.log(this.state);
    const api = (skip, take, filter, sort) => schoolApi.getSchoolsBriefWithCondition({skip, take, filter, sort})
      .then(({schools, total}) => ({rows: schools, total}));
    return (
      <PageTitle
        title={"Danh sách trường"}
      >
        <RouteTitle
          content={"Danh sách trường"}
        >
          <div className="school-list-route">
            <div className="m-portlet">
              <div className="m-portlet__body">
                <div className="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                  <div className="row align-items-end">
                    <div className="col-xl-8 order-2 order-xl-1 p-0">
                      <div className="form-group m-form__group row align-items-end">

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
                      <button type="button" className="btn btn-primary create-school"
                              onClick={() => customHistory.push("/school/new")}
                      >
                        <i className="fas fa-plus"></i> Tạo trường
                      </button>
                    </div>
                  </div>
                </div>
                <ApiDataTable
                  className="school-list-table"
                  columns={this.columns}
                  filter={{
                    keyword
                  }}
                  rowLinkTo={(row) => `/school/${row.sID}/edit`}
                  api={api}
                  pageSize={10}
                  placeholder={"Không có trường nào"}
                />
              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}