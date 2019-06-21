import { currentMatchConstants } from "Constants";
const teams = [
  {
    name: "team 1",
    score: 0,
    players: [
      {
        name: "Yoni",
        imageURL:
          "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/62017715_2468257743193821_437302643681918976_n.jpg?_nc_cat=105&_nc_ht=scontent.fsdv3-1.fna&oh=03ea31990a56e62268a6403f186ddf97&oe=5D94C7A2"
      },
      {
        name: "Sahar",
        imageURL:
          "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/12705444_1127820080575330_7808977692603891820_n.jpg?_nc_cat=107&_nc_ht=scontent.fsdv3-1.fna&oh=3a6a7101222137a81fd399e5d1c93d64&oe=5D91687E"
      },
      {
        name: "Tomer",
        imageURL:
          "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/15826257_10155775682477627_128663437541979635_n.jpg?_nc_cat=101&_nc_ht=scontent.fsdv2-1.fna&oh=2bf978a092ca9d981dade2867abb04b3&oe=5D87043A"
      },
      {
        name: "Snir",
        imageURL:
          "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/13494873_1456537357705291_372120182080065493_n.jpg?_nc_cat=108&_nc_ht=scontent.fsdv2-1.fna&oh=b7d681fdad94906533b013328d471b88&oe=5D94C604"
      },
      {
        name: "Dror",
        imageURL:
          "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/20638969_1634665069879317_2241619553780576588_n.jpg?_nc_cat=105&_nc_ht=scontent.fsdv2-1.fna&oh=b0ff41142134f92c7ab1ef818121f237&oe=5DC1CCD8"
      }
    ]
  },
  {
    name: "team 2",
    score: 0,
    players: [
      {
        name: "Yoni",
        imageURL:
          "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/62017715_2468257743193821_437302643681918976_n.jpg?_nc_cat=105&_nc_ht=scontent.fsdv3-1.fna&oh=03ea31990a56e62268a6403f186ddf97&oe=5D94C7A2"
      },
      {
        name: "Sahar",
        imageURL:
          "https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.0-9/12705444_1127820080575330_7808977692603891820_n.jpg?_nc_cat=107&_nc_ht=scontent.fsdv3-1.fna&oh=3a6a7101222137a81fd399e5d1c93d64&oe=5D91687E"
      },
      {
        name: "Tomer",
        imageURL:
          "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/15826257_10155775682477627_128663437541979635_n.jpg?_nc_cat=101&_nc_ht=scontent.fsdv2-1.fna&oh=2bf978a092ca9d981dade2867abb04b3&oe=5D87043A"
      },
      {
        name: "Snir",
        imageURL:
          "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/13494873_1456537357705291_372120182080065493_n.jpg?_nc_cat=108&_nc_ht=scontent.fsdv2-1.fna&oh=b7d681fdad94906533b013328d471b88&oe=5D94C604"
      },
      {
        name: "Dror",
        imageURL:
          "https://scontent.fsdv2-1.fna.fbcdn.net/v/t1.0-9/20638969_1634665069879317_2241619553780576588_n.jpg?_nc_cat=105&_nc_ht=scontent.fsdv2-1.fna&oh=b0ff41142134f92c7ab1ef818121f237&oe=5DC1CCD8"
      }
    ]
  }
];
export function teamsReducer(state = { teams }, action) {
  switch (action.type) {
    case currentMatchConstants.GET_TEAMS:
      return {
        teams
      };

    case currentMatchConstants.NEW_GOAL: {
      const { team, scorer, assisted } = action.payload;
      teams[team].players[scorer].asScored = true;
      teams[team].players[assisted].asAssisted = true;
      return { teams };
    }

    default:
      return state;
  }
}
