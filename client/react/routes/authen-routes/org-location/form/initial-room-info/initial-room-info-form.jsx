import React from "react";
import {DataTable} from "../../../../../common/data-table/data-table";
import uniquid from "uniquid";

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
      cellDisplay: room => (
        <p className="locate-display">
          {room.locate}
        </p>
      ),
    }, {
      label: "",
      cellDisplay: room => (
        <div className="actions">
          <i className="fas fa-trash" onClick={() => this.removeRoom(room)}></i>
        </div>
      ),
    },
  ];

  renderHeader = (column, index) => (
    <th className={column.cellClass} key={index}>
      {column.label}
    </th>
  );


  handleClickRow = (e, room) => {

    let handleUpdate = (info) => {
      let {form, onChange} = this.props;
      onChange();
      form.updatePathData("rooms", form.getPathData("rooms").map((each) => {
        if (each.keyID === info.keyID)
          return {...info};
        return each;
      }));
    };
    roomInfoModal.open({
      onChange(info) {
        return new Promise((resolve) => {
          handleUpdate(info);
          resolve();
        })
      },
      value: room,
      confirmText: "Lưu thay đổi"
    });
  };

  handleCreateRoom = () => {
    let handleCreate = (info) => {
      let {form, onChange} = this.props;
      onChange();
      form.updatePathData("rooms", form.getPathData("rooms").concat({...info}));
    };

    roomInfoModal.open({
      onChange(info) {

        return new Promise((resolve) => {
          handleCreate({info, keyID: uniquid()});

          resolve();
        })
      },
      confirmText: "Tạo phòng"
    });
  };

  render() {
    let {form, err} = this.props;
    return (
      <div className="initial-room-info-form">
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
              {form.enhanceComponent("rooms", ({error, onEnter, onChange, value, ...others}) => (
                <div className="rooms-table-wrap">

                  <DataTable
                    className={"initial-room-table"}
                    columns={this.columns}
                    renderHeaderCell={this.renderHeader}
                    placeholder={"Không có phòng nào"}
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
              <button className="btn btn-success create-room" onClick={this.handleCreateRoom}>
                Tạo phòng
              </button>
            </div>


          </div>
        </div>

      </div>
    );
  }
}