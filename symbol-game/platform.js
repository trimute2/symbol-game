
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
