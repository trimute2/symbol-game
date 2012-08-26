function Game(){
	this.man=null;
	this.interval_id = null;
	this.symbolOne= null;
	this.symbolPartOne= null;
	this.symbolPartOne= null;
	var ground;
	var worldLength;
	var map_data = [[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					['_','_','_',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','_','_'],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ','_','_','_',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					[' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
					['_','_','_','_','_','_','_','_','_','_','_','_','_','_']];
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
					this.moveLeft = true;
					game.man.move_x = -5;
					console.log(this.moveLeft);
				} else if(e.keyCode === 39){
					console.log("move right");
					this.moveRight = true;
					game.man.move_x = 5;
				}
				if(e.keyCode === 38){
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
				if(e.keyCode === 37){
					console.log("move left");
					game.man.walk(-1);
					this.moveLeft = false;
					game.man.move_x = 0;
				}
				if(e.keyCode === 39){
					console.log("move right");
					this.moveRight = false;
					game.man.move_x = 0;
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
	function symbolMain(X,Y){
		this.x = X;
		this.y = Y;
		this.w = 50;
		this.h = 25;
		this.parts = 0;
		this.collision = true;
		this.falling = false;
		this.pushing={
			right: false,
			left: false
		};

		this.gravity = function(){
			// if(this.pushing === true){
			// }
			if (!this.collision) {
				// console.log('no collision');
					this.falling = true;
					this.y +=5;
					return null;
				}
		};

		this.init = function(){
			this.element = document.createElement('div');
			this.element.className = 'symbolMain';
			this.element.style.left = this.x+"px";
			this.element.style.top= this.y+"px";
			this.element.style.width = this.w+"px";
			this.element.style.height = this.h+"px";
			document.getElementById("gameWorld").appendChild(this.element);
		};
		this.animate = function(){
			if(this.parts === 1){
				this.element.className = 'symbolMain1';
			}
			if(this.parts === 2){
				this.element.className = 'symbolMain2';
			}
			this.gravity();
			this.element.style.top = this.y+"px";
			this.element.style.left = this.x+"px";
		};
	}
	function symbolPart(X,Y,Part){
		this.x = X;
		this.y = Y;
		this.w = 25;
		this.h = 25;
		this.listed = false;
		this.collision = true;
		this.falling = false;
		this.part = Part;
		this.pushing={
			right: false,
			left: false
		};

		this.gravity = function(){
			// if(this.pushing === true){
			// }
			if (!this.collision) {
				// console.log('no collision');
					this.falling = true;
					this.y +=5;
					return null;
				}
		};

		this.init = function(){
			this.element = document.createElement('div');
			if(this.part===1){
				this.element.className = 'symbolPartOne';
			}
			if(this.part===2){
				this.element.className = 'symbolPartTwo';
			}
			this.element.style.left = this.x+"px";
			this.element.style.top= this.y+"px";
			this.element.style.width = this.w+"px";
			this.element.style.height = this.h+"px";
			document.getElementById("gameWorld").appendChild(this.element);
		};
		this.animate = function(){
			this.gravity();

			this.element.style.top = this.y+"px";
			this.element.style.left = this.x+"px";
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
		this.jumpPower = 5;
		this.jumpPhase = 0;
		this.direction = {
			left: true,
			right: false
		};
		this.move_x = 0;
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
					this.y += Math.floor(this.jumpPower);
					if (this.jumpPower < 15) {
						this.jumpPower += 0.5;
					}
					return null;
					
				}else{
					if(this.jumping){
					if (this.jumpPhase <= 0) {
						this.jumping = false;
						this.jumpPhase=0;
						this.falling = true;
						if (this.jumpPower < 15) {
							this.jumpPower += 0.5;
						}
						return null;
					}
					this.jumpPhase -= 5;
					console.log(this.jumpPhase);
					this.y += Math.floor(this.jumpPower);
					this.collison=false;
				}
					if (this.jumpPower < 15) {
						this.jumpPower += 0.5;
					}
					return null;
				}
			}else{
				if(this.jumping){
					if (this.jumpPhase <= 0) {
						this.jumping = false;
						this.jumpPhase=0;
						this.falling = true;
						if (this.jumpPower < 15) {
							this.jumpPower += 0.5;
						}
						return null;
					}
					this.jumpPhase = 5;
					console.log(this.jumpPhase);
					this.y += Math.floor(this.jumpPower);
					this.collison=false;
				}else{
					// if (this.jumpPower > 7) {
					// //this.y -=this.jumpPower;
					// }
					this.jumpPower=5;
				}
				this.falling=false;
				if (this.jumpPower < 15) {
					this.jumpPower += 0.5;
				}
				return null;
			}
			console.log(this.jumpPower);
			
		};
		this.jump = function(){
			if(!this.jumping && !this.falling){
				this.jumping = true;
				this.jumpPower= -15;
				this.jumpPhase = 200;
			}
		};
		this.init = function(x,y){
			this.element = document.createElement('div');
			this.element.className = 'StickMan';
			this.element.style.left = x+"px";
			this.element.style.top= y+"px";
			this.element.style.width = this.w+"px";
			this.element.style.height = this.h+"px";
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
			// if(this.moveLeft){
			// 	this.x -=1;
			// }
			// if(this.moveRight){
			// 	this.x +=1 ;
			// }
			this.gravity();
			this.x += this.move_x;
			if (worldLength < this.x+this.w) {
				this.x += -5;
			}
			// console.log(this.moveLeft);
			this.element.style.top = this.y+"px";
			this.element.style.left = this.x+"px";

		};
		return this;
	}
	function platform(map){
		this.platforms = [];
		var length = map.length -1;
		worldLength = length * 60;
		var lp = null;
		for (var h = 0; h <= length; h++) {
			for (var w = 0; w <= map[h].length-1; w++) {
				if(map[h][w] === '_'){
					if(lp === null){
						lp = {"x":w*45, "y":h*50, "h":25, "w":60};
					}else{
						lp.w += 60;
					}
				}else{
					if(lp !== null){
						this.platforms.push(lp);
						console.log("creatin platform");
						platform = document.createElement('div');
						platform.className = 'platform';
						console.log(lp.x*10 );
						platform.style.left = lp.x+"px";
						console.log(lp.y*10 );
						platform.style.top= lp.y+"px";
						platform.style.width = lp.w+"px";
						platform.style.height = lp.h+"px";
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
						platform.style.left = lp.x+"px";
						console.log(lp.y*10 );
						platform.style.top= lp.y+"px";
						platform.style.width = lp.w+"px";
						platform.style.height = lp.h+"px";
						document.getElementById("gameWorld").appendChild(platform);
						lp=null;
			}
		}
		return this.platforms;
	}
	function Collision(itemOne, itemTwo){

		for (var area in itemTwo) {
			// console.log('itemOne: ',itemOne.x, itemOne.w, itemOne.y, itemOne.h);
			if (((itemOne.x + itemOne.w) <= (itemTwo[area].x + itemTwo[area].w)) &&
				(itemOne.x >= itemTwo[area].x) &&
				((itemOne.y + itemOne.h <= (itemTwo[area].y + itemTwo[area].h) && (itemOne.y + itemOne.h) >= itemTwo[area].y))) {
				return true;
			}
		}
	}
	function CollisionParts(itemOne, itemTwo){
			// console.log('itemOne: ',itemOne.x, itemOne.w, itemOne.y, itemOne.h);
		if (((itemOne.x + itemOne.w) <= (itemTwo.x + itemTwo.w)) &&
			(itemOne.x >= itemTwo.x) &&
			((itemOne.y + itemOne.h <= (itemTwo.y + itemTwo.h) && (itemOne.y + itemOne.h) >= itemTwo.y)&&
			(itemOne.y <= (itemTwo.y + itemTwo.h)))) {
			return true;
		}
	}
	function CornerCollision(itemOne, itemTwo){
		for (var area in itemTwo) {
			if ((itemOne.x + itemOne.w > itemTwo[area].x ) &&
				(itemOne.x < itemTwo[area].x) &&
				((itemOne.y + itemOne.h <= (itemTwo[area].y + itemTwo[area].h) && (itemOne.y + itemOne.h) >= itemTwo[area].y) &&
				(itemOne.y <= (itemTwo[area].y + itemTwo[area].h)))) {
					return true;
				}else if ((itemOne.x + itemOne.w > itemTwo[area].x +itemTwo[area].w) &&
					(itemOne.x < itemTwo[area].x + itemTwo[area].w ) &&
					((itemOne.y + itemOne.h <= (itemTwo[area].y + itemTwo[area].h) && (itemOne.y + itemOne.h) >= itemTwo[area].y) &&
					(itemOne.y <= (itemTwo[area].y + itemTwo[area].h)))) {
					return true;
			}
		}
	}
	function CornerCollisionParts(itemOne, itemTwo){
		if ((itemOne.x + itemOne.w > itemTwo.x ) &&
			(itemOne.x < itemTwo.x) &&
			((itemOne.y + itemOne.h === (itemTwo.y + itemTwo.h) && (itemOne.y + itemOne.h) === itemTwo.y))) {
				return true;
			}else if ((itemOne.x + itemOne.w > itemTwo.x +itemTwo.w) &&
				(itemOne.x < itemTwo.x + itemTwo.w ) &&
				((itemOne.y + itemOne.h <= (itemTwo.y + itemTwo.h) && (itemOne.y + itemOne.h) >= itemTwo.y))) {
				return true;
		}
	}
	function listCollision(itemOne, itemTwo){
		if(!Collision(itemOne,itemTwo)){
			if (!CornerCollision(itemOne,itemTwo)) {
				return false;
			}
		}
		return true;
	}
	function listCollisionParts(itemOne, itemTwo){
		if(!CollisionParts(itemOne,itemTwo)){
			if (!CornerCollisionParts(itemOne,itemTwo)) {
				return 0;
			}
		}
		return 1;
	}
	function pushing(itemOne, itemTwo){
		if(((itemOne.y+itemOne.h) >= (itemTwo.y + itemTwo.h)) && (itemOne.y <= itemTwo.y)){
			if(((itemOne.x + itemOne.w) >= itemTwo.x) && (itemOne.x <= itemTwo.x)){
				return 5;
			}
		}
		if(((itemOne.y+itemOne.h) >= (itemTwo.y + itemTwo.h)) && (itemOne.y <= itemTwo.y)){
			if((itemOne.x <= (itemTwo.x+itemTwo.w)) && ((itemOne.x + itemOne.w) >= (itemTwo.x + itemTwo.w))){
				return -5;
			}
		}
		return 0;
	}
	this.init = function(x,y){
		ground = new platform(map_data);
		/* have you seen*/this.man = new StickMan(x, y, 35, 100);
		this.man.init(x,y);
		this.symbolOne = new symbolMain(300, 0);
		this.symbolPartOne = new symbolPart(30, 0, 1);
		this.symbolPartTwo = new symbolPart(550, 0, 2);
		this.symbolOne.init();
		this.symbolPartOne.init();
		this.symbolPartTwo.init();
		this.keyBoard = new KeyBoardMonitor();
		document.body.onkeydown= this.keyBoard.events.KeyDown;
		document.body.onkeyup= this.keyBoard.events.keyup;
		console.log(ground);
		// this.gameloop();
	};
	this.gameloop = function(){
		game.man.collison = listCollision(game.man, ground);
		game.symbolOne.collision = listCollision(game.symbolOne, ground);
		game.symbolPartOne.collision = listCollision(game.symbolPartOne, ground);
		game.symbolPartTwo.collision = listCollision(game.symbolPartTwo, ground);
		if (!game.symbolPartOne.listed) {
			game.symbolOne.parts += listCollisionParts(game.symbolPartOne, game.symbolOne);
			game.symbolPartOne.listed= true;
		}
		if (!game.symbolPartTwo.listed) {
			game.symbolOne.parts += listCollisionParts(game.symbolPartTwo, game.symbolOne);
			game.symbolPartTwo.listed = true;
		}
		if(game.symbolOne.collision){
			if(listCollisionParts(game.symbolPartOne, game.symbolOne) === 1){
				game.symbolPartOne.collision = true;
			}
		}
		if(game.symbolOne.collision){
			if(listCollisionParts(game.symbolPartTwo, game.symbolOne) === 1){
				game.symbolPartTwo.collision = true;
			}
		}
		
		if(game.symbolOne.collision){
			game.symbolOne.x += pushing(game.man ,game.symbolOne);
		}
		if(game.symbolPartOne.collision){
			game.symbolPartOne.x += pushing(game.man ,game.symbolPartOne);
		}
		if(game.symbolPartTwo.collision){
			game.symbolPartTwo.x += pushing(game.man ,game.symbolPartTwo);
		}
		if(game.symbolPartTwo.collision && game.symbolPartOne.collision){
			console.log("yep");
			if (pushing(game.symbolPartOne ,game.symbolPartTwo) === -5){
				game.symbolPartTwo.x += -1;
			}else if(pushing(game.symbolPartOne ,game.symbolPartTwo) === 5) {
				game.symbolPartTwo.x += 1;
			}
		}
		game.man.animate();
		game.symbolOne.animate();
		game.symbolPartOne.animate();
		game.symbolPartTwo.animate();
		// console.log('Loop: '+game.i);
		// if (game.i>=100) {
		// 	window.clearInterval(game.interval_id);
		// 	this.interval_id = null;
		// 	// return null;
		// }
		// game.i += 1;
		// else{
		// return this.gameloop();
		// }
	};
	return this;
}
var game= new Game();
game.init(200,0);
game.i = 1;
game.interval_id = window.setInterval(game.gameloop, 1000/60);