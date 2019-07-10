import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { playerService } from "Services";
import { ChangeableAvatar } from "./ChangeableAvatar";
import { currentSessionActions } from "Actions";
import { courtConstants } from "Constants";
const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto"
  },
  paper: {
    width: 200,
    height: 230,
    overflow: "auto"
  },
  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

async function getPlayers(setPlayers) {
  const players = await playerService.getAll();
  setPlayers(players);
}
function SelectionGridComponent(props) {
  const [players, setPlayers] = useState([]);
  const classes = useStyles();
  if (players.length === 0) getPlayers(setPlayers);

  function addPlayerToMatch(player, clicked) {
    const { dispatch } = props;
    clicked
      ? dispatch(
          currentSessionActions.updateCourtPlayerStatus(
            player,
            courtConstants.REMOVE_PLAYER
          )
        )
      : dispatch(
          currentSessionActions.updateCourtPlayerStatus(
            player,
            courtConstants.ADD_PLAYER
          )
        );
  }

  function renderAvatars(players) {
    return players.map(player => {
      const a = props.courtPlayers.find(x => {
        return x.id == player.id;
      });
      return (
        <ChangeableAvatar
          clicked={a != undefined}
          onClick={(e, y) => {
            addPlayerToMatch(e, y);
          }}
          player={player}
        />
      );
    });
  }

  if (players.length === 0) {
    return <div />;
  } else {
    return <Grid className={classes.paper}>{renderAvatars(players)}</Grid>;
  }
}

function mapStateToProps(state) {
  const { courtPlayers } = state.currentSession.courtPlayers;
  return {
    courtPlayers
  };
}

export const SelectionGrid = connect(
  mapStateToProps,
  null
)(SelectionGridComponent);
