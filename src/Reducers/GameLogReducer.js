import { gameLogConstants } from "Constants";
const initialUserState = {
  logArray: []
};
export function gameLogReducer(state = initialUserState, action) {
  switch (action.type) {
    case gameLogConstants.WRITE: {
      return {
        ...state,
        logArray: [...state.logArray, action.payload]
      };
    }

    case gameLogConstants.INIT: {
      return {
        ...state,
        logArray: []
      };
    }
    default:
      return state;
  }
}
