import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 150,
    width: "20vh",
    display: "flex",
    flexWrap: "wrap",
    overflowY: "scroll"
  },
  control: {
    padding: theme.spacing(2)
  },
  avatar: {
    margin: 10
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    width: 60,
    height: 60,
    backgroundColor: deepPurple[500]
  },
  bigAvatar: {
    margin: 10,
    width: 50,
    height: 50
  },
  margin: {
    ".MuiBadge-badge": {
      margin: "-500px"
    }
  },
  antiMargin: {
    margin: "-50px"
  }
}));

function generateAvatars(players, classes) {
  return players.map(player => {
    if (player.imageURL) {
      return (
        <Avatar
          alt="Remy Sharp"
          src={player.imageURL}
          className={classes.bigAvatar}
        />
      );
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

export default function SpacingGrid(props) {
  const [spacing] = React.useState(2);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {props.teams.map(value => (
            <Grid key={value} item>
              <Paper className={classes.paper}>
                {generateAvatars(value.players, classes)}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
