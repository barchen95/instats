import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

import ArrivedPlayers from "./ArrivedPlayers";
const useStyles = makeStyles({
  card: {
    minWidth: 275
  }
});
export const SessionPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.card}>
        <ArrivedPlayers />
      </Card>
      <Card className={classes.card} />
      <Card className={classes.card} />
    </div>
  );
};
