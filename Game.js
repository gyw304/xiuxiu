MyGame.Game = function(game) {

};
var emitter;
var sunNum = 0;
var canplay = true;
var xiuxiushou;
var cantouchs = true;
var xiuxiuText = [
    '再接再厉，还差一点就能兑换礼品了！',
    '集齐9个阳光值才能开始兑换哦！',
    '加油哦，礼品正在等着你！',
    '亲，摆正姿势，加油！'
]
var self;
var textisshow = false;

MyGame.Game.prototype = {
    create: function() {
        game.plugins.add(Fabrique.Plugins.InputField);


        self = this;

        this.add.image(0,0,'bg');


        var xiuxiuSound = this.add.audio('xiuxiu');


        this.sun_num_warp = this.add.sprite(20,this.world.height - 100,'atlas_ico');
        this.sun_num_warp.frameName = 'sun_num_warp.png';

        this.sunNum = this.add.text(85, 20, user.score, { font: "bold 44px Microsoft YaHei", fill: "#ffffff", align: "left" });

        this.sun_num_warp.addChild(this.sunNum)


        this.rul_btn = this.add.button(this.world.width - 180,this.world.height - 100,'atlas_ico',function(){
            this.rule.visible = true;
            cantouchs =false;
        },this);
        this.rul_btn.frameName = 'rul_btn.png';


        this.exchange = this.add.button(this.world.width/2,950,'atlas_ico',function(){

            if(!user.isLogin)
            {
                document.getElementById('cover').style.display = 'block'

            }
            else
            {
                game.state.start('Exchange');
            }

        },this);
        this.exchange.frameName = 'exchange.png';
        this.exchange.anchor.set(0.5,0);



        var touch_btn = this.add.button(this.world.width/2,600,'atlas_ico',function(){

            if(cantouchs)
            {
                if(canplay)
                {
                    canplay = false;
                    xiuxiuSound.play()
                }

                xiuxiuSound.onStop.add(function(){
                    canplay = true;
                }, this);


                this.touchTween(touch_btn)
                var rand = Math.random()*100;

                if (rand <= config.probability.sun)
                {
                    this.emitterSun()
                    user.score++;
                    this.sunNum.setText(user.score)
                }
                else if(rand > config.probability.sun && rand <= config.probability.AD+config.probability.sun){

                    var rndAD = this.rnd.integerInRange(0, config.AD.length-1)

                    this.adbox.visible = true;
                    this.adimg.loadTexture('adimg_'+rndAD+'');
                    this.adimg.width = 495;
                    this.adimg.height = 270;

                    this.adprice.setText(config.AD[rndAD].adprice);
                    this.adpolicy.setText(config.AD[rndAD].adpolicy);
                    this.adphone.setText(config.AD[rndAD].adphone);
                    touch_btn.visible = false
                }
            }

        },this);
        touch_btn.frameName = 'touch_btn.png';
        touch_btn.anchor.set(0.5);


        this.xiuxiushou = this.add.sprite(this.world.width/2,730,'atlas_ico');
        this.xiuxiushou.frameName = 'xiuxiushou.png';
        this.xiuxiushou.anchor.set(0.5,0);


        this.xiuxiuText = this.add.text(this.world.centerX, 760, xiuxiuText[0], { font: "24px Microsoft YaHei", fill: "#ad6fe4", align: "left" });
        this.xiuxiuText.anchor.set(0.5,0);
        this.xiuxiuText.alpha = 0;




        this.adbox = this.add.sprite(this.world.centerX,this.world.centerY,'adbox');
        this.adbox.anchor.set(0.5);


        this.adimg = this.add.image(0,-50,'');
        this.adimg.anchor.set(0.5);

        this.adprice = this.add.text(-145, 122, '', { font: "28px Microsoft YaHei", fill: "#5d5756"});
        this.adpolicy = this.add.text(95, 163, '', { font: "bold 32px Microsoft YaHei", fill: "#eb1515" });
        this.adphone = this.add.text(-215, 178, '', { font: "24px Microsoft YaHei", fill: "#b88523" });


        this.closeBtn = this.add.button(220,-290,'atlas_ico',function(){
            self.adbox.visible = false;
            touch_btn.visible = true
        },this);
        this.closeBtn.frameName = 'close.png';
        this.closeBtn.anchor.set(0,0);


        this.adbox.addChild(this.adimg);
        this.adbox.addChild(this.adprice);
        this.adbox.addChild(this.adpolicy);
        this.adbox.addChild(this.adphone);
        this.adbox.addChild(this.closeBtn);




        this.adbox.visible = false;

        this.LoginGroup = this.add.group();
        this.LoginGroup.visible = false;
        var login = this.LoginGroup.create(game.world.centerX,game.world.centerY,'login');
        login.anchor.set(0.5);


        this.closeBtn = this.add.button(game.world.centerX+240,game.world.centerY - 190,'atlas_ico',function(){
            this.LoginGroup.visible = false;
            cantouchs = true;
        },this);
        this.closeBtn.frameName = 'close.png';
        this.closeBtn.anchor.set(1,0);

        var userInput = game.add.inputField(game.world.centerX - 125, game.world.centerY-108, {
            font: '28px Microsoft YaHei',
            fill: '#ffffff',
            fillAlpha: 0,
            width: 280,
            max: 10,
            padding: 15,
            textAlign: 'left'
        });

        var userPhone = game.add.inputField(game.world.centerX - 125, game.world.centerY-9, {
            font: '28px Microsoft YaHei',
            fill: '#ffffff',
            fillAlpha: 0,
            width: 280,
            max: 11,
            padding: 15,
            textAlign: 'left'
        });


        var submitBtn = this.add.button(game.world.centerX-105,game.world.centerY+80,'atlas_ico',function(){
            if(userInput.value == '' || userPhone.value == '')
            {
                alert('请填写信息')
            }
            else
            {
                user.isLogin = true;
                game.state.start('Exchange');
                cantouchs = true;
            }
        },this);
        submitBtn.frameName = 'sub_btn.png';



        this.LoginGroup.add(userInput);
        this.LoginGroup.add(userPhone);
        this.LoginGroup.add(submitBtn);
        this.LoginGroup.add(this.closeBtn);





        /*var login = game.add.image(game.world.centerX,game.world.centerY,'login');
        login.anchor.set(0.5);
        login.visible = false;


        this.closeBtn = this.add.button(250,-190,'atlas_ico',function(){
            login.visible = false;
            cantouchs = true;
        },this);
        this.closeBtn.frameName = 'close.png';
        this.closeBtn.anchor.set(1,0);


        var userInput = game.add.inputField(-120, -108, {
            font: '24px Microsoft YaHei',
            fill: '#ffffff',
            fillAlpha: 0,
            width: 280,
            max: 10,
            padding: 15,
            textAlign: 'left'
        });

        var userPhone = game.add.inputField(-120, -7, {
            font: '24px Microsoft YaHei',
            fill: '#ffffff',
            fillAlpha: 0,
            width: 280,
            max: 11,
            padding: 15,
            textAlign: 'left'
        });


        var submitBtn = this.add.button(-120,80,'atlas_ico',function(){


            if(userInput.value == '' || userPhone.value == '')
            {
                alert('请填写信息')
            }
            else
            {
                user.isLogin = true;
                game.state.start('Exchange');
                cantouchs = true;
            }

        },this);
        submitBtn.frameName = 'sub_btn.png';

        login.addChild(userInput)
        login.addChild(userPhone)
        login.addChild(submitBtn)
        login.addChild(this.closeBtn)*/



        this.rule = this.add.sprite(0,0,'rule');

        this.closeRuleBtn = this.add.button(game.world.width-100,100,'atlas_ico',function(){
            this.rule.visible = false;
            cantouchs = true;
        },this);
        this.closeRuleBtn.frameName = 'close.png';
        this.closeRuleBtn.anchor.set(1,0);

        this.rule.addChild(this.closeRuleBtn);


        this.rule.visible = false;






        GameUI.cutscenes()

    },
    update: function() {

    },
    touchTween : function(o){
        if(this.xiuxiushou != 'undefined')
        {
            game.add.tween(this.xiuxiushou).to({alpha:0}, 100, Phaser.Easing.Linear.None, true,0).onComplete.add(function(){
                self.xiuxiushou.destroy()
            })
        }

        game.add.tween(o.scale).to({x:.95,y:.95}, 100, Phaser.Easing.Linear.None, true,0).onComplete.add(function(){
            game.add.tween(o.scale).to({x:1,y:1}, 100, Phaser.Easing.Linear.None, true,0)
        })

        if(!textisshow)
        {
            textisshow = true;

            game.add.tween(this.xiuxiuText).to({alpha:1}, 500, Phaser.Easing.Linear.None, true,500).onComplete.add(function(){
                game.add.tween(self.xiuxiuText).to({alpha:0}, 500, Phaser.Easing.Linear.None, true,1000).onComplete.add(function(){
                    textisshow = false;
                    self.xiuxiuText.setText(xiuxiuText[self.rnd.integerInRange(0, xiuxiuText.length-1)]);
                })
            })
        }

    },
    emitterSun : function(){
        emitter = game.add.emitter(game.world.centerX+20, 600, 1);

        emitter.makeParticles('sun');

        emitter.setRotation(0, 0);

        emitter.gravity = -200;

        emitter.start(false,5000,0,1);
    }
};

