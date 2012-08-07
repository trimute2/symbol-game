var Game ={
};
window.easterEgg = function(){

	var map = [[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				['_','_','_',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ','_','_','_',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
				['_','_','_','_','_','_','_','_','_','_']];
		var data = {
			map : [],
			NODE_WIDTH : 0,
			NODE_HEIGHT : 0,
			world_width : 0,
			world_height : 0,
			world_cols : 0,
			world_rows :0
		};
		var game = {
			data: data,
			objects: objects
		};
		var objects={
			KeyBoardMonitor: null,
			platforms : []
		};

	function platform(map){
		var data ={
			platform: []
		};
		for (var h = 0; h <= 10; h++) {
			for (var w = 0; w >= 9; w++) {
				if(map[h][w] == '_'){
					platform.push([w*5,h*5]);
				}
			}
		}
	}
	function StickMan(X ,Y, W, H){
		var data = {
			x: X,
			y: Y,
			w: W,
			h: H,
			collison: true,
			falling: false,
			jumping: false,
			walking: false,
			jumpPhase: 0,
			direction : {
				left: true,
				right: false
			}
		};
		function moveTo(x, y){
			data.x = x;
			data.y = y;
		}
		function addDirection(direction, oppisete){
			if(!data.direction[direction]){
				data.direction[direction]=true;
			}

			if(oppisete && data.direction[oppisete]){
				data.direction[oppisete] =false;
			}

		}
		function remove(direction){
			if(direction && data.direction[direction]){
				data.direction[direction] =false;
			}
		}
		function walk(xDirection){
			data.walking = true;

			if (xDirection > 0) {
				addDirection('right','left');
			}else if(xDirection < 0){
				addDirection('left','right');
			}
		}
		function gravity(){
			if (!collison) {
				if(!jumping){
					return 1;
				}else{
					jumpPhase--;
					if (jumpPhase === 0) {
						jumping = false;
					}
					return -1;
				}
			}
		}
		function jump(){
			if(!jumping && !falling){
			data.jumping = true;
			data.jumpPhase = 6;
			}
		}
		function collisionCheck(){
			for (var i = Things.length - 1; i >= 0; i--) {
				if (y+w === plat[i]) {
					if(x+h >= plat[i]|| x <=plat[i]){
						collison = true;
					}
				}
			}
		}
		/*function moveBy(x,y){
			var row, col,
				w =game.data.NODE_WIDTH
				h =game.data.NODE_HEIGHT
			targetX,
			targetY;
			col = Math.min(game.data.world_cols, Math.max(0, data.col+x));
			row = Math.min(game.data.world_rows, Math.max(0, data.row+y));
		}*/
		function animate(){
			var k = game.objects.KeyBoardMonitor;

			var x = 0;
			var y = 0;

			if (k.isDown('left')) {
				x = -1;
			}
			if (k.isDown('right')) {
				x = 1;
			}



			y= gravity();


		}
	}
	function KeyBoardMonitor(){

		downKeys = {},
		keyMap = {
			'left' : 37,
			'up' : 38,
			'right' : 39
		},
		events = {
			KeyDown: function(e){
				if(keys[e.Keycode]&&keys[e.Keycode].down){ 
					if (typeof downKeys[e.keyCode] === 'undefined') {
						downKeys[e.keyCode] = true;
						keys[e.keyCode].down(e);
					}
					if (typeof keys[e.keyCode].allowEvent === 'undefined') {
						return stopEvent(e);
					}
				}
			},
			keyup: function(e) {
				if (typeof downKeys[e.keyCode] !== 'undefined' && keys[e.keyCode]) {
					delete downKeys[e.keyCode];
					if (keys[e.keyCode].up) {
						keys[e.keyCode].up(e);
					}
					if (typeof keys[e.keyCode].allowEvent === 'undefined') {
						return stopEvent(e);
					}
				}
			}
		};
		keys = {
			'37': {
				allowEvent: true,
				down: function(){
					StickMan.walk(-1);
				},
				up: function(){
					stickMan.stopWalk();
				}
			},
			'39':{
				allowEvent: true,
				down: function(){
					stickMan.walk(1);
			},
				up: function(){
					stickMan.stopWalk();
				}
			},
			'38':{
				allowEvent: true,
				down: function(){
					stickMan.jump();
				}
			}
		};
		function isDown(labelOrCode){
			return (typeof keyMap[labelOrCode] !== 'undefined' ? downKeys[keyMap[labelOrCode]] : downKeys[labelOrCode]);
		}
		function releaseAll() {
			var item;
			for (item in downKeys) {
				if (downKeys.hasOwnProperty(item)) {
					events.keyup({
						keyCode: item
					});
				}
			}
		}
		function attachEvents() {
			utils.events.add(document, 'keydown', events.keydown);
			utils.events.add(document, 'keyup', events.keyup);
		}   
		function init() {
			attachEvents();
		}
		return {
			init: init,
			isDown: isDown,
			releaseAll: releaseAll
		};
	}
	function init(){
		objects.KeyBoardMonitor = new KeyBoardMonitor();
		objects.KeyBoardMonitor.init(),
		objects.platforms = new platform(map);
	}
	function gameLoop(){
		//these coulod be used to activate walking animation and delay gravity while jumping
		/*css{
		'phase0': ' '
		'phase1': 'phase1'
		'phase2': 'phase2'
		'phase3': 'phase3'
		'phase4': 'phase4'
		}*/
		data = {
			frameTimer: null,
			frameIntervals: 50
		};
		events= {
			loop: function(){
				game.objects.StickMan.animate();
			},
			startFrames: function(){
				data.frameIntervals = window.setInterval(events.loop, data.frameIntervals);
			}
		};
	}
	return game.objects.platforms;
};

function start(){
	Game = new easterEgg();
	Game.init();
}