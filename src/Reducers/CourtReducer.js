import { courtConstants } from "Constants";
import _ from "lodash";
const team = [];
const initialState = {
  courtPlayers: team
};
export function courtReducer(state = initialState, action) {
  switch (action.type) {
    case courtConstants.ADD_PLAYER:
      return {
        ...state,
        courtPlayers: [...state.courtPlayers, action.payload]
      };

    case courtConstants.REMOVE_PLAYER: {
      let players = state.courtPlayers;
      _.remove(players, p => {
        return p.id === action.payload.id;
      });
      return {
        ...state,
        courtPlayers: [...players]
      };
    }

    case courtConstants.SET_PLAYERS: {
      return {
        ...state,
        courtPlayers: [...action.payload]
      };
    }
    case courtConstants.SET_MATCHES: {
      return {
        ...state,
        matches: [...action.payload]
      };
    }
    case courtConstants.MIX_PLAYERS: {
      return {
        ...state,
        sessionTeams: [...action.payload]
      };
    }
    case courtConstants.UPDATE_PLAYERS: {
      return {
        ...state,
        sessionTeams: [...action.payload]
      };
    }

    case courtConstants.SET_SESSION_ID: {
      return {
        ...state,
        sessionID: action.payload
      };
    }
    default:
      return state;
  }
}
