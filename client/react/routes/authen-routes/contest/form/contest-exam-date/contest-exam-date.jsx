import React from "react";
import {roomApi} from "../../../../../../api/common/room-api";
import {uid} from 'react-uid';
import {LoadingInline} from "../../../../../common/loading-inline/loading-inline";
import {ExamDateCard} from "./exam-date-card/exam-date-card";
import {examDateModal} from "../../../../../common/modal/exam-date-modal/exam-date-modal";

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

  openExamDateModal = () => {
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
    })
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
                      {...each}
                    />
                  )
                })

                }
              </div>
              <div className="exam-date-footer">
                <div className="row p-0 justify-content-end">
                  <button type="button" className="btn btn-success create-exam-date" onClick={this.openExamDateModal}>Tạo buổi thi</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
}