import { timeConstants } from "Constants";

export function timeReducer(state = {}, action) {
  switch (action.type) {
    case timeConstants.UPDATE_TIME:
      return {
        ...action.payload
      };
    case timeConstants.INIT_TIME:
      return {};
    case timeConstants.GAME_STOP:
      return {
        ...action.payload
      };

    default:
      return state;
  }
}
