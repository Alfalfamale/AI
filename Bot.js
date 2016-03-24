var Bot = {};

(function(){

	var Entity = {

		board: null,
		player: null,

		corner: function(){

			var corners = [
				{x: 1, y: 1},
				{x: 1, y: 8},
				{x: 8, y: 1},
				{x: 8, y: 8}
			];

			corners = corners.shuffle();

			for(var i = 0; i < corners.length; i++){
				var corner = corners[i];

				if(Entity.board[corner.x][corner.y] === 3){

					Reversi.clickSquare(corner);
					return;
				}
			}

			this.side();
		},

		side: function(){

			var sides = [
				{x: 1, y: 3},
				{x: 1, y: 4},
				{x: 1, y: 5},
				{x: 1, y: 6},

				{x: 3, y: 8},
				{x: 4, y: 8},
				{x: 5, y: 8},
				{x: 6, y: 8},

				{x: 8, y: 3},
				{x: 8, y: 4},
				{x: 8, y: 5},
				{x: 8, y: 6},

				{x: 3, y: 1},
				{x: 4, y: 1},
				{x: 5, y: 1},
				{x: 6, y: 1}
			];

			sides = sides.shuffle();

			for(var i = 0; i < sides.length; i++){
				var side = sides[i];

				if(Entity.board[side.x][side.y] === 3){

					Reversi.clickSquare(side);
					return;
				}
			}

			this.inner16();
		},

		inner16: function(){

			var inner16s = [
				{x: 3, y: 3},
				{x: 3, y: 4},
				{x: 3, y: 5},
				{x: 3, y: 6},

				{x: 3, y: 6},
				{x: 4, y: 6},
				{x: 5, y: 6},
				{x: 6, y: 6},

				{x: 6, y: 3},
				{x: 6, y: 4},
				{x: 6, y: 5},
				{x: 6, y: 6},

				{x: 3, y: 3},
				{x: 4, y: 3},
				{x: 5, y: 3},
				{x: 6, y: 3}
			];

			inner16s = inner16s.shuffle();

			for(var i = 0; i < inner16s.length; i++){
				var inner16 = inner16s[i];

				if(Entity.board[inner16.x][inner16.y] === 3){

					Reversi.clickSquare(inner16);
					return;
				}
			}

			this.middle16();
		},

		middle16: function(){

			var middle16s = [
				{x: 2, y: 3},
				{x: 2, y: 4},
				{x: 2, y: 5},
				{x: 2, y: 6},

				{x: 3, y: 7},
				{x: 4, y: 7},
				{x: 5, y: 7},
				{x: 6, y: 7},

				{x: 7, y: 3},
				{x: 7, y: 4},
				{x: 7, y: 5},
				{x: 7, y: 6},

				{x: 3, y: 2},
				{x: 4, y: 2},
				{x: 5, y: 2},
				{x: 6, y: 2}
			];

			middle16s = middle16s.shuffle();

			for(var i = 0; i < middle16s.length; i++){
				var middle16 = middle16s[i];

				if(Entity.board[middle16.x][middle16.y] === 3){

					Reversi.clickSquare(middle16);
					return;
				}
			}

			this.random();
		},

		random: function(){

			var count = 0;

			for(var x = 1; x <= 8; x++){
				for(var y = 1; y <= 8; y++){
					if(Entity.board[x][y] === 3){

						count++;
					}
				}
			}

			var rand = Math.floor((Math.random() * count) + 1);

			for(x = 1; x <= 8; x++){
				for(y = 1; y <= 8; y++){
					if(Entity.board[x][y] === 3){

						rand -= 1;

						if(rand === 0){

							Reversi.clickSquare({x: x, y: y});
							return;
						}
					}
				}
			}
		}
	};

	Bot.takeTurn = function(board, player){

		Entity.board = board;
		Entity.player = player;

		Entity.corner();
	};
})();