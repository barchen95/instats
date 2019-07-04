import { courtConstants } from "Constants";
import _ from "lodash";
const team = [
  {
    name: "Tomer",
    id: "kfoasppafsap",
    rating: 5,
    imageURL:
      "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/15826257_10155775682477627_128663437541979635_n.jpg?_nc_cat=101&_nc_ht=scontent.fsdv2-1.fna&oh=2bf978a092ca9d981dade2867abb04b3&oe=5D87043A"
  }
];
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
