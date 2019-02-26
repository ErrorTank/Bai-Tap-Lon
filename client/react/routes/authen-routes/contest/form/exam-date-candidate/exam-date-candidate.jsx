import React from "react";
import {DataTable} from "../../../../../common/data-table/data-table";
import {uid} from 'react-uid';
import isEqual from "lodash/isEqual"
import {candidateBriefCache} from "../../../../../../common/api-cache/common-cache";
import {LoadingInline} from "../../../../../common/loading-inline/loading-inline";
import {examDateCandidateModal} from "../../../../../common/modal/exam-date-candidate/exam-date-candidate";
import {candidateApi} from "../../../../../../api/common/candidate-api";


export class ExamDateCandidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      candidates: []
    };
    candidateApi.getCandidatesBrief().then((candidates) => this.setState({candidates, loading: false}))
  };

  removeCandidate = edCandidate => {
    let {form, onChange} = this.props;
    onChange();
    form.updatePathData("candidates", form.getPathData("candidates").filter(each => each.keyID !== edCandidate.keyID));
  };

  columns = [
    {
      label: "Tên thí sinh",
      cellDisplay: edCandidate => this.state.candidates.find(each => each.cID === edCandidate.cID).name,
    }, {
      label: "Email",
      cellDisplay: edCandidate => (
        <p className="email-display">
          {this.state.candidates.find(each => each.cID === edCandidate.cID).email}
        </p>
      ),
    }, {
      label: "Số báo danh",
      cellDisplay: edCandidate => edCandidate.SBD,
    }, {
      label: "",
      cellDisplay: edCandidate => (
        <div className="actions">
          <i className="fas fa-trash rm-room"
             onClick={(e) => {
               e.stopPropagation();
               this.removeCandidate(edCandidate)
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


  handleClickRow = (e, candidate) => {

    let handleUpdate = (info) => {
      let {form, onChange} = this.props;
      onChange();
      form.updatePathData("candidates", form.getPathData("candidates").map((each) => {
        if (each.keyID === info.keyID)
          return {...info};
        return each;
      }));
    };
    examDateCandidateModal.open({
      disabled: (data) => {

        return isEqual(data, candidate)
      },
      onChange(info) {
        return new Promise((resolve) => {
          handleUpdate(info);
          resolve();
        })
      },
      value: candidate,
      confirmText: "Lưu thay đổi",
      candidates: this.state.candidates,
      examDates: this.props.form.getPathData("examDates"),
      disabledPickCan: true
    });
  };

  handleCreateCandidate = () => {
    let handleCreate = (info) => {
      let {form, onChange} = this.props;
      onChange();
      form.updatePathData("candidates", form.getPathData("candidates").concat({...info}));
    };

    examDateCandidateModal.open({
      onChange(info) {

        return new Promise((resolve) => {
          handleCreate({...info, keyID: uid(info)});

          resolve();
        })
      },
      confirmText: "Thêm",
      candidates: this.state.candidates,
      examDates: this.props.form.getPathData("examDates")
    });
  };

  render() {
    let {form, err} = this.props;
    return (
      <div className="exam-date-candidate">

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
                {form.enhanceComponent("candidates", ({error, onEnter, onChange, value, ...others}) => (
                  <div className="candidates-table-wrap">

                    <DataTable
                      className={"candidates-table"}
                      columns={this.columns}
                      renderHeaderCell={this.renderHeader}
                      placeholder={"Không có thí sinh nào"}
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
                <button className="btn btn-success create-candidate" onClick={this.handleCreateCandidate}>
                  Thêm thí sinh
                </button>
              </div>


            </div>
          </div>
        )}


      </div>
    );
  }
}