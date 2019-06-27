import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

export default class AvatarBadge extends Component {
  render() {
    return (
      <Chip
        avatar={<Avatar alt="Natacha" src={this.props.player.imageURL} />}
        label={this.props.player.name}
        variant="outlined"
      />
    );
  }
}
