import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import CancelIcon from "@material-ui/icons/Cancel";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Casino";
import { FaFutbol } from "react-icons/fa";

const styles = theme => ({
  root: {
    height: 380
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2)
  },

  Button: {
    backgroundColor: theme.palette.secondary.main
  }
});

const actions = [
  { icon: <FaFutbol />, name: "Goal" },
  { icon: <CancelIcon />, name: "Missed Penelty" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
  { icon: <DeleteIcon />, name: "Delete" }
];

class OpenIconSpeedDial extends React.Component {
  state = {
    open: false,
    hidden: false
  };

  handleVisibility = () => {
    this.setState(state => ({
      open: false,
      hidden: !state.hidden
    }));
  };

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    const { hidden, open } = this.state;

    return (
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          className={classes.speedDial}
          hidden={hidden}
          direction="down"
          ButtonProps={{ className: classes.Button }}
          icon={<FaFutbol style={{ fontSize: "3em" }} />}
          onBlur={this.handleClose}
          onClick={this.handleClick}
          onClose={this.handleClose}
          open={open}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={this.handleClick}
            />
          ))}
        </SpeedDial>
      </div>
    );
  }
}

OpenIconSpeedDial.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OpenIconSpeedDial);
