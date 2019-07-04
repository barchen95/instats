import { courtConstants, currentMatchConstants } from "Constants";
import { store } from "Helpers";
import _ from "lodash";
import { CurrentSessionService } from "Services";
export const currentSessionActions = {
  addPlayer,
  removePlayer,
  mixPlayers,
  movePlayerBetweenTeams,
  createSession,
  setCurrentSession
};

function createSession() {
  return dispatch => {
    CurrentSessionService.createSession().then(id => {
      dispatch({ type: courtConstants.SET_SESSION_ID, payload: id });
    });
  };
}
function setCurrentSession(session) {
  return dispatch => {
    dispatch({ type: courtConstants.SET_SESSION_ID, payload: session.id });
    dispatch({
      type: courtConstants.MIX_PLAYERS,
      payload: session.currentTeams
    });

    dispatch({
      type: currentMatchConstants.SET_TEAMS,
      payload: session.currentTeams
    });
  };
}

function movePlayerBetweenTeams(playerID, currentTeam, newTeam) {
  return dispatch => {
    const { courtPlayers } = store.getState().currentSession;
    console.table(courtPlayers);
    let sessionTeams = courtPlayers.sessionTeams;
    let removedPlayer = _.remove(sessionTeams[currentTeam].players, function(
      p
    ) {
      return p.id == playerID;
    });
    debugger;
    sessionTeams[newTeam].players.push(removedPlayer[0]);
    dispatch({
      type: courtConstants.UPDATE_PLAYERS,
      payload: sessionTeams
    });
  };
}
function mixPlayers() {
  return dispatch => {
    const { courtPlayers } = store.getState().currentSession;
    const { sessionID } = courtPlayers;
    let players = courtPlayers.courtPlayers;
    CurrentSessionService.mixPlayers(players, sessionID).then(teams => {
      dispatch({
        type: courtConstants.MIX_PLAYERS,
        payload: teams
      });

      dispatch({
        type: currentMatchConstants.SET_TEAMS,
        payload: teams
      });
    });

    dispatch({
      type: "REQUEST_",
      payload: null
    });
  };
}
function removePlayer(player) {
  return {
    type: courtConstants.REMOVE_PLAYER,
    payload: player
  };
}
function addPlayer(player) {
  return {
    type: courtConstants.ADD_PLAYER,
    payload: player
  };
}
