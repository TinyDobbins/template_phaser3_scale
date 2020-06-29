class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    preload() {
        const midX = this.cameras.main.centerX;

        this.preloader_back = this.add.image(midX, 480, 'preloader_back');
        this.preloader_bar = this.add.image(midX, 480, 'preloader_bar');

        this.preloader_crop = new Phaser.Geom.Rectangle(0, 0, 0, this.preloader_bar.height);
        this.preloader_bar.setCrop(this.preloader_crop);

        this.load.on(Phaser.Loader.Events.PROGRESS, this.onLoadProgress, this);
		this.load.once(Phaser.Loader.Events.COMPLETE, this.onLoadComplete, this);

		var resources = {
			'image': [
				['logo', 'assets/logo.png'],
				['bg', 'assets/background/bg.png'],
				['guide', 'assets/background/640x960-guide.png']
			]
		};

		for(var method in resources) {
			resources[method].forEach(function(args) {
				var loader = this.load[method];
				loader && loader.apply(this.load, args);
			}, this);
		};
    }

    onLoadProgress () {
        this.updateLogoCrop(this.load.progress)
    }

    updateLogoCrop (loadProgress) {
        var originalWidth = this.preloader_bar.width
        var width = originalWidth * loadProgress

        this.tweens.killTweensOf(this.preloader_crop);

        if(loadProgress == 1){
            this.preloader_bar.isCropped = false;

        }else{
            this.tweens.add({
                targets: this.preloader_crop,
                width: width,
                ease: Phaser.Math.Easing.Linear,
                duration: 200,
                onUpdate: () => {
                    this.preloader_bar.setCrop(this.preloader_crop);
                }
            });
        }

    }

    onLoadComplete () {
        this.tweens.killTweensOf(this.preloader_crop);
        this.load.off(Phaser.Loader.Events.PROGRESS, this.onLoadProgress);
        this.preloader_bar.isCropped = false;
    }

    create() {
        EPT.fadeOutScene('Menu', this);
	}
}
