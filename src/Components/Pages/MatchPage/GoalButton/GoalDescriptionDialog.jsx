import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { modalActions } from "Actions";
import { GoalDescriptionForm } from "./GoalDescriptionForm";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function AlertDialogSlide(props) {
  function handleClose() {
    const { dispatch } = props;

    dispatch(modalActions.close());
  }

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Who scored?"}</DialogTitle>
        <DialogContent>
          <GoalDescriptionForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  const { open } = state.modal;
  return {
    open
  };
}

export const GoalDescriptionDialog = connect(
  mapStateToProps,
  null
)(AlertDialogSlide);
