import React, {Fragment} from "react";

export class LocationTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevPath: null
    };
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location })
    }
  }

  render() {
    return (
      <Fragment>
        {this.props.render(this.state.prevPath)}
      </Fragment>
    );
  }
}
