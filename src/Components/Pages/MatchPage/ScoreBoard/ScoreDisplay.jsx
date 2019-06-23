import React from "react";
import Typography from "@material-ui/core/Typography";

export default function ScoreDisplay(props) {
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        {props.homeTeamScore} : {props.awayTeamScore}
      </Typography>
    </div>
  );
}
