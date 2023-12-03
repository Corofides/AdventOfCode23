const Utils = require('../Utils/Utils');

const games = [];

Utils.processFile('./Day02/input.txt', (game) => {

  const gameIdPattern = /Game (\d+):/;
  const result = gameIdPattern.exec(game);
  const gameId = result[1];
  const results = game.split(':')[1];

  const resultPattern = /(\d+) (\w+)/;
  let rounds = results.split(';');

  games.push({
    id: Number(gameId),
    rounds: rounds.map((round) => {

      const theRound = {};

      round.split(',').forEach((current) => {
        const regex = resultPattern.exec(current);
        theRound[regex[2]] = Number(regex[1]);
      });


      return theRound;
    }),
    minCubesForGame: function() {

      const minCubes = {red: 0, green: 0, blue: 0};

      this.rounds.forEach(round => {

        if (round.hasOwnProperty('red')) {
          if (round.red >= minCubes.red) {
            minCubes.red = round.red;
          }
        }

        if (round.hasOwnProperty('blue')) {
          if (round.blue >= minCubes.blue) {
            minCubes.blue = round.blue;
          }
        }

        if (round.hasOwnProperty('green')) {
          if (round.green >= minCubes.green) {
            minCubes.green = round.green;
          }
        }

      });

      return minCubes;

    },
    isValid: function(red = 0, green = 0, blue = 0) {

      let isValid = true;

      //console.log(this);

      this.rounds.forEach((round) => {

        //console.log(round);

        if (round.hasOwnProperty("red")) {

          //console.log("Red", round.red, red);

          if (round.red > red) {
            isValid = false;
          }

        }

        if (round.hasOwnProperty("green")) {

          //console.log("Green", round.green, green);


          if (round.green > green) {
            isValid = false;
          }

        }

        if (round.hasOwnProperty("blue")) {

          if (round.blue > blue) {
            isValid = false;
          }

        }

      });

      return isValid;

    }
  });

  const getSumOfValidGameIds = (games, red, green, blue) => {

    const validGames = games.filter((game) => {

      return game.isValid(red, green, blue);

    });

    return validGames.reduce((previousValue, currentGame) => {

      return previousValue + currentGame.id;

    }, 0);

  };


  const getPowerOfMinCubes = (games) => {

    const minCubes = games.map((game) => {
      return game.minCubesForGame();
    });

    return minCubes.reduce((previousValue, currentGame) => {
      return previousValue + (currentGame.red * currentGame.green * currentGame.blue);
    }, 0);

    //console.log("Minimum Cubes", minCubes);

  };

  console.log("Sum of Valid Game Ids", getSumOfValidGameIds(games, 12, 13, 14));
  console.log("Power of Min Cubs", getPowerOfMinCubes(games));

});

