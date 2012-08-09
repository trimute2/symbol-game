function game(){
	this.man=null;
	var ground;
	var map_data = [[' ',' ',' ',' ',' ',' ',' ',' ',' ',' '],
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

		this.moveTo = function(x, y){
			x = x;
			y = y;
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
					return 1;
					
				}else{
					this.jumpPhase--;
					if (this.jumpPhase === 0) {
						jumping = false;
					}
					return -1;
				}
				this.falling=false;
			}
		};
		this.jump = function(){
			if(!this.jumping && !this.falling){
				this.jumping = true;
				this.jumpPhase = 6;
			}
		};
		/*function collisionCheck(){
			for (var i = Things.length - 1; i >= 0; i--) {
				if (y+w === plat[i]) {
					if(x+h >= plat[i]|| x <=plat[i]){
						collison = true;
					}
				}
			}
		}
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
		}*/
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
						lp=null;
					}
				}
			}
			if(lp !== null){
				this.platforms.push(lp);
				lp=null;
			}
		}
		return this.platforms;
	}
	function Collision(itemOne, itemTwo){
		for (var area in itemTwo) {
			if (itemOne.x + itemOne.w <= itemTwo[area].x + itemTwo[area].w && itemOne.x >= itemTwo[area].x && itemOne.y + itemOne.h > itemTwo[area].y + itemTwo[area].h && itemOne.y <= itemTwo[area].y) {
				return true;
			}
		}
		return false;
	}
	this.init = function(){
		ground = new platform(map_data);
		this.man = new StickMan(30, 10, 5, 10);
	};
	this.gameloop = function(){
		this.man.collison = Collision(this.man, ground);
		this.man.gravity();
	};
	return this;
}
var Game = new game();
Game.init();
