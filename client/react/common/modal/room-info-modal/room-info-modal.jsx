import React from "react";
import {modals} from "../modals";

export class RoomInfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  };

  render() {
    let {onChange, onClose} = this.props;
    return (
      <div className="room-info-modal">
      </div>
    );
  }
}

export const roomInfoModal = {
  open({onChange}){
    const modal = modals.openModal({
      content: (
        <RoomInfoModal
          onChange={onChange}
          onClose={() => modal.close()}
        />
      )
    });
    return modal.result;
  }
};