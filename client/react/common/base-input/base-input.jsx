import React from 'react';
import classnames from "classnames";


export class InputBase extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {className, success = false, error = false, label = null,   helper = null, id, ...others} = this.props;
    return (
      <div className={classnames(
        "form-group m-form__group",
        className,
        {
          "has-success": success,
          "has-danger": error
        },
      )}>
        {label && (
          <label className="form-control-label" htmlFor={id}>{label}</label>
        )}
        <input type="text"
               className="form-control m-input"
               id={id}
               {...others}
        />
        {(error) && (
          <div className="form-control-feedback">{error.message}</div>
        )}
        {helper && (
          <span className="m-form__help">{helper}</span>
        )}

      </div>
    );
  }
}
