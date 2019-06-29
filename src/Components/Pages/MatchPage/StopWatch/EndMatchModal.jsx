import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import Slide from "@material-ui/core/Slide";
import { ScoreBoard } from "../ScoreBoard";

import { makeStyles } from "@material-ui/core/styles";
import { currentMatchActions } from "Actions";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles(theme => ({
  root: {
    top: "100px",
    maxWidth: "60vh",
    margin: theme.spacing(1)
  }
}));

function EndMatchModalComponent(props) {
  const classes = useStyles();

  function handleSubmit() {
    const { dispatch } = props;

    dispatch(currentMatchActions.saveMatch());
  }
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      className={classes.root}
    >
      <DialogTitle id="alert-dialog-slide-title">{"Game Over?"}</DialogTitle>
      <DialogContent>
        <ScoreBoard />

        <Button
          onClick={e => handleSubmit(e)}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Save Match
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export const EndMatchModal = connect(
  null,
  null
)(EndMatchModalComponent);
