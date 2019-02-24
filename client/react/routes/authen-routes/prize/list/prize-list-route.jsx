import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {customHistory} from "../../../routes";

import {IconInput} from "../../../../common/icon-input/icon-input";
import {DebounceSearchInput} from "../../../../common/debounce-search-input/debounce-search-input";
import {accountApi} from "../../../../../api/common/account-api";
import {ApiDataTable} from "../../../../common/data-table/api-data-table/api-data-table";
import {schoolApi} from "../../../../../api/common/school-api";
import {prizeApi} from "../../../../../api/common/prize-api";


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
      label: "Tên giải",
      cellDisplay: prize => prize.name,
    }, {
      label: "Mô tả",
      cellDisplay: prize => (
        <p className="content-display">
          {prize.content}
        </p>
      ),
    }
  ];


  render() {
    let {keyword} = this.state;

    const api = (skip, take, filter, sort) => prizeApi.getPrizeBrief({skip, take, filter, sort})
      .then(({prizes, total}) => ({rows: prizes, total}));
    return (
      <PageTitle
        title={"Danh sách giải thưởng"}
      >
        <RouteTitle
          content={"Danh sách giải thưởng"}
        >
          <div className="prize-list-route">
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
                      <button type="button" className="btn btn-primary create-prize"
                              onClick={() => customHistory.push("/prize/new")}
                      >
                        <i className="fas fa-plus"></i> Tạo giải thưởng
                      </button>
                    </div>
                  </div>
                </div>
                <ApiDataTable
                  className="prize-list-table"
                  columns={this.columns}
                  filter={{
                    keyword
                  }}
                  rowLinkTo={(row) => `/prize/${row.prizeID}/edit`}
                  api={api}
                  pageSize={10}
                  placeholder={"Không có giải thưởng nào"}
                />
              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}