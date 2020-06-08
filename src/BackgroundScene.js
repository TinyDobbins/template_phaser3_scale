class BackgroundScene  extends Phaser.Scene {
    gameScene;

    constructor() {
        super('BackgroundScene');
    }

    create() {
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);

        this.scene.launch('Menu');
        this.gameScene = this.scene.get('Menu');
    }

    updateCamera ()
    {
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        const camera = this.cameras.main;

        //  There is 240px of extra padding below the game area in the background graphic
        //  so we account for it in the y offset (scaled by the game zoom factor)

        const zoom = this.gameScene.getZoom();
        const offset = 120 * zoom;

        //  We can either zoom and re-center the camera:

        camera.setZoom(zoom);
        camera.centerOn(1400 / 2, (1200 / 2) - 120);

        //  Or, if you want to put all of the Game Objects in this Scene into a layer,
        //  you can position and scale that:

        // this.layer.x = width / 2;
        // this.layer.y = (height / 2) + offset;
        // this.layer.setScale(zoom);
    }
}
