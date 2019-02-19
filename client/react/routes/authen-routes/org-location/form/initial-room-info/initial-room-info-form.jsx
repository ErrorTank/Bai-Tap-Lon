import React from "react";
import {DataTable} from "../../../../../common/data-table/data-table";

import {roomSchema} from "../../../schema";
import {roomInfoModal} from "../../../../../common/modal/room-info-modal/room-info-modal";


export class InitialRoomInfoForm extends React.Component {
  constructor(props) {
    super(props);

  };

  columns = [
    {
      label: "Tên phòng thi",
      cellDisplay: room => room.name,
    }, {
      label: "Sức chứa (Số người)",
      cellDisplay: room => room.maxSeat,
    }, {
      label: "Địa điểm",
      cellDisplay: room => room.locate,
    },
  ];

  renderHeader = (column, index) => (
    <th className={column.cellClass} key={index}>
      {column.label}
    </th>
  );


  handleClickRow = (e, room) => {
    roomInfoModal.open({
      onChange(info) {
        let {form, onChange} = this.props;
        return new Promise((resolve) => {
          onChange();
          form.updatePathData("rooms", form.getPathData("rooms").map(each => {
            if (each.roomID === room.roomID)
              return {...info};
            return each;
          }));
          resolve();
        })
      },
      value: room,
      confirmText: "Lưu thay đổi"
    });
  };

  handleCreateRoom = () => {
    roomInfoModal.open({
      onChange(info) {
        let {form, onChange} = this.props;
        return new Promise((resolve) => {
          onChange();
          form.updatePathData("rooms", form.getPathData("rooms").map(each => {
            if (each.roomID === room.roomID)
              return {...info};
            return each;
          }));
          resolve();
        })
      },
      confirmText: "Lưu thay đổi"
    });
  };

  render() {
    let {form, err} = this.props;
    return (
      <div className="supervisor-info-form">
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

            <div className="col-12">
              {form.enhanceComponent("rooms", ({error, onEnter, onChange, value, ...others}) => (
                <div className="rooms-table-wrap">

                  <DataTable
                    className={"initial-room-table"}
                    columns={this.columns}
                    renderHeaderCell={this.renderHeader}
                    placeholder={"Không có phòng nào"}
                    rows={value}
                    clickRow={this.handleClickRow}
                  />
                </div>

              ), true)}
            </div>


          </div>

          <div className="row justify-content-end">

            <button className="btn btn-primary" onClick={this.handleCreateRoom}>
              Tạo phòng
            </button>


          </div>
        </div>

      </div>
    );
  }
}