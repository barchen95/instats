import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { FaFutbol } from "react-icons/fa";
import { GoalDescriptionDialog } from "./GoalDescriptionDialog";
import { connect } from "react-redux";
import { modalActions } from "Actions";
const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    marginTop: "-125px",
    marginLeft: "50px",
    width: "125px",
    height: "125px"
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function GoalButtonComponent(props) {
  const classes = useStyles();
  function onButtonClick() {
    const { dispatch } = props;

    dispatch(modalActions.open());
  }
  return (
    <div>
      <Fab
        onClick={e => {
          onButtonClick();
        }}
        color="secondary"
        aria-label="Add"
        className={classes.fab}
      >
        <FaFutbol style={{ fontSize: "3em" }} />
      </Fab>
      <GoalDescriptionDialog />
    </div>
  );
}
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

export const GoalButton = connect(
  mapStateToProps,
  null
)(GoalButtonComponent);
