import React from "react";
import {modals} from "../modals";
import {KComponent} from "../../k-component";
import {createSimpleForm} from "../../form-validator/form-validator";
import {roomSchema} from "../../../routes/authen-routes/schema";

export class RoomInfoModal extends KComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.form = createSimpleForm(roomSchema, {
      initData: props.value ? {...props.value} : {
        name: "",
        locate: "",
        maxSeat: ""
      }
    });
  };

  handleConfirm = () => {
    let data = this.form.getData();
    this.setState({loading: true});
    this.props.onChange(data);
  };

  render() {
    let {onChange, onClose, confirmText} = this.props;
    return (
      <div className="room-info-modal">
        <div className="modal-header">
          <div className="modal-title">
            {title}
          </div>
          <i className="fas fa-times close-modal"
             onClick={() => onClose()}
          />
        </div>
        <div className="modal-body">
          <p>{text}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={() => onClose()}>
            Hủy bỏ
          </button>
          <button type="button" className="btn btn-primary" onClick={this.handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    );
  }
}

export const roomInfoModal = {
  open({onChange, value, confirmText}){
    const modal = modals.openModal({
      content: (
        <RoomInfoModal
          onChange={(data) => onChange(data).then(() => modal.close())}
          onClose={() => modal.close()}
          value={value}
          confirmText={confirmText}
        />
      )
    });
    return modal.result;
  }
};