var Output = {};

(function(){

	"use strict";

	var Entity = {

		width: 0,
		height: 0,
		columns: 8,
		rows: 8,

		init: function(){

			this.displayBoard();

			$$('.TurnText').setStyle('display', 'none');
		},

		displayBoard: function(){

			var $Canvas = $('Reversi');

			this.width = $Canvas.width;
			this.height = $Canvas.height;

			var h_spacing = Math.round(this.width / this.columns);
			var v_spacing = Math.round(this.height / this.rows);

			var ctx = $Canvas.getContext("2d");

			for(var h = 1; h < this.columns; h++){

				var h_dist = h * h_spacing;
				ctx.moveTo(h_dist, 0);
				ctx.lineTo(h_dist, this.height);
				ctx.stroke();
			}

			for(var v = 1; v < this.rows; v++){

				var v_dist = v * v_spacing;
				ctx.moveTo(0, v_dist);
				ctx.lineTo(this.width, v_dist);
				ctx.stroke();
			}
		},

		displayStones: function(board){

			this.displayBoard();

			var h_spacing = Math.round(this.width / this.columns);
			var v_spacing = Math.round(this.height / this.rows);

			var $Canvas = $('Reversi');
			var ctx = $Canvas.getContext("2d");

			for(var x = 1; x <= 8; x++){

				for(var y = 1; y <= 8; y++){

					ctx.beginPath();

					if(board[x][y] === 1 || board[x][y] === 2){

						ctx.arc(
							(h_spacing * x) - (h_spacing / 2),
							(v_spacing * y) - (v_spacing / 2),
							(v_spacing / 2) * 0.9,
							0,
							2*Math.PI
						);
						ctx.fillStyle = Reversi.getColor(board[x][y]);
					}
					else if(board[x][y] === 3){

						ctx.arc(
							(h_spacing * x) - (h_spacing / 2),
							(v_spacing * y) - (v_spacing / 2),
							(v_spacing / 2) * 0.2,
							0,
							2*Math.PI
						);
						ctx.fillStyle = Reversi.getColor(Reversi.current());
					}

					ctx.fill();
				}
			}
		}
	};

	Output.displayStones = function(board){

		var $Canvas = $('Reversi');

		var ctx = $Canvas.getContext('2d');

		ctx.clearRect(0, 0, $Canvas.width, $Canvas.height);

		Entity.displayStones(board);
	};

	Output.displayStatus = function(current){

		$$('.TurnText').setStyle('display', 'none');

		if(current === 1){

			$('BlackTurnText').setStyle('display', 'inline');
		}
		else{

			$('WhiteTurnText').setStyle('display', 'inline');
		}
	};

	Output.displayWinner = function(winner){

		$$('.TurnText').setStyle('display', 'none');

		if(winner === 1){

			$('BlackWinner').setStyle('display', 'inline');
		}
		else if(winner === 2){

			$('WhiteWinner').setStyle('display', 'inline');
		}
		else{

			$('NoWinner').setStyle('display', 'inline');
		}
	};

	document.addEvent('domready', function(){

		Entity.init();
	});
})();