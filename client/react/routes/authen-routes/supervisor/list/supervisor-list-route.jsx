import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {customHistory} from "../../../routes";

import {IconInput} from "../../../../common/icon-input/icon-input";
import {DebounceSearchInput} from "../../../../common/debounce-search-input/debounce-search-input";
import {ApiDataTable} from "../../../../common/data-table/api-data-table/api-data-table";
import {supervisorApi} from "../../../../../api/common/supervisor-api";



export class SupervisorListRoute extends React.Component {
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
      label: "Tên đầy đủ",
      cellDisplay: supervisor => supervisor.name,
    }, {
      label: "Email",
      cellDisplay: supervisor => (
        <p className="email-display">
          {supervisor.email}
        </p>
      ),
    }, {
      label: "Điện thoại",
      cellDisplay: supervisor => supervisor.phone,
    }, {
      label: "Địa chỉ",
      cellDisplay: supervisor => (
        <p className="address-display">
          {supervisor.address}
        </p>
      ),
    }
  ];


  render() {
    let {keyword} = this.state;

    const api = (skip, take, filter, sort) => supervisorApi.getBrief({skip, take, filter, sort})
      .then(({supervisors, total}) => ({rows: supervisors, total}));
    return (
      <PageTitle
        title={"Danh sách giám thị"}
      >
        <RouteTitle
          content={"Danh sách giám thị"}
        >
          <div className="supervisor-list-route">
            <div className="m-portlet">
              <div className="m-portlet__body">
                <div className="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                  <div className="row align-items-end">
                    <div className="col-6 p-0">
                      <div className="form-group m-form__group row align-items-end">

                        <div className="col-10 pl-0">
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
                    <div className="col-6 m--align-right p-0">
                      <button type="button" className="btn btn-primary create-supervisor"
                              onClick={() => customHistory.push("/supervisor/new")}
                      >
                        <i className="fas fa-plus"></i> Tạo giám thị
                      </button>
                    </div>
                  </div>
                </div>
                <ApiDataTable
                  className="supervisor-list-table"
                  columns={this.columns}
                  filter={{
                    keyword
                  }}
                  rowLinkTo={(row) => `/supervisor/${row.supervisorID}/edit`}
                  api={api}
                  pageSize={10}
                  placeholder={"Không có giám thị nào"}
                />
              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}