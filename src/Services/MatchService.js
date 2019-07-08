import {authHeader} from "Helpers";
export const matchService = {
    saveMatch
};

function saveMatch(currentMatch) {
    const requestOptions = {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({score: currentMatch.score.currentScore, gameLog: currentMatch.gameLog.logArray, teams: currentMatch.teams.teams, time: currentMatch.time})
    };

    return fetch(
    // `http://134.209.241.89/server/gameSessions/saveMatch`,
    `http://134.209.241.89/server/gameSessions/saveMatch`, requestOptions).then(result => {
        // store user details and jwt token in local storage to keep user logged in
        // between page refreshes
        return result;
    });
}
