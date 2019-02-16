import React from "react";
import {IconInput} from "../../../../../common/icon-input/icon-input";
import {CustomSelect} from "../../../../../common/custom-select/custom-select";
import {DataTable} from "../../../../../common/data-table/data-table";
import {customHistory} from "../../../../routes";
//todo add filter by gender
export class CandidateListTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      gender: null
    };
  };

  filterList = (list) => {
    let {value, gender} = this.state;
    return list.filter(each => (gender === null ? true : each.gender === gender) && (each.phone.includes(value) || each.name.includes(value) || each.email.includes(value) || each.CMT.includes(value)))
  };

  gender = [
    {
      label: "Tất cả",
      value: null,

    }, {
      label: "Nam",
      value: 0
    }, {
      label: "Nữ",
      value: 1
    },
  ];

  handleClickCandidate = (candidate) => {

  };

  columns = [
    {
      label: "Tên đầy đủ",
      cellDisplay:  candidate => candidate.name,
    }, {

      label: "Email",
      cellDisplay: candidate => (
        <p className="email-display">
          {candidate.email}
        </p>

      )
    }, {

      label: "",
      cellDisplay: candidate => (
        <i className="delete-can fas fa-trash" onClick={() => this.handleDeleteCandidate(candidate)}></i>

      )
    },
  ];

  handleDeleteCandidate = (candidate) => {

  };

  renderHeaderCell = (col) => {
    return col.label;
  };

  render() {
    let newList = this.filterList(this.props.list);
    let {gender} = this.state;
    return (
      <div className="candidate-list-tab">
        <div className="tab-header">
          <div className="row">
            <div className="col-4 p-0">
              <IconInput
                value={this.state.value}
                onChange={(e) => this.setState({value: e.target.value})}
                placeholder={"Tìm kiếm"}
                icon={(
                  <i className="fas fa-search"></i>
                )}
              />
            </div>
            <div className="col-4 p-0">
              <CustomSelect
                label="Giới tính"
                list={this.gender}
                value={this.gender.find(each => each.value === gender)}
                compare={item => item.value === gender}
                onChange={each => this.setState({gender: each.value})}
              />

            </div>
          </div>
        </div>
        <div className="tab-body">
          <div className="row justify-content-end">
            <button type="button" className="btn btn-primary create-candidate"
                    onClick={() => customHistory.push("/account/new")}
            >
              <i className="fas fa-plus"></i> Tạo tài khoản
            </button>
          </div>
          <DataTable
            rows={newList}
            columns={this.columns}
            clickRow={this.handleClickCandidate}
            renderHeaderCell={this.renderHeaderCell}
            placeholder={"Không có thí sinh nào"}
          />
        </div>
      </div>
    );
  }
}