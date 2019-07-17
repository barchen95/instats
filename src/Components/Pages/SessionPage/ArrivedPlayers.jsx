import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { Typography } from "@material-ui/core";
import { AddPlayerDialog } from "./AddPlayerDialog";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
const useStyles = makeStyles({
  avatar: {
    margin: 10
  },

  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    width: 60,
    height: 60,
    backgroundColor: deepPurple[500]
  },
  card: {
    float: "left",
    width: "calc(100% - 25px)",
    maxHeight: "144px",
    overflowY: "scroll"
  },
  fab: {
    float: "right",
    bottom: "22px",
    position: "absolute"
  }
});

export const ArrivedPlayersComponent = props => {
  const classes = useStyles();
  const [display, setDisplay] = useState(false);

  function editPlayers() {
    setDisplay(true);
  }
  function renderAvatars(players) {
    return players.map(player => {
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
    });
  }

  return (
    <div style={{ display: "block", width: "calc(100% - 114px)" }}>
      <Card className={classes.card}>
        <div>
          <Typography>{props.courtPlayers.length} / 15</Typography>
        </div>
        <Grid container justify="center" alignItems="center">
          {renderAvatars(props.courtPlayers)}
        </Grid>
      </Card>
      <div style={{ float: "right" }}>
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          onClick={() => editPlayers()}
        >
          <EditIcon />
        </Fab>

        <AddPlayerDialog
          onClose={e => {
            setDisplay(false);
          }}
          open={display}
        />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { courtPlayers } = state.currentSession.courtPlayers;
  return {
    courtPlayers
  };
}

export const ArrivedPlayers = connect(
  mapStateToProps,
  null
)(ArrivedPlayersComponent);
