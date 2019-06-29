import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { FaFutbol } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
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
    if (player.asScored) {
      return (
        <React.Fragment className={classes.margin}>
          <Badge
            className={{ root: classes.antiMargin }}
            badgeContent={<FaFutbol />}
            color="secondary"
          >
            <Avatar
              alt="Remy Sharp"
              src={player.imageURL}
              className={classes.bigAvatar}
            />
          </Badge>
        </React.Fragment>
      );
    }

    if (player.asAssisted) {
      return (
        <Badge badgeContent={<GiChefToque />} color="secondary">
          <Avatar
            alt="Remy Sharp"
            src={player.imageURL}
            className={classes.bigAvatar}
          />
        </Badge>
      );
    }
    return (
      <Avatar
        alt="Remy Sharp"
        src={player.imageURL}
        className={classes.bigAvatar}
      />
    );
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
                {generateAvatars(value, classes)}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
