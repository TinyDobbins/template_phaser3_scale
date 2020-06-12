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
	parent: 'game-container',
	scale: {
		width: MainGame.Config.DEFAULT_WIDTH,
		height: MainGame.Config.DEFAULT_HEIGHT,
		mode: Phaser.Scale.NONE
	},
	scene: [Boot, Preloader, Menu, Game]
}

game = new Phaser.Game(config);

window.addEventListener('load', () => {
	const resize = () => {
		const w = window.innerWidth
		const h = window.innerHeight

		let width = MainGame.Config.DEFAULT_WIDTH
		let height = MainGame.Config.DEFAULT_HEIGHT
		let maxWidth = MainGame.Config.MAX_WIDTH
		let maxHeight = MainGame.Config.MAX_HEIGHT
		let scaleMode = MainGame.Config.SCALE_MODE

		let scale = Math.min(w / width, h / height)
		let newWidth = Math.min(w / scale, maxWidth)
		let newHeight = Math.min(h / scale, maxHeight)

		// resize the game
		game.scale.resize(newWidth, newHeight)

		// scale the width and height of the css
		game.canvas.style.width = newWidth * scale + 'px'
		game.canvas.style.height = newHeight * scale + 'px'

		// center the game with css margin
		game.canvas.style.marginTop = `${(h - newHeight * scale) / 2}px`
		game.canvas.style.marginLeft = `${(w - newWidth * scale) / 2}px`
	}

	window.addEventListener('resize', event => {
		resize();
	})

	resize();
})

window.focus();
