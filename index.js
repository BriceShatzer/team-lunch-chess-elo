const EloCalc = require('elo-calculator');

const elo = new EloCalc({});
// let names = [
//   'Brice Shatzer',
//   'Bryce Dorn',
//   'Danny Cheng',
//   'Jamie Levinson',
//   'Joe Duran',
//   'Mike Parent',
// ];

// let players = {}

// playerNames.forEach(function(player) {
//   players[player] = elo.createPlayer();
// });

const Brice_Shatzer = elo.createPlayer();
Brice_Shatzer.name = 'Brice Shatzer';
const Bryce_Dorn = elo.createPlayer();
Bryce_Dorn.name = 'Bryce Dorn'
const Danny_Cheng = elo.createPlayer();
Danny_Cheng.name = 'Danny Cheng';
const Jamie_Levinson = elo.createPlayer();
Jamie_Levinson.name = 'Jamie Levinson';
const Joe_Duran = elo.createPlayer();
Joe_Duran.name = 'Joe Duran';
const Mike_Parent = elo.createPlayer();
Mike_Parent.name = 'Mike Parent';

elo.updateRatings([
  [Brice_Shatzer, Bryce_Dorn, 1],  // Brice_Shatzer wins
  [Brice_Shatzer, Bryce_Dorn, 0],  // Brice_Shatzer loses
  [Brice_Shatzer, Danny_Cheng, 1],
  [Brice_Shatzer, Danny_Cheng, 0],
  [Jamie_Levinson, Mike_Parent, 0]
  // [player2, player3, .5] // Player 2 and player 3 draws the game
]);

elo.players.forEach(function(player, i) {

  console.log(`${player.name} has played ${player.numberOfGamesPlayed} games and has a rating of ${Math.round(player.rating)}`);
});