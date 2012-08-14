function Game(){
	this.man=null;
	this.interval_id = null;
	var ground;
	var map_data = [[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					['_','_','_',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','_','_'],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ','_','_','_',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					['_','_','_','_','_','_','_','_','_','_','_','_','_']];
	function KeyBoardMonitor(){

		downKeys = {},
		keyMap = {
			'left' : 37,
			'up' : 38,
			'right' : 39
		},
		this.events = {
			KeyDown: function(e){
				console.log(e);
				if(keys[e.Keycode]&&keys[e.Keycode].down){
					if (typeof downKeys[e.keyCode] === 'undefined') {
						downKeys[e.keyCode] = true;
						keys[e.keyCode].down(e);
					}
					if (typeof keys[e.keyCode].allowEvent === 'undefined') {
						return stopEvent(e);
					}
				}
				if(e.keyCode === 37){
					console.log("move left");
					game.man.walk(-1);
					game.man.x -= 1;
				} else if(e.keyCode === 39){
					console.log("move right");
					game.man.x += 0.5;
				} else if(e.keyCode === 38){
					console.log("jump");
					game.man.jump();
				}
			},
			keyup: function(e) {
				console.log(e);
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
					
				},
				up: function(){
					game.man.stopWalk();
				}
			},
			'39':{
				allowEvent: true,
				down: function(){
					game.man.walk(1);
					game.man.x += 1;
			},
				up: function(){
					game.man.stopWalk();
				}
			},
			'38':{
				allowEvent: true,
				down: function(){
					game.man.jump();
				}
			}
		};
		this.isDown = function(labelOrCode) {
			return (typeof keyMap[labelOrCode] !== 'undefined' ? downKeys[keyMap[labelOrCode]] : downKeys[labelOrCode]);
		};
	}
	function StickMan(X ,Y, W, H){
		this.x = X;
		this.y = Y;
		this.w = W;
		this.h = H;
		this.collison = true;
		this.falling = false;
		this.jumping = false;
		this.walking = false;
		this.jumpPhase = 0;
		this.direction = {
			left: true,
			right: false
		};
		this.element = null;

		this.moveTo = function(x, y){
			this.x = x;
			this.y = y;
		};

		this.addDirection = function(new_direction, new_oppisete){
			this.direction[new_direction]=true;
			this.direction[new_oppisete]=false;
		};

		this.remove = function(direction){
			this.direction[direction] =false;
		};
		this.walk = function(xDirection){
			walking = true;
			if (xDirection > 0) {
				this.addDirection('right','left');
			}else if(xDirection < 0){
				this.addDirection('left','right');
			}
		};
		this.gravity = function(){
			if (!this.collison) {
				if(!this.jumping){
					this.falling = true;
					this.y +=1;
					return null;
					
				}else{
					this.jumpPhase--;
					if (this.jumpPhase === 0) {
						jumping = false;
					}
					this.y -=0.5;
					return null;
				}
			}else{
				this.falling=false;
			}
		};
		this.jump = function(){
			if(!this.jumping && !this.falling){
				this.jumping = true;
				this.jumpPhase = 6;
			}
		};
		this.init = function(x,y){
			this.element = document.createElement('div');
			this.element.className = 'StickMan';
			this.element.style.left = x*10+"px";
			this.element.style.top= y*10+"px";
			this.element.style.width = 33+"px";
			this.element.style.height = 98+"px";
			document.getElementById("gameWorld").appendChild(this.element);
		};
		/*function collisionCheck(){
			for (var i = Things.length - 1; i >= 0; i--) {
				if (y+w === plat[i]) {
					if(x+h >= plat[i]|| x <=plat[i]){
						collison = true;
					}
				}
			}
		}*/
		this.animate = function(){
			// var k = new KeyBoardMonitor();
			// if (k.isDown('left')) {
			// 	this.x -= 1;
			// }
			// if (k.isDown('right')) {
			// 	this.x += 1;
			// }
			this.gravity();
			this.element.style.top = this.y*10+"px";
			this.element.style.left = this.x*10+"px";
		};
		return this;
	}
	function platform(map){
		this.platforms = [];
		var length = map.length -1;
		var lp = null;
		for (var h = 0; h <= length; h++) {
			for (var w = 0; w <= map[h].length-1; w++) {
				if(map[h][w] === '_'){
					if(lp === null){
						lp = {"x":w*5, "y":h*5, "h":1, "w":5};
					}else{
						lp.w += 5;
					}
				}else{
					if(lp !== null){
						this.platforms.push(lp);
						console.log("creatin platform");
						platform = document.createElement('div');
						platform.className = 'platform';
						console.log(lp.x*10 );
						platform.style.left = (lp.x*10 )+"px";
						console.log(lp.y*10 );
						platform.style.top= (lp.y*10 )+"px";
						platform.style.width = (lp.w*10 -2)+"px";
						platform.style.height = (lp.h*25 -2)+"px";
						document.getElementById("gameWorld").appendChild(platform);
						lp=null;
					}
				}
			}
			if(lp !== null){
				this.platforms.push(lp);
				console.log("creatin platform");
				platform = document.createElement('div');
				platform.className = 'platform';
				console.log(lp.x*10 );
				platform.style.left = (lp.x*10 )+"px";
				console.log(lp.y*10 );
				platform.style.top= (lp.y*10 )+"px";
				platform.style.width = (lp.w*10 -2)+"px";
				platform.style.height = (lp.h*25 -2)+"px";
				document.getElementById("gameWorld").appendChild(platform);
				lp=null;
			}
		}
		return this.platforms;
	}
	function Collision(itemOne, itemTwo){
		for (var area in itemTwo) {
			if ((itemOne.x + itemOne.w <= itemTwo[area].x + itemTwo[area].w) &&
				(itemOne.x >= itemTwo[area].x) &&
				((itemOne.y + itemOne.h <= (itemTwo[area].y + itemTwo[area].h) && (itemOne.y + itemOne.h) >= itemTwo[area].y) ||
				(itemOne.y >= itemTwo[area].y && itemOne.y <= (itemTwo[area].y + itemTwo[area].h)))) {
				return true;
			}
		}
		return false;
	}
	function CornerCollision(itemOne, itemTwo){
		for (var area in itemTwo) {
			if ((itemOne.x + itemOne.w > itemTwo[area].x ) &&
				(itemOne.x < itemTwo[area].x) &&
				((itemOne.y + itemOne.h <= (itemTwo[area].y + itemTwo[area].h) && (itemOne.y + itemOne.h) >= itemTwo[area].y) ||
				(itemOne.y >= itemTwo[area].y && itemOne.y <= (itemTwo[area].y + itemTwo[area].h)))) {
				if(itemOne.x + itemOne.w -itemTwo[area].x > 2){
					return 3;
				}else{
					return -3;
				}
			}else if ((itemOne.x + itemOne.w > itemTwo[area].x +itemTwo[area].w) &&
				(itemOne.x < itemTwo[area].x + itemTwo[area].w ) &&
				((itemOne.y + itemOne.h <= (itemTwo[area].y + itemTwo[area].h) && (itemOne.y + itemOne.h) >= itemTwo[area].y) ||
				(itemOne.y >= itemTwo[area].y && itemOne.y <= (itemTwo[area].y + itemTwo[area].h)))) {
				if(itemTwo[area].x + itemTwo[area].w - itemOne.x > 2){
					return -3;
				}else{
					return 3;
				}
			}
		}
		return 0;
	}
	this.init = function(x,y){
		ground = new platform(map_data);
		/* have you seen*/this.man = new StickMan(x, y, 5, 10);
		this.man.init(x,y);
		this.keyBoard = new KeyBoardMonitor();
		document.body.onkeydown= this.keyBoard.events.KeyDown;
		document.body.onkeyup= this.keyBoard.events.keyup;

		// this.gameloop();
	};
	this.gameloop = function(){
		game.man.x += CornerCollision(game.man, ground);
		game.man.collison = Collision(game.man, ground);
		game.man.animate();
		if (false) {
			window.clearInterval(this.interval_id);
			this.interval_id = null;
			// return null;
		}
		// else{
		// return this.gameloop();
		// }
	};
	return this;
}
var game= new Game();
game.init(20,0);
game.interval_id = window.setInterval(game.gameloop, 50);