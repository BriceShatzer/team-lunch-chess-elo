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


// == Set Players
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
const Brandon_Comerford = elo.createPlayer();
Brandon_Comerford.name = 'Brandon Comerford';

// == Set Games
let games = [
	createGame(Brice_Shatzer, Bryce_Dorn, 1),
	createGame(Brice_Shatzer, Bryce_Dorn, 0),
	createGame(Brice_Shatzer, Danny_Cheng, 1), // white = Brice?
	createGame(Danny_Cheng, Brice_Shatzer, 1, new Date('11/26/2018')), // white = Danny
	createGame(Jamie_Levinson, Mike_Parent, 0),
	createGame(Mike_Parent, Jamie_Levinson, 1),
	createGame(Joe_Duran, Brice_Shatzer, 1),
	createGame(Joe_Duran, Brice_Shatzer, 0, new Date('11/27/2018')),
	createGame(Joe_Duran, Jamie_Levinson, 0, new Date('11/29/2018')),
	createGame(Brandon_Comerford, Bryce_Dorn, 0, new Date('11/29/2018')),
	createGame(Brice_Shatzer, Danny_Cheng, 0, new Date('12/3/2018')),
	createGame(Danny_Cheng, Mike_Parent , 0, new Date('12/7/2018')),
	createGame(Joe_Duran, Jamie_Levinson, 0, new Date('12/9/2018')),
	createGame(Jamie_Levinson, Danny_Cheng, 0, new Date('12/10/2018'))
]



// === update elo from arry of game objects
let games_eloCalcFormat = [];
games.forEach((gameObj) =>{
	let arr = [];
	arr.push(gameObj.whitePlayer);
	arr.push(gameObj.blackPlayer);
	arr.push(gameObj.winner === 'draw' ? 0.5 : gameObj.winner);
	games_eloCalcFormat.push(arr);
});

elo.updateRatings(games_eloCalcFormat);

/*
elo.updateRatings([
  [Brice_Shatzer, Bryce_Dorn, 1],  // Brice_Shatzer wins
  [Brice_Shatzer, Bryce_Dorn, 0],  // Brice_Shatzer loses
  [Brice_Shatzer, Danny_Cheng, 1], // white = Brice?
  [Danny_Cheng, Brice_Shatzer, 1], // white = Danny
  [Jamie_Levinson, Mike_Parent, 0]
  // [player2, player3, .5] // Player 2 and player 3 draws the game
]);
*/

elo.players.sort((a, b) => b.rating - a.rating);
elo.players.forEach(function(player, i) {
	const s = `${player.name} has played ${player.numberOfGamesPlayed} games and has a rating of ${Math.round(player.rating)}`;
	console.log(s);
	if ('window' in this) {
		addElement(s);
	}
});

function addElement(string) {
	const el = document.createElement("p");
	el.innerText = string;
	document.body.appendChild(el);
}

function createGame (whitePlayer, blackPlayer, winner, date) {
	obj = {}

	if (
		!_isValidPlayer(whitePlayer) ||
		!_isValidPlayer(blackPlayer)) {
			return console.log('Error Creating Game: invalid player');
	} else if (
		!winner == 1 &&
		!winner == 0 &&
		!winner == .5 &&
		!winner == 'draw'
	){
		return console.log('Error Creating Game: invalid result value');
	} else {
		obj.whitePlayer = whitePlayer;
		obj.blackPlayer = blackPlayer;
		obj.winner = winner;
		obj.date = (date && new Date(date).valueOf()) ? new Date(date) : new Date().toDateString();
	}

	return obj;


	function _isValidPlayer (player) {
		const properties = Object.getOwnPropertyNames(player);
		return (
			properties.includes('rating') &&
			properties.includes('numberOfGamesPlayed') &&
			properties.includes('highestRating')
		)
	}
}
