import ScoreDisplay from "./ScoreDisplay";
import AvatarDisplay from "./AvatarDisplay";
import { connect } from "react-redux";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

function SimpleCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <ScoreDisplay
        homeTeamScore={props.homeScore}
        awayTeamScore={props.awayScore}
      />
      <AvatarDisplay teams={props.teams} />
    </Card>
  );
}

function mapStateToProps(state) {
  // const { teams } = state.currentMatch.teams;

  debugger;
  const teams = state.currentMatch.teams.teams;
  const { score } = state.currentMatch;

  const homeScore = score.currentScore[0];
  const awayScore = score.currentScore[1];

  return {
    teams,
    homeScore,
    awayScore
  };
}

export const ScoreBoard = connect(
  mapStateToProps,
  null
)(SimpleCard);
