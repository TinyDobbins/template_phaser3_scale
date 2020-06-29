class Game extends Phaser.Scene {
    GAME_WIDTH = 640;
    GAME_HEIGHT = 960;
    
    constructor() {
        super('Game');
    }

    create() {
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(this.GAME_WIDTH, this.GAME_HEIGHT, Phaser.Structs.Size.FIT, this.parent);

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.scale.on('resize', this.resize, this);


        this.layerMain = this.add.container();

        const bg = this.add.image(0, 0, 'bg');
        bg.setOrigin(0.5, 0);
        this.layerMain.add(bg);

        this.scale.on('resize', this.resize, this);

        this.updateCamera();
    }

    updateCamera ()
    {
        // const camera = this.cameras.main;

        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        var deltaY = Math.ceil(this.parent.height - this.sizer.height) * 0.5;

        console.log('this.parent.height',this.parent.height,'this.sizer.height',this.sizer.height);

        // const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
        // const y = 0;

        const scaleX = this.sizer.width / this.GAME_WIDTH;
        const scaleY = this.sizer.height / this.GAME_HEIGHT;

        // camera.setViewport(x, y, this.sizer.width, this.sizer.height);
        // camera.setZoom(Math.max(scaleX, scaleY));
        // camera.centerOn(this.GAME_WIDTH / 2, this.GAME_HEIGHT / 2);

        const zoom = Math.max(scaleX, scaleY);
        const offset = 120 * zoom;

        this.layerMain.x = width / 2;
        this.layerMain.y = 0;
        // this.layerMain.y = (height / 2) - deltaY;
        this.layerMain.setScale(zoom);

    }

    resize (gameSize)
    {
        console.log('resize Game scene');

        const width = gameSize.width;
        const height = gameSize.height;

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.updateCamera();
    }
}
