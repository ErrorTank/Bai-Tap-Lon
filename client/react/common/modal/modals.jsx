import React, {Fragment} from "react";
import {Modal} from "./modal";
import _ from "lodash";

export const appModal = {
  alert({text, title, btnText = "Confirm"}) {
    const modal = modals.openModal({
      content: (
        <div className="alert-modal">
          <div className="modal-header">
            <div className="modal-title">
              {title}
            </div>
            <i className="fas fa-times close-modal"
               onClick={() => modal.close()}
            />
          </div>
          <div className="modal-body">
            {text}
          </div>
          <div className="modal-footer">
            <button className="btn modal-btn confirm-btn"
                    onClick={() => modal.close()}
            >
              {btnText}
            </button>
          </div>
        </div>
      )
    });
    return modal.result;
  },
  confirm({text, title, btnText = "Confirm", cancelText = "Cancel"}) {
    const modal = modals.openModal({
      content: (
        <div className="confirm-modal">
          <div className="modal-header">
            <div className="modal-title">
              {title}
            </div>
            <i className="fas fa-times close-modal"
               onClick={() => modal.close(false)}
            />
          </div>
          <div className="modal-body">
            {text}
          </div>
          <div className="modal-footer">
            <button className="btn modal-btn confirm-btn"
                    onClick={() => modal.close(true)}
            >
              {btnText}
            </button>
            <button className="btn modal-btn cancel-btn"
                    onClick={() => modal.close(false)}
            >
              {cancelText}
            </button>
          </div>
        </div>
      )
    });
    return modal.result;
  }
};

export class ModalsRegistry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalList: []
    };

    modals.openModal = (options) => {
      let modalOptions = {
        options,
        resolve: null
      };

      let {modalList} = this.state;
      this.setState({
        modalList: modalList.concat([modalOptions])
      });
      let result = new Promise((resolve) => {
        modalOptions.resolve = resolve;
      });
      return {
        dismiss: () => {
          this.dismiss(modalOptions);
        },
        close: (result) => {
          this.close(modalOptions, result);
        },
        result: result
      };
    };
  }

  dismiss(modal) {
    _.remove(this.state.modalList, modal);
    modal.resolve();
    this.forceUpdate();
  }

  close(modal, result) {
    _.remove(this.state.modalList, modal);
    modal.resolve(result);
    this.forceUpdate();
  }

  render() {
    const {modalList} = this.state;


    return (
      <Fragment>
        {modalList.map((modal, i) => (
          <Modal
            key={i}
            isStack={modalList.length > 1}
            className={modal.options.className}
            content={modal.options.content}
            onDismiss={() => this.dismiss(modal)}
          />
        ))}
      </Fragment>
    );
  }
}

export const modals = {};

