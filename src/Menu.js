class Menu extends Phaser.Scene {

    constructor() {
        super('Menu');
    }

    create() {
        const midX = this.cameras.main.centerX;

        var back = this.add.sprite(midX, 0, 'bg');
        back.setOrigin(0.5, 0);

        var title = this.add.sprite(midX, 480, 'logo');
        title.setOrigin(0.5);

        title.setInteractive({ useHandCursor: true });
        title.on('pointerup', this.clickStart, this);

        this.tweens.add({targets: title, angle: title.angle-2, duration: 1000, ease: 'Sine.easeInOut' });
        this.tweens.add({targets: title, angle: title.angle+4, duration: 2000, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });

        this.cameras.main.fadeIn(200);

        this.addSafeArea();

        this.title = title;
        this.back = back;

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
        console.log('resize Menu scene');

        const camera = this.cameras.main;

        // TODO: instead of manually updating position of all objects,
        // may be better to update main camera position?

        this.safeArea.x = camera.width / 2 - this.game.config.width / 2;
        this.back.x = camera.centerX;
        this.title.x = camera.centerX;

    }

    clickStart() {
        this.scale.off('resize', this.resize, this);
        EPT.fadeOutScene('Game', this);
    }
}
