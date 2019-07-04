import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
export default class Column extends Component {
  renderPlayers = players => {
    return players.map((player, key) => {
      return (
        <Draggable draggableId={`drag-` + player.id} index={key}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Chip
                avatar={<Avatar alt="Natacha" src={player.imageURL} />}
                label={player.firstName}
              />
            </div>
          )}
        </Draggable>
      );
    });
  };
  render() {
    const { players } = this.props.team;
    return (
      <Droppable droppableId={`drop-` + this.props.teamIndex}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? "blue" : "#6495ED",
              flexGrow: 1
            }}
            {...provided.droppableProps}
          >
            <h2>
              {" "}
              Team {this.props.teamIndex} {players.length} {"/5"}{" "}
            </h2>
            {provided.placeholder}
            {this.renderPlayers(players)}
          </div>
        )}
      </Droppable>
    );
  }
}
