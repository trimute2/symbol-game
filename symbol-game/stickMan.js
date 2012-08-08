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
var man =  new StickMan(0 ,10, 5, 10);
man.walk(1);
