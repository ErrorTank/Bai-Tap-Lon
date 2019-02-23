import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {customHistory} from "../../../routes";

import {IconInput} from "../../../../common/icon-input/icon-input";
import {DebounceSearchInput} from "../../../../common/debounce-search-input/debounce-search-input";
import {ApiDataTable} from "../../../../common/data-table/api-data-table/api-data-table";
import {contestApi} from "../../../../../api/common/contest-api";
import {CustomSelect} from "../../../../common/custom-select/custom-select";
import {formatMoney} from "../../../../../common/format";



export class ContestListRoute extends React.Component {
  constructor(props) {
    super(props);
    let getDefaultFilter = () => ({
      keyword: "",
      canSeeResult: {label: "Tất cả", value: null},
    });
    this.state = {
      ...getDefaultFilter()
    };
  };



  columns = [
    {
      label: "Tên kỳ thi",
      cellDisplay: contest =>
        (<p className="name-display">
          {contest.contestName}
        </p>),
    },{
      label: "Tên môn",
      cellDisplay: contest => contest.subjectName,
    }, {
      label: "Phí thi",
      cellDisplay: contest => (
        <p className="money-display">
          {formatMoney(contest.fee)} VNĐ
        </p>
      ),
    },  {
      label: "Tham gia",
      cellDisplay: contest => (
        <p className="count-display">
          {contest.count} Thí sinh
        </p>
      ),
    }, {
      label: "Địa điểm",
      cellDisplay: contest => (
        <p className="address-display">
          {contest.orgLocation}
        </p>
      ),
    },
  ];
  seeResult = [
    {
      label: "Được",
      value: 1
    }, {
      label: "Không",
      value: 0
    },
  ];

  render() {
    let {keyword, canSeeResult} = this.state;

    const api = (skip, take, filter, sort) => contestApi.getBrief({skip, take, filter, sort})
      .then(({contests, total}) => ({rows: contests, total}));
    return (
      <PageTitle
        title={"Danh sách kì thi"}
      >
        <RouteTitle
          content={"Danh sách kì thi"}
        >
          <div className="contest-list-route">
            <div className="m-portlet">
              <div className="m-portlet__body">
                <div className="m-form m-form--label-align-right m--margin-top-20 m--margin-bottom-30">
                  <div className="row align-items-end">
                    <div className="col-8  p-0">
                      <div className="form-group m-form__group row align-items-end">

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
                        <div className="col-5 pl-0">
                          <CustomSelect
                            label="Xem kết quả"
                            list={[{label: "Tất cả", value: null}].concat(this.seeResult)}
                            value={canSeeResult}
                            compare={item => item.value === canSeeResult.value}
                            onChange={each => this.setState({canSeeResult: {...each}})}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-4  m--align-right p-0">
                      <button type="button" className="btn btn-primary create-contest"
                              onClick={() => customHistory.push("/contest/new")}
                      >
                        <i className="fas fa-plus"></i> Tạo kì thi
                      </button>
                    </div>
                  </div>
                </div>
                <ApiDataTable
                  className="contest-list-table"
                  columns={this.columns}
                  filter={{
                    keyword,
                    canSeeResult
                  }}
                  rowLinkTo={(row) => `/contest/${row.contestID}/edit`}
                  api={api}
                  pageSize={10}
                  placeholder={"Không có kì thi nào"}
                />
              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}