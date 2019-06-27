import { courtConstants } from "Constants";
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
  const { courtPlayers } = store.getState().currentSession;

  let players = courtPlayers.courtPlayers;

  return {
    type: courtConstants.MIX_PLAYERS,

    payload: CurrentSessionService.mixPlayers(players)
  };
}
function removePlayer(player) {
  return {
    type: courtConstants.REMOVE_PLAYER,
    payload: player
  };
}
