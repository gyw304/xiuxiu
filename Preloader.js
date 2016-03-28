MyGame.Preloader = function(game){
};


var resources = [

];


MyGame.Preloader.prototype = {

    create:function(){
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);
        this.text = this.add.text(this.world.width/2, this.world.height/2-50, '', { fill: '#fff' });
        this.text.anchor.set(0.5);
        this.start();
    },
    start:function(){

        this.load.image('bg','assets/bg.jpg');

        this.load.image('sun','assets/sun.png?1');

        this.load.image('ex_bg','assets/ex_bg.jpg');

        this.load.image('ex_warp','assets/ex_warp.png');

        this.load.image('spoilbox','assets/spoilbox.png');

        this.load.image('myspoil','assets/myspoil_warp.png');

        this.load.image('login','assets/login.png');

        this.load.image('rule','assets/rule.png');

        this.load.image('adbox','assets/adbox.png');

        for(var i=0;i<=config.AD.length-1;i++)
        {
            this.load.image('adimg_'+i+'',config.AD[i].adimg);
        }

        this.load.audio('xiuxiu','assets/xiuxiu.mp3?1');

        this.load.atlas('atlas_ico', 'assets/atlas_ico.png?13', 'assets/atlas_ico.json?13');

        this.load.start();
    },
    fileComplete:function(progress){
        this.text.setText( + progress + "%");
    },
    loadComplete:function(){
        this.state.start('Game');
    }


    /*preload: function() {

        this.loadBar = this.add.group();
        this.loadBar.create(0,0,'loadingBar_0');
        this.preloadBar = this.loadBar.create(0,0,'loadingBar_1');
        console.log(this.load)
        this.load.setPreloadSprite(this.preloadBar);
        this.loadBar.y = MyGame.GAME_HEIGHT/2;


        /!*this.load.image('game_bg','assets/bg.jpg');
        this.load.image('bird','assets/bird.png');
        this.load.image('wall_left','assets/wall.jpg');
        this.load.image('wall_right','assets/wall.jpg');
        this.load.image('nail_top','assets/nail_top.png?1');
        this.load.image('nail_bottom','assets/nail_bottom.png?1');
        this.load.image('nail_left','assets/nail_left.png?1');
        this.load.image('nail_right','assets/nail_right.png?1');
        this.load.image('button-rest','assets/restBtn.png');*!/

    },
    create: function() {
        //this.state.start('MainMenu');
    }*/
};