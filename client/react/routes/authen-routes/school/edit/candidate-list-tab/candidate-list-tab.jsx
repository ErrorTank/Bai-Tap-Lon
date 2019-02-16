import React from "react";
import {CandidateMiniList} from "../../../candidate/candidate-mini-list/candidate-mini-list";
import {IconInput} from "../../../../../common/icon-input/icon-input";
//todo add filter by gender
export class CandidateListTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  };

  filterList = (list) => {
    let {value} = this.state;
    if(!value)
      return [...list];
    return list.filter(each => each.phone.includes(value) || each.name.includes(value) || each.email.includes(value) || each.CMT.includes(value))
  };

  render() {
    let newList = this.filterList(this.props.list);
    return (
      <div className="candidate-list-tab">
        <div className="tab-header">
          <div className="row">
            <div className="col p-0">
              <IconInput
                value={this.state.value}
                onChange={(e) => this.setState({value: e.target.value})}
                placeholder={"Tìm kiếm"}
                icon={(
                  <i className="fas fa-search"></i>
                )}
              />
            </div>

          </div>
        </div>
        <div className="tab-body">
          <CandidateMiniList/>
        </div>
      </div>
    );
  }
}