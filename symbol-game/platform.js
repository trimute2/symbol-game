
function platform(map){
	this.platforms = [];
	var length = map.length -1;
	var lp = null;
	for (var h = 0; h <= length; h++) {
		for (var w = 0; w <= map[h].length-1; w++) {
			if(map[h][w] === '_'){
				if(lp === null){
					this.platforms.push({"x":w*5, "y":h*5, "h":1, "w":1});
					lp = {"x":w*5, "y":h*5, "h":1, "w":1};
				}else{
					lp = {"x":w*5, "y":h*5, "h":1, "w": lp.w+1};

				}
			}else{
				lp = null;
			}
		}
	}
	return this.platforms;
}
