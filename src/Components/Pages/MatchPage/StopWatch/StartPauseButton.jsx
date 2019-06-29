import React, { Component } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { FaFire } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";

const styles = theme => ({
  fab: {
    margin: theme.spacing(1),
    fontSize: "5em",
    width: "30vh",
    height: "30vh"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  icon: {
    fontSize: "1.5em"
  }
});
class ActionButtonsComponent extends Component {
  state = {
    isPaused: true,
    isExtraTime: true
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.showExtraTime && this.state.isExtraTime && (
          <React.Fragment>
            <Fab
              variant="extended"
              color="secondary"
              aria-label="Add"
              className={classes.margin}
              onClick={e => {
                this.props.onExtraTime();
                this.setState({ isPaused: false, isExtraTime: false });
              }}
            >
              <AddIcon className={classes.extendedIcon} />
              Extra time{" "}
            </Fab>
          </React.Fragment>
        )}
        {this.props.showPenalties && (
          <Fab
            variant="extended"
            color="secondary"
            aria-label="Add"
            className={classes.margin}
            onClick={e => {
              this.props.onPenalties();
            }}
          >
            <FaFire className={classes.extendedIcon} />
            Penalties
          </Fab>
        )}

        {this.props.showEndMatch && (
          <Fab
            variant="extended"
            color="secondary"
            aria-label="Add"
            className={classes.margin}
            onClick={e => {
              this.props.onEndMatch();
            }}
          >
            <FaHandshake className={classes.extendedIcon} />
            End Match
          </Fab>
        )}
        {this.state.isPaused ? (
          <Fab
            color="primary"
            aria-label="Play"
            className={classes.fab}
            onClick={e => {
              this.props.onStart();
              this.setState({ isPaused: false });
            }}
          >
            <PlayIcon className={classes.icon} />
          </Fab>
        ) : (
          <Fab
            color="primary"
            aria-label="Pause"
            className={classes.fab}
            onClick={e => {
              this.props.onPause();
              this.setState({ isPaused: true });
            }}
          >
            <PauseIcon className={classes.icon} />
          </Fab>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {}

export const ActionButtons = connect(
  mapStateToProps,
  null
)(withStyles(styles)(ActionButtonsComponent));
