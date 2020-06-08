var MainGame = {
	Config: {SOURCE_GAME_WIDTH:640, SOURCE_GAME_HEIGHT:960},
}

var config = {
	type: Phaser.AUTO,
	scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game-container',
        width: 640,
        height: 960,
        max: {
            width: 1400,
            height: 1200
        }
    },
	scene: [Boot, Preloader, BackgroundScene, Menu]
}

game = new Phaser.Game(config);

window.focus();
