import { currentMatchConstants } from "Constants";
export function teamsReducer(state = {}, action) {
  switch (action.type) {
    case currentMatchConstants.SET_TEAMS:
      return {
        teams: action.payload.slice(0, 2)
      };

    case currentMatchConstants.NEW_GOAL: {
      const { team, scorer, assisted } = action.payload;
      state.teams[team].players[scorer].asScored = true;
      state.teams[team].players[assisted].asAssisted = true;
      return { ...state };
    }

    default:
      return state;
  }
}
