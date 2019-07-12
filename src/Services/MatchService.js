import { authHeader } from "Helpers";
export const matchService = {
  saveMatch
};

function saveMatch(currentMatch) {
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

  return fetch(
    `https://www.rishonims.com/server/gameSessions/saveMatch`,
    requestOptions
  ).then(result => {
    return result;
  });
}
