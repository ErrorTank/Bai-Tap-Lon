import React from "react";
import moment from "moment"

export class ExamDateCard extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let {start, stop, content, room, onClose, onClick} = this.props;
    return (
      <div className="exam-date-card" onClick={onClick}>
        <div className="edc-header">
          <p className="edc-title">Thông tin buổi thi</p>
          <i className="fas fa-times rm-edc" onClick={e => {
            e.stopPropagation();
            onClose()
          }}></i>
        </div>
        <div className="edc-body">
          <div className="row">
            <div className="col-4 p-0 content-title">
              Bắt đầu :
            </div>
            <div className="col-8 p-0 display-time">{moment(start).format("DD/MM/YYYY HH:mm")}</div>
          </div>
          <div className="row">
            <div className="col-4 p-0 content-title">
              Kết thúc :
            </div>
            <div className="col-8 p-0 display-time">{moment(stop).format("DD/MM/YYYY HH:mm")}</div>
          </div>
          <div className="row">
            <div className="col-4 p-0 content-title">
              Nội dung :
            </div>
            <div className="col-8 p-0 display-content">{content}</div>
          </div>
          <div className="row">
            <div className="col-4 p-0 content-title">
              Địa điểm :
            </div>
            <div className="col-8 p-0 display-content">{room.name}</div>
          </div>
          <div className="row">
            <div className="col-4 p-0 content-title">
              Tối đa :
            </div>
            <div className="col-8 p-0 display-content">{room.maxSeat} thí sinh</div>
          </div>
        </div>
      </div>
    );
  }
}