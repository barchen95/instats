import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

export default class Column extends Component {
  renderAvatar = player => {
    if (player.imageURL) {
      return (
        <Chip
          avatar={<Avatar src={player.imageURL} />}
          label={player.firstName}
        />
      );
    } else {
      return (
        <Chip
          avatar={
            <Avatar>
              {" "}
              {player.firstName.charAt(0)}
              {player.lastName.charAt(0)}
            </Avatar>
          }
          label={player.firstName}
        />
      );
    }
  };
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
              {this.renderAvatar(player)}
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
