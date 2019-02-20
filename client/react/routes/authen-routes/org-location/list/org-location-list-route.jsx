import React from "react";
import {PageTitle} from "../../../../common/page-title/page-title";
import {RouteTitle} from "../../../../layout/route-title/route-title";
import {customHistory} from "../../../routes";

import {IconInput} from "../../../../common/icon-input/icon-input";
import {DebounceSearchInput} from "../../../../common/debounce-search-input/debounce-search-input";
import {ApiDataTable} from "../../../../common/data-table/api-data-table/api-data-table";
import {orgLocationApi} from "../../../../../api/common/org-location-api";




export class OrgLocationListRoute extends React.Component {
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
      label: "Tên địa điểm",
      cellDisplay: orgLocation => orgLocation.name,
    },  {
      label: "Điện thoại",
      cellDisplay: orgLocation => orgLocation.phone,
    }, {
      label: "Địa chỉ",
      cellDisplay: orgLocation => (
        <p className="address-display">
          {orgLocation.address}
        </p>
      ),
    }
  ];


  render() {
    let {keyword} = this.state;

    const api = (skip, take, filter, sort) => orgLocationApi.getBrief({skip, take, filter, sort})
      .then(({orgLocations, total}) => ({rows: orgLocations, total}));
    return (
      <PageTitle
        title={"Danh sách địa điểm tổ chức"}
      >
        <RouteTitle
          content={"Danh sách địa điểm tổ chức"}
        >
          <div className="org-location-list-route">
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
                      <button type="button" className="btn btn-primary create-org-location"
                              onClick={() => customHistory.push("/org-location/new")}
                      >
                        <i className="fas fa-plus"></i> Tạo địa điểm tổ chức
                      </button>
                    </div>
                  </div>
                </div>
                <ApiDataTable
                  className="org-location-list-table"
                  columns={this.columns}
                  filter={{
                    keyword
                  }}
                  rowLinkTo={(row) => `/org-location/${row.orgLocationID}/edit`}
                  api={api}
                  pageSize={10}
                  placeholder={"Không có địa điểm nào"}
                />
              </div>

            </div>
          </div>
        </RouteTitle>
      </PageTitle>
    );
  }
}