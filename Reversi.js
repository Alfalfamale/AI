var Reversi = {};

(function(){

	"use strict";

	var Entity = {

		black: {
			type: 'human',
			local: true,
			side: 1
		},

		white: {
			type: 'bot',
			local: true,
			side: 2
		},

		current: 1,

		sides: {
			1: 'black',
			2: 'white'
		},

		board: {},
		states: {
			0: 'empty',
			1: 'black',
			2: 'white',
			3: 'grey'
		},

		botgame: false,
		host: false,
		spectator: false,

		awaitingInput: false,

		getCurrentPlayer: function(){

			var current = Entity.current;
			var side = Entity.sides[current];
			return Entity[side];
		},

		init: function(){

			var query = window.location.search.substring(1);

			var params = query.split('&');

			for(var i = 0; i < params.length; i++){

				var props = params[i].split('=');

				var key = props[0];

				if(key === 'player'){

					if(props[1] == 'white'){

						this.black.type = 'bot';
						this.white.type = 'player';
					}
					else if(props[1] == 'none'){

						this.black.type = 'bot';
						this.white.type = 'bot';
						this.botgame = true;
					}
					else if(props[1] == 'both'){

						this.black.type = 'player';
						this.white.type = 'player';
					}
				}

				else if(key === 'remote'){

					if(props[1] === 'host'){

						Reversi.isHost();
						let hash = startRemoteGame(true);
						alert(hash);
					}
					else{

						Reversi.isSpectator();
						startRemoteGame(false, props[1]);
					}
				}
			}

			for(var x = 1; x <= 8; x++){

				this.board[x] = {};

				for(var y = 1; y <= 8; y++){

					this.board[x][y] = 0;
				}
			}

			this.board[4][5] = 2;
			this.board[5][4] = 2;
			this.board[4][4] = 1;
			this.board[5][5] = 1;

			this.board = Rules.addOptions(this.board, this.current);
			Output.displayStones(this.board);
			Output.displayStatus(this.current);

			Reversi.nextTurn();
		},

		flipStones: function(square){

			function flipDirection(ox, oy, dir_x, dir_y){

				var nx = ox + dir_x;
				var ny = oy + dir_y;

				while(nx > 0 && nx <= 8 && ny > 0 && ny <= 8){

					if(Entity.board[nx][ny] !== Entity.current){

						Entity.board[nx][ny] = Entity.current;
					}
					else if(Entity.board[nx][ny] === Entity.current){

						return;
					}

					nx += dir_x;
					ny += dir_y;
				}
			}

			function checkDirection(ox, oy, dir_x, dir_y){

				var nx = ox + dir_x;
				var ny = oy + dir_y;

				var option = false;

				while(nx > 0 && nx <= 8 && ny > 0 && ny <= 8){

					if(Entity.board[nx][ny] === 3){

						return;
					}
					else if(Entity.board[nx][ny] === 0){

						return;
					}
					else if(Entity.board[nx][ny] !== Entity.current){

						option = true;
					}
					else if(Entity.board[nx][ny] === Entity.current && option){

						flipDirection(ox, oy, dir_x, dir_y);
					}

					nx += dir_x;
					ny += dir_y;
				}
			}

			checkDirection(square.x, square.y, 1, -1);
			checkDirection(square.x, square.y, 1, 0);
			checkDirection(square.x, square.y, 1, 1);
			checkDirection(square.x, square.y, 0, -1);
			checkDirection(square.x, square.y, 0, 1);
			checkDirection(square.x, square.y, -1, -1);
			checkDirection(square.x, square.y, -1, 0);
			checkDirection(square.x, square.y, -1, 1);
		}
	};

	Reversi.nextTurn = function(){

		if(Entity.spectator){

			return;
		}

		var player = Entity.getCurrentPlayer();

		if(Entity.botgame){

			setTimeout(function(){

				Bot.takeTurn(Entity.board, player.side);
			}, 1000);
		}

		else if(player.type === 'bot'){

			Bot.takeTurn(Entity.board, player.side);
		}

		else {

			Entity.awaitingInput = true;
		}
	};

	Reversi.isHost = function(){

		Entity.host = true;
	};
	Reversi.isSpectator = function(){

		Entity.spectator = true;
		Entity.awaitingInput = false;
	};
	Reversi.remoteMessage = function(event){

		if(!Entity.spectator){

			return;
		}

		let data = JSON.parse(event.data);

		Output.displayStones(data.board);
	};

	Reversi.userClickSquare = function(square){

		if(!Entity.awaitingInput){

			return;
		}

		Entity.awaitingInput = false;

		Reversi.clickSquare(square);
	};

	Reversi.clickSquare = function(square){

		if(Rules.isAllowed(square, Entity.board)){

			Entity.board[square.x][square.y] = Entity.current;
			Entity.flipStones(square);
			var new_player = Rules.getNextPlayer(Entity.board, Entity.current);

			Entity.current = new_player;
			Output.displayStones(Entity.board);

			if(Entity.host && dataChannel){

				dataChannel.send(JSON.stringify({board: Entity.board}));
			}

			if(new_player === 0){

				Output.displayWinner(
					Rules.determineWinner(Entity.board)
				);

				return;
			}

			Entity.board = Rules.addOptions(Entity.board, Entity.current);
			Output.displayStatus(Entity.current);

			Reversi.nextTurn();
		}
	};

	Reversi.getColor = function(number){

		return Entity.states[number];
	};

	Reversi.current = function(){

		return Entity.current;
	};

	document.addEvent('domready', function(){

		Entity.init();
	});
})();