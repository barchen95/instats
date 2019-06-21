import React, { Component } from "react";
import { StopWatch } from "./StopWatch";
// import ActionMenu from "./ActionMenu/ActionMenu";
import { GoalButton } from "./GoalButton/GoalButton";
import { ScoreBoard } from "./ScoreBoard";
import { GameLog } from "./GameLog";

export class MatchPage extends Component {
  render() {
    return (
      <div
        style={{
          height: "80vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ScoreBoard />
        <GameLog />
        <StopWatch />
        <GoalButton />
      </div>
    );
  }
}
