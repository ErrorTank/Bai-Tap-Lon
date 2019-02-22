import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {customHistory} from "../../../routes";

import {IconInput} from "../../../../common/icon-input/icon-input";
import {DebounceSearchInput} from "../../../../common/debounce-search-input/debounce-search-input";
import {ApiDataTable} from "../../../../common/data-table/api-data-table/api-data-table";
import {supervisorApi} from "../../../../../api/common/supervisor-api";
import {subjectApi} from "../../../../../api/common/subject-api";



export class SubjectListRoute extends React.Component {
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
      label: "Tên môn",
      cellDisplay: subject => subject.name,
    },  {
      label: "Mô tả",
      cellDisplay: subject => subject.content,
    }
  ];


  render() {
    let {keyword} = this.state;

    const api = (skip, take, filter, sort) => subjectApi.getBrief({skip, take, filter, sort})
      .then(({subjects, total}) => ({rows: subjects, total}));
    return (
      <PageTitle
        title={"Danh sách môn thi"}
      >
        <RouteTitle
          content={"Danh sách môn thi"}
        >
          <div className="subject-list-route">
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
                      <button type="button" className="btn btn-primary create-supervisor"
                              onClick={() => customHistory.push("/subject/new")}
                      >
                        <i className="fas fa-plus"></i> Tạo môn thi mới
                      </button>
                    </div>
                  </div>
                </div>
                <ApiDataTable
                  columns={this.columns}
                  filter={{
                    keyword
                  }}
                  rowLinkTo={(row) => `/subject/${row.subjectID}/edit`}
                  api={api}
                  pageSize={10}
                  placeholder={"Không có môn thi nào"}
                />
              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}