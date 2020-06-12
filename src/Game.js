class Game extends Phaser.Scene {

    constructor() {
        super('Game');
    }

    create() {
        const midX = this.cameras.main.centerX;

        var back = this.add.sprite(midX, 0, 'bg');
        back.setOrigin(0.5, 0);

        this.back = back;

        this.addSafeArea();

        this.scale.on('resize', this.resize, this);
    }

    addSafeArea() {
        // draw safe area
        this.safeArea = this.add.rectangle(
            this.cameras.main.width / 2 - +this.game.config.width / 2,
            0,
            this.game.config.width,
            this.game.config.height,
            0x0000ff,
            0.3
        )
        .setStrokeStyle(10, 0x0000ff, 0.7)
        .setOrigin(0)
        .setDepth(2)
        .setScrollFactor(0)

    }

    resize (gameSize)
    {
        console.log('resize Game scene');

        const camera = this.cameras.main;

        this.safeArea.x = camera.width / 2 - this.game.config.width / 2;
        this.back.x = camera.centerX;
    }
}
