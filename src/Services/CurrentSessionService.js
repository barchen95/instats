import _ from "lodash";
import faker from "faker";
export const CurrentSessionService = {
  mixPlayers
};

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
function mixPlayers(players) {
  players = [];

  for (let index = 0; index < 15; index++) {
    players.push({
      name: faker.name.findName(),
      rating: faker.random.number({ min: 1, max: 5 }),
      imageURL: faker.image.avatar(),
      id: index
    });
  } //
  if (players.length === 15) {
    return getThreeTeams(players);
  } else {
    return getTwoTeams(players);
  }
}
