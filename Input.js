(function(){

	"use strict";

	var Entity = {

		width: 0,
		height: 0,

		init: function(){

			var $Canvas = $('Reversi');

			this.width = $Canvas.width;
			this.height = $Canvas.height;

			$Canvas.addEvent('click', function(event){

				var pos = this.determineCoordinates(event);
				var square = this.determineSquare(pos);

				Reversi.clickSquare(square);
			}.bind(this));
		},

		determineCoordinates: function(event){

			var canvas_left = $('Reversi').offsetLeft;
			var canvas_top = $('Reversi').offsetTop;

			var click_x = event.page.x;
			var click_y = event.page.y;

			var pos_x = click_x - canvas_left;
			var pos_y = click_y - canvas_top;

			return {x: pos_x, y: pos_y};
		},

		determineSquare: function(pos){

			var space_x = this.width / 8;
			var pos_x = Math.ceil(pos.x / space_x);

			var space_y = this.height / 8;
			var pos_y = Math.ceil(pos.y / space_y);

			return {x: pos_x, y: pos_y};
		}
	};

	document.addEvent('domready', function(){

		Entity.init();
	});
})();