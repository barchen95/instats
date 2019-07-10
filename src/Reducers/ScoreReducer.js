import { scoreConstants } from "Constants";

const currentScore = [0, 0];
export function scoreReducer(state = { currentScore }, action) {
  switch (action.type) {
    case scoreConstants.NEW_GOAL:
      const { team } = action.payload;

      state.currentScore[team]++;
      return state;

    case scoreConstants.INIT_SCORE:
      state.currentScore = [0, 0];

      return state;

    default:
      return state;
  }
}
