import React from "react";
import {roomApi} from "../../../../../../api/common/room-api";
import {uid} from 'react-uid';
import {LoadingInline} from "../../../../../common/loading-inline/loading-inline";
import {ExamDateCard} from "./exam-date-card/exam-date-card";
import {examDateModal} from "../../../../../common/modal/exam-date-modal/exam-date-modal";
import isEqual from "lodash/isEqual";

export class ContestExamDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      rooms: [],
    };
    roomApi.getRoomByOrgLocationID(props.form.getPathData("orgLocationID")).then(rooms => {
      this.setState({rooms, loading: false});
    })
  };

  createExamDate = () => {
    let handleCreate = (info) => {
      let {form, onChange} = this.props;
      onChange();
      form.updatePathData("examDates", form.getPathData("examDates").concat({...info}));
    };
    examDateModal.open({
      onChange(info) {

        return new Promise((resolve) => {
          handleCreate({...info, cardID: uid(info)});

          resolve();
        })
      },
      confirmText: "Tạo buổi thi",
      rooms: this.state.rooms
    })
  };

  removeExamDate = (cardID) => {
    let handleRemove = () => {
      let {form, onChange} = this.props;
      onChange();
      form.updatePathData("examDates", form.getPathData("examDates").filter(each => each.cardID !== cardID));
    };
    handleRemove();
  };

  editExamDate = (examDate) => {

    let handleUpdate = (info) => {
      let {form, onChange} = this.props;
      onChange();
      form.updatePathData("examDates", form.getPathData("examDates").map((each) => {
        if (each.cardID === info.cardID)
          return {...info};
        return each;
      }));
    };
    examDateModal.open({
      disabled: (data) => {

        return isEqual(data, examDate)
      },
      rooms: this.state.rooms,
      onChange(info) {
        return new Promise((resolve) => {
          handleUpdate(info);
          resolve();
        })
      },
      value: examDate,
      confirmText: "Lưu thay đổi"
    });
  };

  render() {
    let {form, err, onChange: propsOnChange, renderNavigate = () => null} = this.props;
    let examDates = form.getPathData("examDates");
    return (
      <div className="contest-exam-date">

        {this.state.loading ? (
          <LoadingInline/>
        ) : (
          <div className="exam-date-route-wrapper">
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
            <div className="exam-date-header">
              <p className="room-length"> Tìm thấy {this.state.rooms.length} phòng</p>

            </div>
            <div className="exam-date-body">
              <div className="exam-date-list">
                {examDates.map((each) => {
                  return (
                    <ExamDateCard
                      key={each.cardID}
                      onClick={() => this.editExamDate(each)}
                      onClose={() => this.removeExamDate(each.cardID)}
                      room={this.state.rooms.find(room => room.roomID === each.roomID) || {}}
                      {...each}
                    />
                  )
                })

                }
              </div>
              <div className="exam-date-footer">
                <div className="row p-0 justify-content-end">
                  <button type="button" className="btn btn-success create-exam-date" onClick={this.createExamDate}>Tạo buổi thi</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
}