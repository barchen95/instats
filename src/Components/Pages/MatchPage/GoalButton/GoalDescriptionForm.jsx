import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { currentMatchActions } from "Actions";
const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "45vh"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

class GoalDescriptionFormComponent extends Component {
  state = {
    team: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleClick = e => {
    this.props.goalScored(
      this.state.team,
      this.state.scored,
      this.state.assisted
    );
  };
  teamSelect = e => {
    this.setState({
      [e.target.name]: e.target.value,
      scored: undefined,
      assisted: undefined
    });
  };

  renderPlayers = () => {
    if (this.state.team !== "") {
      return this.props.teams[this.state.team].players.map((player, key) => {
        return <option value={key}>{player.name}</option>;
      });
    }
    return null;
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="team-simple">Team</InputLabel>
          <NativeSelect
            name="team"
            value={this.state.team}
            onChange={e => this.handleChange(e)}
          >
            <option value={""}> </option>
            <option value={0}>Team 1</option>
            <option value={1}>Team 2</option>
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="team-simple">Scored</InputLabel>
          <NativeSelect
            name="scored"
            value={this.state.scored}
            onChange={e => this.handleChange(e)}
          >
            <option value={""}> </option>

            {this.renderPlayers()}
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="team-simple">Assisted</InputLabel>
          <NativeSelect
            name="assisted"
            value={this.state.assisted}
            onChange={e => this.handleChange(e)}
          >
            <option value={""}> </option>
            {this.renderPlayers()}
          </NativeSelect>
        </FormControl>

        <Button
          size="large"
          variant="contained"
          className={classes.formControl}
          color={"primary"}
          onClick={e => {
            this.handleClick(e);
          }}
        >
          Confirm
        </Button>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  const { teams } = state.currentMatch.teams;
  return {
    teams
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goalScored: (team, scored, assisted) => {
      dispatch(currentMatchActions.goalScored(team, scored, assisted));
    }
  };
}

export const GoalDescriptionForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(GoalDescriptionFormComponent));
