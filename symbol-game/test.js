describe("platform map", function(){
	var one = 0;
	var two =0;
	var map = [[0,15],[5,15],[10,15],[30,35],[35,35],[40,35],[0,50],[50,5],[50,10],[15,50],[20,50],[25,50],[30,50],[35,50],[40,50],[45,50]];
	it("platform map location "+one+" and "+two, function(){
				expect(platformMap[one][two]).toBe(map[one][two]);
	});
});
// describe("man", function(){
//	it("should have the right default x position", function(){
//		expect(man.x).toBe(0);
//	});
//	it("should have the right default y position", function(){
//		expect(man.y).toBe(10);
//	});
//	it("should have the right default width", function(){
//		expect(man.w).toBe(5);
//	});
//	it("should have the right default hight", function(){
//		expect(man.h).toBe(10);
//	});
//	it("does jump work", function(){
//		man.jump();
//		expect(man.jumping).toBe(true);
//	});
	
// it("direction should change",function(){
//	spyOn(man, 'walk');
//	man.walk(1);
//	expect(man.walk).toHaveBeenCalled();
// });
// });
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