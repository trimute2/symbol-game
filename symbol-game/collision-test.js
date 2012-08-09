describe("collision", function(){
	it("is coliding", function(){
		var collide = Game.gameloop();
		expect(collide).toBe(true);
	});
});