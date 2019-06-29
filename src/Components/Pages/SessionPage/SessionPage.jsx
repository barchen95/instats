import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import ExpPanel from "Components/General/ExpPanel";
import { ArrivedPlayers } from "./ArrivedPlayers";
import { Analytics } from "./Analytics";
import { Teams } from "./Teams";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
const useStyles = makeStyles({
  card: {
    minWidth: 275
  }
});
const SessionPageComponent = props => {
  const classes = useStyles();
  let startButtonDisabled = false;
  if (props.sessionTeams) {
    debugger;
    startButtonDisabled =
      props.sessionTeams[0].length == props.sessionTeams[1].length &&
      props.sessionTeams[0].length == 5;
  }
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
};

function mapStateToProps(state) {
  const { sessionTeams } = state.currentSession.courtPlayers;
  return {
    sessionTeams
  };
}

export const SessionPage = connect(
  mapStateToProps,
  null
)(SessionPageComponent);
