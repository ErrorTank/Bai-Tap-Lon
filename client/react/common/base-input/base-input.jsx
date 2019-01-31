import React from 'react';
import classnames from "classnames";


export class InputBase extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {className, success = false, fail = false, label = null, value = '', notify = null, helper = null, ...others} = this.props;
    return (
      <div className={classnames(
        "form-group m-form__group",
        className,
        {
          "has-success": success,
          "has-danger": fail
        },
      )}>
        {label && (
          <label className="form-control-label" htmlFor="input">{label}</label>
        )}
        <input type="text"
               className="form-control m-input"
               id="input"
               value={value}
               {...others}
        />
        {(notify && (fail || success)) (
          <div className="form-control-feedback">{notify}</div>
        )}
        {helper && (
          <span className="m-form__help">{helper}</span>
        )}

      </div>
    );
  }
}
