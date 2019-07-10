import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpPanel from "Components/General/ExpPanel";
import { ArrivedPlayers } from "./ArrivedPlayers";
import { Analytics } from "./Analytics";
import { Teams } from "./Teams";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import { currentSessionActions } from "Actions";
import { CurrentSessionService } from "../../../Services/CurrentSessionService";
const useStyles = makeStyles({
  card: {
    minWidth: 275
  }
});

function isToday(date) {
  const today = new Date();
  const time = new Date(date);
  if (time) {
    return (
      time.getDate() == today.getDate() &&
      time.getMonth() == today.getMonth() &&
      time.getFullYear() == today.getFullYear()
    );
  } else return false;
}
async function getCurrentSession(props) {
  const session = await CurrentSessionService.getCurrentSession();

  if (session && isToday(session.createdDate)) {
    const { dispatch } = props;
    dispatch(currentSessionActions.setCurrentSession(session));
  }
  return session;
}
const SessionPageComponent = props => {
  const classes = useStyles();
  function createSession() {
    const { dispatch } = props;

    dispatch(currentSessionActions.createSession());
  }
  let startButtonDisabled = false;
  if (props.sessionTeams && props.sessionTeams.length > 0) {
    startButtonDisabled =
      props.sessionTeams[0].players.length ==
        props.sessionTeams[1].players.length &&
      props.sessionTeams[0].players.length == 5;
  }

  if (!props.sessionID) {
    getCurrentSession(props);
  }
  if (props.sessionID) {
    return (
      <div>
        <ExpPanel header={"Players"} component={<ArrivedPlayers />} />
        <ExpPanel header={"Teams"} component={<Teams />} />
        <ExpPanel header={"Analytics"} component={<Analytics />} />
        <Button
          className={classes.cell}
          color="primary"
          component={Link}
          to="/currentmatch"
          variant="contained"
          disabled={!startButtonDisabled}
        >
          Start game
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <Button
          onClick={() => {
            createSession();
          }}
          className={classes.cell}
          color="primary"
          variant="contained"
        >
          Create Session
        </Button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  const { sessionTeams, sessionID } = state.currentSession.courtPlayers;
  return {
    sessionID,
    sessionTeams
  };
}

export const SessionPage = connect(
  mapStateToProps,
  null
)(SessionPageComponent);
