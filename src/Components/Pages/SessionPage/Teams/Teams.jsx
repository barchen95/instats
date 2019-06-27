import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Column from "./Column";
import Grid from "@material-ui/core/Grid";
import { currentSessionActions } from "Actions";
import { connect } from "react-redux";
import { Fab } from "@material-ui/core";
const TeamsComponent = props => {
  const initialData = {
    columns: {
      "column-1": {
        id: "column-1",
        title: "Team 1",
        players: []
      },
      "column-2": {
        id: "column-2",
        title: "Team 2",
        players: []
      }
    },
    columnOrder: ["column-1"]
  };

  function generateTeams() {
    const { dispatch } = props;
    dispatch(currentSessionActions.mixPlayers());
  }
  function renderItems() {
    if (props.sessionTeams) {
      return (
        <DragDropContext style={{ margin: 0, width: "100%" }}>
          <Grid
            container
            spacing={2}
            style={{ margin: 0, width: "100%", display: "flex" }}
          >
            {props.sessionTeams.map((team, index) => {
              return <Column teamIndex={index + 1} players={team} />;
            })}
          </Grid>
        </DragDropContext>
      );
    } else {
      return (
        <Fab
          onClick={() => {
            generateTeams();
          }}
        >
          Generate teams
        </Fab>
      );
    }
  }
  return <>{renderItems()}</>;
};

function mapStateToProps(state) {
  const { courtPlayers, sessionTeams } = state.currentSession.courtPlayers;
  return {
    courtPlayers,
    sessionTeams
  };
}

export const Teams = connect(
  mapStateToProps,
  null
)(TeamsComponent);
