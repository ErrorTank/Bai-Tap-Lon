import React from "react";
import {KComponent} from "../../k-component";
import classnames from "classnames"
import isEqual from "lodash/isEqual"

export class ApiDataTable extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      rows: null,
      total: null,
      page: 1,
      loading: true
    };
    setTimeout(() => {
      this.loadData({page: this.state.page});
    });
  };

  loadData(changes = {}) {
    let options = {
      page: changes.page === undefined ? this.state.page : changes.page,
      sort: changes.sort === undefined ? this.state.sort : changes.sort,
      filter: changes.filter === undefined ? this.props.filter : changes.filter,
    };
    this.setState({page: options.page, sort: options.sort, loading: true});

    this.props.api((options.page - 1) * this.pageSize(), this.pageSize(), options.filter, options.sort).then((result) => {
      // If this page is still desired
      if (this.isDesiredLoad(options)) {
        this.setState({
          loading: false,
          rows: result.rows,
          total: result.total,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {filter, pageSize} = this.props;

    if (!isEqual(nextProps.filter, filter) || pageSize !== nextProps.pageSize) {
      setTimeout(() => {
        this.loadData({page: 1, sort: null, filter: nextProps.filter})
      })
    }

  }

  isDesiredLoad(options) {
    return options.page == this.state.page &&
      isEqual(options.sort, this.state.sort) &&
      isEqual(options.filter, this.props.filter)
      ;
  }

  pageSize() {
    const {pageSize = 50} = this.props;
    return pageSize;
  }

  toggleSort(sortKey) {

    if (this.state.sort == null || this.state.sort.key != sortKey) {
      this.loadData({sort: {key: sortKey, asc: true}, page: 1});
    } else {
      if (this.state.sort.asc) {
        this.loadData({sort: {key: sortKey, asc: false}, page: 1});
      } else {
        this.loadData({sort: null, page: 1});
      }
    }
  }

  renderHeaderCell(column, index) {
    if (!column.sortable) {
      return null;
    }
    if (column.sortKey == null) {
      throw new Error(`Sortable column ${column.label} need sortKey property`);
    }

    return (
      <SortableHeaderCell
        key={index}
        label={column.label}
        className={column.headerClassName}
        sort={this.state.sort && this.state.sort.key == column.sortKey && (this.state.sort.asc ? "asc" : "desc")}
        onClick={() => this.toggleSort(column.sortKey)}
      />
    )
  }


  render() {
    const {className, columns, ...props} = this.props;
    const _columns = [...columns];

    return (
      <div className={classnames("pagination-data-table pagination-data-table-desktop", className, desktopClassName)}>
        {this.state.rows == null ? (
          <LoadingPanel height={150}/>
        ) : (
          <LoadingOverlay show={this.state.loading}>
            <DataTableDesktop
              {...props}
              columns={_columns}
              renderHeaderCell={(column, index) => this.renderHeaderCell(column, index)}
              rows={this.state.rows}
            />
          </LoadingOverlay>
        )}

        <div className="footer">

          {!this.state.loading && this.state.rows && this.state.rows.length > 0 && (
            <div className="summary">
              {formatNumber((this.state.page - 1) * this.pageSize() + 1)} to {formatNumber((this.state.page - 1) * this.pageSize() + this.state.rows.length)} of {formatNumber(this.state.total)} records
              shown
            </div>
          )}

          {this.state.total != null && this.state.total > this.pageSize() && (
            <Pagination
              value={this.state.page}
              total={Math.ceil(this.state.total / this.pageSize())}
              onChange={(newPage) => this.loadData({page: newPage})}
            />
          )}
        </div>
      </div>
    );

  }
}