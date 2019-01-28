import React from "react";

export class AuthenLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  render() {
    return (
      <div className="authen-layout">
        {this.props.children}
      </div>
    );
  }
}
