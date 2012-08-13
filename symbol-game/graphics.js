function Game(){
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
					this.y +=1;
					return null;
					
				}else{
					this.jumpPhase--;
					if (this.jumpPhase === 0) {
						jumping = false;
					}
					this.y -=1;
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
			man = document.createElement('div');
			man.className = 'StickMan';
			man.style.left = x +"px";
			man.style.top= y+"px";
			man.style.width = 33+"px";
			man.style.height = 98+"px";
			document.getElementById("gameWorld").appendChild(man);
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
		function init(){

		}
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
	};
	this.gameloop = function(){
		this.man.x += CornerCollision(this.man, ground);
		this.man.collison = Collision(this.man, ground);
		this.man.gravity();
	};
	return this;
}
var game= new Game();
game.init(0,0);
