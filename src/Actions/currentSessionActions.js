import { courtConstants, currentMatchConstants } from "Constants";
import { store } from "Helpers";
import _ from "lodash";
import { CurrentSessionService } from "Services";
export const currentSessionActions = {
  addPlayer,
  removePlayer,
  mixPlayers,
  movePlayerBetweenTeams
};

function addPlayer(player) {
  return {
    type: courtConstants.ADD_PLAYER,
    payload: player
  };
}
function movePlayerBetweenTeams(playerID, currentTeam, newTeam) {
  return dispatch => {
    const { courtPlayers } = store.getState().currentSession;
    console.table(courtPlayers);
    let sessionTeams = courtPlayers.sessionTeams;
    let removedPlayer = _.remove(sessionTeams[currentTeam], function(p) {
      return p.id == playerID;
    });
    sessionTeams[newTeam].push(removedPlayer[0]);
    dispatch({
      type: courtConstants.UPDATE_PLAYERS,
      payload: sessionTeams
    });
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
