import React, { useEffect } from "react";
import { StopWatch } from "./StopWatch";
import { GoalButton } from "./GoalButton/GoalButton";
import { ScoreBoard } from "./ScoreBoard";
import { GameLog } from "./GameLog";

export const MatchPage = () => {
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
};
