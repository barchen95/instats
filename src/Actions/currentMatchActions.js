import {
  currentMatchConstants,
  gameLogConstants,
  modalConstants,
  scoreConstants,
  timeConstants,
  matchStatusConstants
} from "Constants";
import { store } from "Helpers";
import { matchService } from "Services";
export const currentMatchActions = {
  goalScored,
  updateTime,
  updateStatus,
  startExtraTime,
  onGameEnd,
  saveMatch
};

function saveMatch() {
  return dispatch => {
    matchService.saveMatch(store.getState().currentMatch).then(res => {
      dispatch({
        type: matchStatusConstants.CHANGE_STATUS,
        payload: matchStatusConstants.WAIT_TO_START
      });

      dispatch({
        type: gameLogConstants.INIT
      });
      dispatch({
        type: timeConstants.INIT_TIME
      });
      dispatch({
        type: scoreConstants.INIT_SCORE
      });

      debugger;
      const { sessionTeams } = store.getState().currentSession.courtPlayers;

      dispatch({
        type: currentMatchConstants.SET_TEAMS,
        payload: sessionTeams
      });
    });
  };
}
function onGameEnd() {
  return dispatch => {
    const currentMatch = store.getState().currentMatch;
    const matchStatus = currentMatch.matchStatus;
    const homeScore = currentMatch.score.currentScore[0];
    const awayScore = currentMatch.score.currentScore[1];
    if (matchStatus === matchStatusConstants.REGULAR_TIME) {
      if (homeScore === awayScore) {
        dispatch(
          currentMatchActions.updateStatus(matchStatusConstants.EXTRA_TIME)
        );
      } else {
        dispatch(
          currentMatchActions.updateStatus(matchStatusConstants.SHOW_END_MATCH)
        );
      }
    } else if (matchStatus === matchStatusConstants.EXTRA_TIME_STARTED) {
      if (homeScore === awayScore) {
        dispatch(
          currentMatchActions.updateStatus(matchStatusConstants.SHOW_PENALTIES)
        );
      } else {
        dispatch(
          currentMatchActions.updateStatus(matchStatusConstants.SHOW_END_MATCH)
        );
      }
    }
  };
}
function goalScored(team, scorer, assisted) {
  return dispatch => {
    const currentMatch = store.getState().currentMatch;
    const matchStatus = currentMatch.matchStatus;
    let homeScore = currentMatch.score.currentScore[0];
    let awayScore = currentMatch.score.currentScore[1];
    team === "0" ? homeScore++ : awayScore++;
    if (matchStatus === matchStatusConstants.SHOW_END_MATCH) {
      if (homeScore === awayScore) {
        dispatch(updateStatus(matchStatusConstants.EXTRA_TIME));
      }
    }
    if (matchStatus === matchStatusConstants.SHOW_PENALTIES) {
      if (homeScore !== awayScore) {
        dispatch(updateStatus(matchStatusConstants.SHOW_MATCH_SUMMRY));
      }
    }

    dispatch({
      type: currentMatchConstants.NEW_GOAL,
      payload: {
        team,
        scorer,
        assisted
      }
    });

    dispatch({
      type: scoreConstants.NEW_GOAL,
      payload: {
        team
      }
    });
    dispatch({ type: modalConstants.CLOSE });
    const teams = store.getState().currentMatch.teams.teams;
    dispatch({
      type: gameLogConstants.WRITE,
      payload: {
        team,

        scorer: teams[team].players[scorer],
        assisted: teams[team].players[assisted],
        time: store.getState().currentMatch.time
      }
    });

    if (homeScore === 2 || awayScore === 2) {
      dispatch(updateStatus(matchStatusConstants.SHOW_MATCH_SUMMRY));
    }
  };
}

function updateTime(time) {
  var minutes = Math.floor(time / 60000);
  var seconds = ((time % 60000) / 1000).toFixed(0);

  return {
    type: currentMatchConstants.UPDATE_TIME,
    payload: {
      seconds,
      minutes
    }
  };
}

function updateStatus(newStatus) {
  return { type: matchStatusConstants.CHANGE_STATUS, payload: newStatus };
}

function startExtraTime() {
  return {
    type: gameLogConstants.WRITE,
    payload: {
      type: "ExtraTime"
    }
  };
}
