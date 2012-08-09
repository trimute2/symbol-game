describe("gravity",function(){
	var number = 1;
	beforeEach(function(){
		for(i = 0; i <number; i++){
			Game.gameloop();
			console.log(Game.man.collison);
		}
	});
	it("is man falling at x:30, y:20", function(){
		expect(Game.man.falling).toBe(true);
	});
});