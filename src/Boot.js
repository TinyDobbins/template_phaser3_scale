class Boot extends Phaser.Scene {
    constructor() {
        super('Boot');
    }

    preload() {
        this.load.image('preloader_bar', 'assets/preloader_bar.png?r=2');
        this.load.image('preloader_back', 'assets/preloader_back.png?r=2');

        WebFont.load({ custom: { families: ['Berlin'], urls: ['assets/fonts/BRLNSDB.css'] } });
    }

    create() {
        EPT.world = {
            width: this.cameras.main.width,
            height: this.cameras.main.height,
            centerX: this.cameras.main.centerX,
            centerY: this.cameras.main.centerY
        };

        EPT.Lang.updateLanguage('en');

        EPT.text = EPT.Lang.text[EPT.Lang.current];

        // this.setupScale();

        this.scene.start('Preloader');
    }

    setupScale (){
        if (this.game.config.scaleMode === Phaser.Scale.NONE) {
            this.scaleForMobile();
        }
    }

    scaleForMobile (){
        window.addEventListener("resize", this.onWindowResize.bind(this));
        this.onWindowResize();
    }

    onWindowResize (){
        //update scale scene
        let width = window.innerWidth;
		let height = window.innerHeight;
		let dpr = Math.min(window.devicePixelRatio, 1.5);
		this.scale.zoom = 1 / dpr;
		this.scale.resize(width * dpr, height * dpr);

        // check orientation
        if(game.device.os.desktop){

        }else{
            if(window.innerWidth > window.innerHeight){
                // landscape
                this.checkOriention('landscape')
            }else{
                // portrait
                this.checkOriention('portrait')
            }
        }

        this.handleScroll()

    }

    checkOriention (orientation){
        if (orientation === 'portrait'){
            this.leaveIncorrectOrientation();

        }else if (orientation === 'landscape'){
            this.enterIncorrectOrientation();

        }

    }

    enterIncorrectOrientation (){
        document.getElementById('orientation').style.display = 'block';
        // if(!game.device.os.android){
        // 	document.getElementById('orientation').style.width = window.innerWidth + 'px';
        // 	document.getElementById('orientation').style.height = window.innerHeight + 'px';
        // }
    }

    leaveIncorrectOrientation (){
        document.getElementById('orientation').style.display = 'none';
    }

    isLandscape() {
        return window.innerWidth > window.innerHeight
    }

    isPortrait() {
        return window.innerHeight > window.innerWidth
    }

    handleScroll() {
		if (typeof this.scrollTimeout !== "undefined") {
			clearTimeout(this.scrollTimeout)
		}

		this.scrollTimeout = setTimeout(() => {
			window.scrollTo(0, -window.innerHeight)
		}, 500)
	}
}
