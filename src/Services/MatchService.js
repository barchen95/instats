import { authHeader } from "Helpers";
export const matchService = {
  saveMatch
};

function saveMatch(currentMatch) {
  debugger;
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      score: currentMatch.score.currentScore,
      gameLog: currentMatch.gameLog.logArray,
      teams: currentMatch.teams.teams,
      time: currentMatch.time
    })
  };

  return fetch(`http://localhost:4000/matches/saveMatch`, requestOptions).then(
    result => {
      // store user details and jwt token in local storage to keep user logged in
      // between page refreshes
      debugger;
      return result;
    }
  );
}
