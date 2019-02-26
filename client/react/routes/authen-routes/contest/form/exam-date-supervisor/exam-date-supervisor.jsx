import React from "react";
import {DataTable} from "../../../../../common/data-table/data-table";
import {uid} from 'react-uid';
import isEqual from "lodash/isEqual"
import {supervisorBriefCache} from "../../../../../../common/api-cache/common-cache";
import {LoadingInline} from "../../../../../common/loading-inline/loading-inline";
import {examDateSupervisorModal} from "../../../../../common/modal/exam-date-supervisor/exam-date-supervisor";
import {supervisorApi} from "../../../../../../api/common/supervisor-api";



export class ExamDateSupervisor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      supervisors: []
    };
    supervisorApi.getSupervisorsBrief().then(supervisors => this.setState({supervisors, loading: false}))
  };

  removeSupervisor = edSupervisor => {
    let {form, onChange} = this.props;
    onChange();
    form.updatePathData("supervisors", form.getPathData("supervisors").filter(each => each.keyID !== edSupervisor.keyID));
  };

  columns = [
    {
      label: "Tên giám thị",
      cellDisplay: edSupervisor => this.state.supervisors.find(each => each.supervisorID === edSupervisor.supervisorID).name,
    }, {
      label: "Email",
      cellDisplay: edSupervisor => (
        <p className="email-display">
          {this.state.supervisors.find(each => each.supervisorID === edSupervisor.supervisorID).email}
        </p>
      ),
    }, {
      label: "",
      cellDisplay: edSupervisor => (
        <div className="actions">
          <i className="fas fa-trash rm-room"
             onClick={(e) => {
               e.stopPropagation();
               this.removeSupervisor(edSupervisor)
             }}/>
        </div>
      ),
    },
  ];

  renderHeader = (column, index) => (
    <th className={column.cellClass} key={index}>
      {column.label}
    </th>
  );


  handleClickRow = (e, supervisor) => {

    let handleUpdate = (info) => {
      let {form, onChange} = this.props;
      onChange();
      form.updatePathData("supervisors", form.getPathData("supervisors").map((each) => {
        if (each.keyID === info.keyID)
          return {...info};
        return each;
      }));
    };
    examDateSupervisorModal.open({
      disabled: (data) => {

        return isEqual(data, supervisor)
      },
      onChange(info) {
        return new Promise((resolve) => {
          handleUpdate(info);
          resolve();
        })
      },
      value: supervisor,
      confirmText: "Lưu thay đổi",
      supervisors: this.state.supervisors,
      examDates: this.props.form.getPathData("examDates"),
      disabledPickSupervisor: true
    });
  };

  handleCreateSupervisor = () => {
    let handleCreate = (info) => {
      let {form, onChange} = this.props;
      onChange();
      form.updatePathData("supervisors", form.getPathData("supervisors").concat({...info}));
    };

    examDateSupervisorModal.open({
      onChange(info) {

        return new Promise((resolve) => {
          handleCreate({...info, keyID: uid(info)});

          resolve();
        })
      },
      confirmText: "Thêm",
      supervisors: this.state.supervisors,
      examDates: this.props.form.getPathData("examDates")
    });
  };

  render() {
    let {form, err} = this.props;
    return (
      <div className="exam-date-supervisor">

        {this.state.loading ? (
          <LoadingInline/>
        ) : (
          <div className="m-form m-form--fit m-form--label-align-right m-form--state">
            {err && (
              <div className="row">
                <div className="server-error pb-3 col">
                  <p>
                    Đã có lỗi xảy ra!
                  </p>

                </div>
              </div>
            )

            }


            <div className="row ">

              <div className="col-12 p-0">
                {form.enhanceComponent("supervisors", ({error, onEnter, onChange, value, ...others}) => (
                  <div className="supervisors-table-wrap">

                    <DataTable
                      className={"supervisors-table"}
                      columns={this.columns}
                      renderHeaderCell={this.renderHeader}
                      placeholder={"Không có giám thị nào"}
                      rows={value}
                      _rowTrackBy={(row) => row.keyID}
                      clickRow={this.handleClickRow}
                      onClickRow={true}
                    />
                  </div>

                ), true)}
              </div>


            </div>

            <div className="row justify-content-end">
              <div className="col text-right p-0">
                <button className="btn btn-success create-supervisor" onClick={this.handleCreateSupervisor}>
                  Thêm giám thị
                </button>
              </div>


            </div>
          </div>
        )}


      </div>
    );
  }
}