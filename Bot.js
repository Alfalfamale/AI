var Bot = {};

(function(){

	Bot.takeTurn = function(board, player){

		var count = 0;

		for(var x = 1; x <= 8; x++){
			for(var y = 1; y <= 8; y++){
				if(board[x][y] === 3){

					count++;
				}
			}
		}

		var rand = Math.floor((Math.random() * count) + 1);

		for(x = 1; x <= 8; x++){
			for(y = 1; y <= 8; y++){
				if(board[x][y] === 3){

					rand -= 1;

					if(rand === 0){

						Reversi.clickSquare({x: x, y: y});
						return;
					}
				}
			}
		}
	};
})();