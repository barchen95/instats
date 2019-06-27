import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import ExpPanel from "Components/General/ExpPanel";
import { ArrivedPlayers } from "./ArrivedPlayers";
import { Analytics } from "./Analytics";
import { Teams } from "./Teams";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles({
  card: {
    minWidth: 275
  }
});
export const SessionPage = () => {
  const classes = useStyles();

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
      >
        Start game
      </Button>
    </div>
  );
};
