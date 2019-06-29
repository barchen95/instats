import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { FaFire } from "react-icons/fa";

import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    width: "60vh",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  right: {
    textAlign: "right",
    width: "60vh",

    direction: "rtl"
  },
  left: {
    textAlign: "left",
    width: "60vh",

    direction: "ltr"
  },
  center: {
    textAlign: "center",
    width: "60vh"
  }
}));

function GameLogComponent(props) {
  function formatValue(value) {
    // eslint-disable-next-line
    if (value == -1) {
      return `00`;
    }
    return `${value < 10 ? `0${value}` : value}`;
  }

  function renderLogs(classes) {
    return props.logArray.map(log => {
      if (log.type) {
        return (
          <React.Fragment>
            <Divider className={classes.center} component="li" />
            <ListItem className={classes.center}>
              <ListItemAvatar>
                <Avatar>
                  <FaFire />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Extra Time" />
              <ListItemAvatar>
                <Avatar>
                  <FaFire />
                </Avatar>
              </ListItemAvatar>
            </ListItem>
            <Divider
              className={classes.center}
              variant="fullWidth"
              component="li"
            />
          </React.Fragment>
        );
      }
      return (
        <React.Fragment>
          <ListItem className={log.team == 1 ? classes.right : classes.left}>
            <ListItemAvatar>
              <Avatar alt="playerPic" src={log.scorer.imageURL} />
            </ListItemAvatar>
            <ListItemText
              primary={"Goal by " + log.scorer.name}
              secondary={
                formatValue(log.time.minutes) +
                ":" +
                formatValue(log.time.seconds)
              }
            />
          </ListItem>
          <Divider
            className={log.team == 1 ? classes.right : classes.left}
            variant="fullWidth"
            component="li"
          />
        </React.Fragment>
      );
    });
  }
  const classes = useStyles();
  return <List className={classes.root}>{renderLogs(classes)}</List>;
}

function mapStateToProps(state) {
  const { logArray } = state.currentMatch.gameLog;
  return {
    logArray
  };
}

export const GameLog = connect(
  mapStateToProps,
  null
)(GameLogComponent);
