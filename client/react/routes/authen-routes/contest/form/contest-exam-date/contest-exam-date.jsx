import React from "react";
import {roomApi} from "../../../../../../api/common/room-api";
import {uid} from 'react-uid';
import {LoadingInline} from "../../../../../common/loading-inline/loading-inline";
import {ExamDateCard} from "./exam-date-card/exam-date-card";

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
              Tìm thấy {this.state.rooms.length} phòng
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
                  <button type="button" className="btn btn-success" onClick={this.openExamDateModal}>Tạo buổi thi</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }
}