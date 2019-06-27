import { courtConstants, currentMatchConstants } from "Constants";
import { store } from "Helpers";
import _ from "lodash";
import { CurrentSessionService } from "Services";
export const currentSessionActions = {
  addPlayer,
  removePlayer,
  mixPlayers
};

function addPlayer(player) {
  return {
    type: courtConstants.ADD_PLAYER,
    payload: player
  };
}
function mixPlayers() {
  return dispatch => {
    const { courtPlayers } = store.getState().currentSession;

    let players = courtPlayers.courtPlayers;
    const teams = CurrentSessionService.mixPlayers(players);
    dispatch({
      type: courtConstants.MIX_PLAYERS,
      payload: teams
    });

    dispatch({
      type: currentMatchConstants.SET_TEAMS,
      payload: teams
    });
  };
}
function removePlayer(player) {
  return {
    type: courtConstants.REMOVE_PLAYER,
    payload: player
  };
}
