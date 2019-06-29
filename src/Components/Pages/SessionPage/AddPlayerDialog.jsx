import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { SelectionGrid } from "./AddPlayerDialogContent";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AddPlayerDialogComponent(props) {
  function handleClose() {
    props.onClose();
  }

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Add arrive"}</DialogTitle>
      <DialogContent>
        <SelectionGrid />
      </DialogContent>
    </Dialog>
  );
}

function mapStateToProps(state) {
  const { courtPlayers } = state.currentSession.courtPlayers;
  return {
    courtPlayers
  };
}

export const AddPlayerDialog = connect(
  mapStateToProps,
  null
)(AddPlayerDialogComponent);
