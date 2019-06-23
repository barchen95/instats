import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

export default class TimeDisplay extends Component {
  getComponent(key) {
    return this.props.children.filter(comp => {
      return comp.key === key;
    });
  }
  render() {
    return (
      <div>
        <Typography variant="h2" gutterBottom>
          {this.getComponent("minutes")} : {this.getComponent("seconds")}
        </Typography>
      </div>
    );
  }
}
