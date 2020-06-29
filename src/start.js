var MainGame = {
	Config: {
		DEFAULT_WIDTH:	640,
		DEFAULT_HEIGHT:	960,
		MAX_WIDTH:	1400,
		MAX_HEIGHT:	1200
	},
}

var config = {
	type: Phaser.AUTO,
	scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game-container',
        width: 640,
        height: 960,
        /*min: {
            width: 320,
            height: 480
        },*/
        /*max: {
            width: 1400,
            height: 1200
        }
		//*/
    },
	scene: [Boot, Preloader, Menu, Game]
}

const game = new Phaser.Game(config);

window.focus();
