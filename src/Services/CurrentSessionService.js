import _ from "lodash";
import { authHeader } from "Helpers";

import faker from "faker";
export const CurrentSessionService = {
  mixPlayers,
  createSession,
  getCurrentSession
};

function getCurrentSession() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(
    `http://localhost:4000/gameSessions/getCurrentSession`,
    requestOptions
  ).then(handleResponse);
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function getThreeTeams(players) {
  const teams = [[], [], []];
  players = _.sortBy(players, player => {
    return player.rating;
  });
  _.reverse(players);

  for (let i = 0; i < players.length; i = i + 3) {
    let section = players.slice(i, i + 3);
    // section = shuffle(section);

    if (i % 2 == 0) {
      for (let index = 0; index < 3; index++) {
        teams[index].push(section[index]);
      }
    } else {
      let reversedIndex = 0;
      for (let index = 2; index >= 0; index--) {
        teams[index].push(section[reversedIndex]);
        reversedIndex++;
      }
    }
  }

  return teams;
}
function getTwoTeams(players) {
  const teams = [[], [], []];

  let playersToSort = players.slice(0, 10);
  teams[2] = players.slice(10);

  playersToSort = _.sortBy(playersToSort, player => {
    return player.rating;
  });
  _.reverse(playersToSort);
  for (let i = 0; i < 5; i++) {
    let section = playersToSort.slice(i * 2, i * 2 + 2);
    // section = shuffle(section);

    if (i % 2 == 0) {
      for (let index = 0; index < 2; index++) {
        teams[index].push(section[index]);
      }
    } else {
      let reversedIndex = 0;
      for (let index = 1; index >= 0; index--) {
        teams[index].push(section[reversedIndex]);
        reversedIndex++;
      }
    }
  }
  return teams;
}
function mixPlayers(players, sessionID) {
  players = [];

  for (let index = 0; index < 15; index++) {
    players.push({
      firstName: faker.name.findName(),
      lastName: faker.name.findName(),
      rating: faker.random.number({ min: 1, max: 5 }),
      imageURL: faker.image.avatar(),
      id: index
    });
  } //

  let teams = [];
  if (players.length === 15) {
    teams = getThreeTeams(players);
  } else {
    teams = getTwoTeams(players);
  }

  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({
      sessionID: sessionID,
      teams: teams
    })
  };

  return fetch(
    `http://localhost:4000/gameSessions/setTeams`,
    requestOptions
  ).then(handleResponse);
}

function createSession() {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(
    `http://localhost:4000/gameSessions/createSession`,
    requestOptions
  ).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
