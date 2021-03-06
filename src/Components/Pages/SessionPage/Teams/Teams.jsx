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
  function removeDndIndex(index) {
    let newIndex = index.replace("drag-", "");
    newIndex = newIndex.replace("drop-", "");

    return newIndex;
  }
  function dragEnd(param) {
    const { dispatch } = props;
    dispatch(
      currentSessionActions.movePlayerBetweenTeams(
        removeDndIndex(param.draggableId),
        removeDndIndex(param.source.droppableId) - 1,
        removeDndIndex(param.destination.droppableId) - 1
      )
    );
  }
  function generateTeams() {
    const { dispatch } = props;
    dispatch(currentSessionActions.mixPlayers());
  }
  function renderItems() {
    if (props.sessionTeams && props.sessionTeams.length > 0) {
      return (
        <DragDropContext
          onDragEnd={param => dragEnd(param)}
          style={{ margin: 0, width: "100%" }}
        >
          <Grid
            container
            spacing={2}
            style={{ margin: 0, width: "100%", display: "flex" }}
          >
            {props.sessionTeams.map((team, index) => {
              return <Column teamIndex={index + 1} team={team} />;
            })}
          </Grid>
        </DragDropContext>
      );
    } else if (props.courtPlayers.length >= 10) {
      return (
        <Fab
          onClick={() => {
            generateTeams();
          }}
        >
          Generate teams
        </Fab>
      );
    } else {
      return <div />;
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
