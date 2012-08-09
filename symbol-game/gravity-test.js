// game = null;
describe("gravity",function(){
	var number = 1;
	beforeEach(function(){
		game = new Game();
		game.init();
		for(i = 0; i <number; i++){
			game.gameloop();
		}
		number++;
	});
	it("is man falling at x:30, y:24", function(){
		expect(game.man.falling).toBe(true);
	});
	it("is man not falling at x:30, y:25", function(){
		expect(game.man.falling).toBe(false);
	});
});