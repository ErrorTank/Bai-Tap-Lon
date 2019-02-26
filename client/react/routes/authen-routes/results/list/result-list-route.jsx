import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {customHistory} from "../../../routes";

import {IconInput} from "../../../../common/icon-input/icon-input";
import {DebounceSearchInput} from "../../../../common/debounce-search-input/debounce-search-input";
import {ApiDataTable} from "../../../../common/data-table/api-data-table/api-data-table";
import {resultApi} from "../../../../../api/common/result-api";



export class ResultListRoute extends React.Component {
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
      cellDisplay: result => result.candidate.name,
    },{
      label: "SBD",
      cellDisplay: result => result.SBD,
    }, {
      label: "Tên kì thi",
      cellDisplay: result => result.contest.contestName,
    }, {
      label: "Điểm",
      cellDisplay: result => result.mark,
    }
  ];


  render() {
    let {keyword} = this.state;

    const api = (skip, take, filter, sort) => resultApi.getBrief({skip, take, filter, sort})
      .then(({results, total}) => ({rows: results, total}));
    return (
      <PageTitle
        title={"Danh sách phiếu báo điểm"}
      >
        <RouteTitle
          content={"Danh sách phiếu báo điểm"}
        >
          <div className="result-list-route">
            <div className="m-portlet">
              <div className="m-portlet__body">
                <div className="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                  <div className="row align-items-end">
                    <div className="col-6 p-0">
                      <div className="form-group m-form__group row align-items-end">

                        <div className="col-10 pl-0">


                        </div>
                      </div>
                    </div>
                    <div className="col-6 m--align-right p-0">
                      <button type="button" className="btn btn-primary create-result"
                              onClick={() => customHistory.push("/result/new")}
                      >
                        <i className="fas fa-plus"></i> Tạo phiếu báo điểm
                      </button>
                    </div>
                  </div>
                </div>
                <ApiDataTable
                  className="result-list-table"
                  columns={this.columns}
                  filter={{

                  }}
                  rowLinkTo={(row) => `/result/${row.resultID}/edit`}
                  api={api}
                  pageSize={10}
                  placeholder={"Không có phiếu báo điểm nào"}
                />
              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}