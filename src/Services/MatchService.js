import { authHeader, config } from "Helpers";
export const matchService = {
  saveMatch
};

function removeAvatarsFromTeams(teams) {
  let newTeams = [];
  teams.forEach(team => {
    let newTeam = [];
    for (
      let playerIndex = 0;
      playerIndex < team.players.length;
      playerIndex++
    ) {
      let player = team.players[playerIndex];
      delete player.imageURL;
      newTeam.push(player);
    }
    newTeams.push(team);
  });

  return newTeams;
}

function removeAvatarsFromLogs(logs) {
  logs.forEach(log => {
    delete log.scorer.imageURL;
    delete log.assisted.imageURL;

    debugger;
  });
}
function saveMatch(currentMatch) {
  const newTeams = removeAvatarsFromTeams(currentMatch.teams.teams);
  const newLog = removeAvatarsFromLogs(currentMatch.gameLog.logArray);

  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      score: currentMatch.score.currentScore,
      gameLog: newLog,
      teams: newTeams,
      time: currentMatch.time
    })
  };

  return fetch(`${config.apiURL}/gameSessions/saveMatch`, requestOptions).then(
    result => {
      return result;
    }
  );
}
