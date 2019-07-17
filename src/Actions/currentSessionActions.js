import { courtConstants, currentMatchConstants } from "Constants";
import { store, avatars } from "Helpers";
import _ from "lodash";
import { CurrentSessionService, playerService } from "Services";
export const currentSessionActions = {
  updateCourtPlayerStatus,
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

async function getPlayers(callback) {
  const players = await playerService.getAll();

  players.forEach(player => {
    avatars[player.id] = player.imageURL;
  });

  callback();
}
function setCurrentSession(session) {
  return dispatch => {
    if (Object.entries(avatars).length === 0) {
      getPlayers(() => {
        session.currentTeams.forEach(team => {
          for (
            let playerIndex = 0;
            playerIndex < team.players.length;
            playerIndex++
          ) {
            team.players[playerIndex].imageURL =
              avatars[team.players[playerIndex].id];
          }
        });
        dispatch({
          type: courtConstants.MIX_PLAYERS,
          payload: session.currentTeams
        });
        dispatch({
          type: currentMatchConstants.SET_TEAMS,
          payload: session.currentTeams
        });
      });
    }

    dispatch({ type: courtConstants.SET_SESSION_ID, payload: session.id });

    dispatch({
      type: courtConstants.SET_PLAYERS,
      payload: session.courtPlayers
    });

    dispatch({
      type: courtConstants.SET_MATCHES,
      payload: session.matches
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
      teams.forEach(team => {
        for (
          let playerIndex = 0;
          playerIndex < team.players.length;
          playerIndex++
        ) {
          team.players[playerIndex].imageURL =
            avatars[team.players[playerIndex].id];
        }

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
    });
  };
}

function updateCourtPlayerStatus(player, status) {
  return dispatch => {
    CurrentSessionService.updateCourtPlayers(player).then(result => {
      dispatch({
        type: status,
        payload: player
      });
    });

    dispatch({
      type: "courtConstants.REQUEST",
      payload: player
    });
  };
}
