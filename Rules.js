/**
 * @author Rob van den Hout <vdhout@studyportals.eu>
 * @version 1.0.0
 * @copyright © 2016 StudyPortals B.V., all rights reserved.
 */

var Rules = {};

(function(){

	"use strict";

	var Entity = {

		init: function(){

		}
	};

	Rules.isAllowed = function(square, board){

		var current = board[square.x][square.y];

		if(current === 1 || current === 2){

			return false;
		}

		if(current === 3){

			return true;
		}

		return false;
	};

	Rules.addOptions = function(board, current){

		function addOption(ox, oy, dir_x, dir_y){

			var nx = ox + dir_x;
			var ny = oy + dir_y;

			var option = false;

			while(nx > 0 && nx <= 8 && ny > 0 && ny <= 8){

				if(board[nx][ny] === 3){

					return;
				}
				else if(board[nx][ny] === 0){

					board[nx][ny] = option ? 3 : 0;
					return;
				}
				else if(board[nx][ny] !== current){

					option = true;
				}
				else if(board[nx][ny] === current){

					option = false;
				}

				nx += dir_x;
				ny += dir_y;
			}
		}

		for(var x = 1; x <= 8; x++){
			for(var y = 1; y <= 8; y++){

				if(board[x][y] === 3){

					board[x][y] = 0;
				}
			}
		}

		for(var x = 1; x <= 8; x++){
			for(var y = 1; y <= 8; y++){

				if(board[x][y] == current){

					addOption(x, y, 1, -1);
					addOption(x, y, 1, 0);
					addOption(x, y, 1, 1);

					addOption(x, y, 0, -1);
					addOption(x, y, 0, 1);

					addOption(x, y, -1, -1);
					addOption(x, y, -1, 0);
					addOption(x, y, -1, 1);
				}
			}
		}

		return board;
	};
	
	Rules.getNextPlayer = function(board, current){

		var new_player;

		if(current === 1){

			new_player = 2;
		}
		else{

			new_player = 1;
		}

		console.log(current, new_player);

		var new_board = Rules.addOptions(board, new_player);

		for(var x = 1; x <= 8; x++){
			for(var y = 1; y <= 8; y++){
				if(new_board[x][y] === 3){

					return new_player;
				}
			}
		}

		var old_board = Rules.addOptions(board, current);

		for(var x = 1; x <= 8; x++){
			for(var y = 1; y <= 8; y++){
				if(old_board[x][y] === 3){

					return current;
				}
			}
		}

		return 0;
	};

	Rules.determineWinner = function(board){

		var black = 0;
		var white = 0;

		for(var x = 1; x <= 8; x++){
			for(var y = 1; y <= 8; y++){
				if(board[x][y] === 1){

					black++;
				}
				if(board[x][y] === 2){

					white++;
				}
			}
		}

		if(black > white){

			return 1;
		}
		if(white > black){

			return 2;
		}
		return 0;
	};

	document.addEvent('domready', function(){

		Entity.init();
	});
})();