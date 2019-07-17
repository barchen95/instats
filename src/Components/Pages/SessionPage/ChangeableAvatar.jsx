import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles({
  type: {
    width: "50px",
    height: "50px",
    backgroundColor: "#4CAF50",
    borderRadius: "50%",
    opacity: 0.5,
    textAlign: "center",
    fontSize: "33px"
  },
  purpleAvatar: {
    width: "50px",
    height: "50px",
    backgroundColor: deepPurple[500]
  },
  containter: {
    width: "50px",
    height: "50px"
  },
  avatar: {
    width: "50px",
    height: "50px",
    position: "absolute"
  }
});

export const ChangeableAvatar = props => {
  const classes = useStyles();

  function renderAvatar(props) {
    const { player } = props;
    if (player.imageURL != "") {
      return <Avatar src={player.imageURL} className={classes.bigAvatar} />;
    } else {
      return (
        <Avatar className={classes.purpleAvatar}>
          {" "}
          {player.firstName.charAt(0)}
          {player.lastName.charAt(0)}
        </Avatar>
      );
    }
  }
  function onClick() {
    props.onClick(props.player, props.clicked);
  }
  return (
    <div className={classes.containter} onClick={() => onClick()}>
      {renderAvatar(props)}
    </div>
  );
};
