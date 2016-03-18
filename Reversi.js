/**
 * @author Rob van den Hout <vdhout@studyportals.eu>
 * @version 1.0.0
 * @copyright © 2016 StudyPortals B.V., all rights reserved.
 */

var Reversi = {};

(function(){

	"use strict";

	var Entity = {

		current: 1,
		
		board: {},
		states: {
			0: 'empty',
			1: 'black',
			2: 'white',
			3: 'grey'
		},

		init: function(){

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
	
	Reversi.clickSquare = function(square){

		if(Rules.isAllowed(square, Entity.board)){

			Entity.board[square.x][square.y] = Entity.current;
			Entity.flipStones(square);
			var new_player = Rules.getNextPlayer(Entity.board, Entity.current);

			if(new_player === 0){

				Output.displayWinner(
					Rules.determineWinner(Entity.board)
				);
			}
			else{

				Entity.current = new_player;
				Entity.board = Rules.addOptions(Entity.board, Entity.current);
				Output.displayStones(Entity.board);
				Output.displayStatus(Entity.current);
			}

			Output.displayStones(Entity.board);
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