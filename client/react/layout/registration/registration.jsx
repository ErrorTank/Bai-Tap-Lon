import React from "react";

export class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    let {serverError, renderBody, renderFooter} = this.props;
    return (
      <div className="registration-route">
        <div className="registration-panel-wrap">
          <div className="registration-panel m-form m-form--state">
            <div className="panel-header">
              <div className="app-logo">
                <img src="./assets/img/Framelogo.svg"/>
              </div>
            </div>
            <div className="panel-body">
              {serverError && (
                <div className="err-server">
                  {serverError}
                </div>
              )}
              {renderBody()}
            </div>
            <div className="panel-footer">
              {renderFooter()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}