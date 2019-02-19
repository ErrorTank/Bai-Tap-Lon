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
    },{
      label: "Địa điểm",
      cellDisplay: room => room.locate,
    }, {
      label: "Sức chứa (Số người)",
      cellDisplay: room => room.maxSeat,
    }
  ];

  renderHeader = (column, index) => (
    <th className={column.cellClass} key={index}>
      {column.label}
    </th>
  );



  handleClickRow = (e, room) => {
    roomInfoModal.open({

    }).then
  };

  render() {
    let {form, err, onChange: propsOnChange, renderNavigate = () => null} = this.props;
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
                <DataTable
                  className={"initial-room-table"}
                  columns={this.columns}
                  renderHeaderCell={this.renderHeader}
                  placeholder={"Không có phòng nào"}
                  rows={value}
                  clickRow={this.handleClickRow}
                />
              ), true)}
            </div>


          </div>


        </div>

      </div>
    );
  }
}