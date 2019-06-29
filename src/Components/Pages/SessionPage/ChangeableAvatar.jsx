import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
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
  function onClick() {
    props.onClick(props.player, props.clicked);
  }
  return (
    <div className={classes.containter} onClick={() => onClick()}>
      <Avatar className={classes.avatar} src={props.player.imageURL} />
      {props.clicked && (
        <div className={classes.type}>
          <LocalActivityIcon />
        </div>
      )}
    </div>
  );
};
