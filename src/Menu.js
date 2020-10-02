class Menu extends Phaser.Scene {
    GAME_WIDTH = 640;
    GAME_HEIGHT = 960;

    backgroundScene;
    parent;
    sizer;
    layerMain;

    constructor() {
        super('Menu');
    }

    create() {
        MainGame.state = this;

        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.scale.on('resize', this.resize, this);

        //======================================================================

        const midX = this.GAME_WIDTH*0.5;
        // console.log('midX', this.cameras.main.centerX);

        var back = this.add.sprite(this.GAME_WIDTH*0.5, 0, 'bg');
        back.setOrigin(0.5, 0);

        // this.layerMain = this.add.container();

        // const bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
        // bg.setOrigin(0.5, 0);
        // this.layerMain.add(bg);

        const guide = this.add.image(0, 0, 'guide').setOrigin(0, 0);
        // const guide = this.add.image(0, 0, 'guide').setDepth(1);
        // guide.setOrigin(0.5, 0);
        // this.layerMain.add(guide);

        var title = this.add.sprite(midX, 300, 'logo');
        // title.setOrigin(0.5);
        // this.layerMain.add(title);

        title.setInteractive({ useHandCursor: true });
        title.on('pointerup', this.clickStart, this);

        this.tweens.add({targets: title, angle: title.angle-2, duration: 1000, ease: 'Sine.easeInOut' });
        this.tweens.add({targets: title, angle: title.angle+4, duration: 2000, ease: 'Sine.easeInOut', yoyo: 1, loop: -1, delay: 1000 });

        // this.cameras.main.fadeIn(200);

        this.title = title;

        this.scoreText = this.add.text(50, 8, 'score: 0', { fontSize: '32px', fill: '#ff0000' });
        // this.layerMain.add(this.scoreText);

        //======================================================================
        this.updateCamera();
    }

    getZoom ()
    {
        return this.cameras.main.zoom;
    }

    updateCamera ()
    {
        const camera = this.cameras.main;

        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        var deltaY = Math.ceil(this.parent.height - this.sizer.height) * 0.5;

        console.log('this.parent.height',this.parent.height,'this.sizer.height',this.sizer.height);

        // const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
        const x = 0;
        const y = 0;

        const scaleX = this.sizer.width / this.GAME_WIDTH;
        const scaleY = this.sizer.height / this.GAME_HEIGHT;

        // camera.setViewport(x, y, this.sizer.width, this.sizer.height);
        // camera.setViewport(x, y, this.parent.width, this.parent.height);
        camera.setZoom(Math.max(scaleX, scaleY));

        const zoom = Math.max(scaleX, scaleY);
        const offset = deltaY / zoom;

        camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2 + offset);

        // this.layerMain.x = width / 2;
        // this.layerMain.y = 0;
        // this.layerMain.y = (height / 2) - deltaY;
        // this.layerMain.setScale(zoom);

    }


    resize (gameSize)
    {
        console.log('resize Menu scene');

        const width = gameSize.width;
        const height = gameSize.height;

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.updateCamera();

    }

    clickStart() {
        this.scale.off('resize', this.resize, this);
        EPT.fadeOutScene('Game', this);
    }
}
