describe("platform map", function(){
	beforeEach(function(){
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
		platformMap = new platform(map_data);
		map_results = map_results = [{x:0, y:15, h:1, w:1},{x:5, y:15, h:1, w:2},{x:10, y:15, h:1, w:3},{x:30, y:35, h:1, w:1},{x:35, y:35, h:1, w:2},{x:40, y:35, h:1, w:3},{x:0, y:50, h:1, w:1},{x:5, y:50, h:1, w:2},{x:10, y:50, h:1, w:3},{x:15, y:50, h:1, w:4},{x:20, y:50, h:1, w:5},{x:25, y:50, h:1, w:6},{x:30, y:50, h:1, w:7},{x:35, y:50, h:1, w:8},{x:40, y:50, h:1, w:9},{x:45, y:50, h:1, w:10}];
	});
	it("Check platforms locations", function(){
		for (var platform=0; platform < platformMap.length; platform++) {
			expect(platformMap[platform][0]).toBe(map_results[platform][0]);
			expect(platformMap[platform][1]).toBe(map_results[platform][1]);
		}
				
	});
	// two++;
	// it("platform map location "+one+" and "+two, function(){
	// 			expect(platformMap[one][two]).toBe(map[one][two]);
	// });
	// one++;
});

/*
	it("map to platform array", function(){
		
		it("platform array correct", function(){
			expect(game.objects.platforms).toBe([[0,15],[5,15],[10,15],[30,35],[35,35],[40,35],[0,50],[50,5],[50,10],[15,50],[20,50],[25,50],[30,50],[35,50],[40,50],[45,50]]);
		});
		it("platform array is not correct", function(){
			expect(game.objects.platforms).not.toBe([[0,15],[5,15],[10,15],[30,35],[35,35],[40,35],[0,50],[50,5],[50,10],[15,50],[20,50],[25,50],[30,50],[35,50],[40,50],[45,50]]);
		});
	});
});*/