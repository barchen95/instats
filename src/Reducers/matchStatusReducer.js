import { matchStatusConstants } from "Constants";

export function matchStatusReducer(
  state = matchStatusConstants.WAIT_TO_START,
  action
) {
  switch (action.type) {
    case matchStatusConstants.CHANGE_STATUS: {
      return action.payload;
    }

    default:
      return state;
  }
}
