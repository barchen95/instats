import { combineReducers } from "redux";

import { authentication } from "./AuthReducer";
import { alert } from "./AlertReducer";
import { modal } from "./ModalReducer";
import { teamsReducer } from "./MatchReducer";
import { timeReducer } from "./TimeReducer";
import { gameLogReducer } from "./GameLogReducer";
import { scoreReducer } from "./ScoreReducer";
import { matchStatusReducer } from "./matchStatusReducer";
const rootReducer = combineReducers({
  authentication,
  alert,
  currentMatch: combineReducers({
    score: scoreReducer,
    matchStatus: matchStatusReducer,
    teams: teamsReducer,
    time: timeReducer,
    gameLog: gameLogReducer
  }),
  modal
});

export default rootReducer;
