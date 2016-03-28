MyGame.Exchange = function(game) {};
var userScore;
var me;
MyGame.Exchange.prototype = {
    create: function() {
        me = this;
        this.add.image(0,0,'ex_bg');

        this.exWarp = this.add.sprite(game.world.centerX,50,'ex_warp');
        this.exWarp.anchor.set(0.5,0);

        userScore = this.add.text(0, 165,'当前阳光值：'+user.score+' 个', { font: "34px Microsoft YaHei", fill: "#ffffff"});
        userScore.anchor.set(0.5,0);
        userScore.addColor('#fac05b', 6);
        userScore.addColor('#ffffff', user.score.toString().length+6+1);


        this.exBtnGroup = this.add.group();

        for(var i= 0;i<=2;i++)
        {
            this.exBtn = this.add.sprite(420,i*155+321,'atlas_ico');
            this.exBtn.name = 'exBtn_'+i+'';
            this.exBtn.frameName = 'ex_btn.png';
            this.exBtnGroup.add(this.exBtn);
        }

        this.exBtnGroup.setAll('inputEnabled', true);

        this.exBtnGroup.callAll('events.onInputDown.add', 'events.onInputDown', function(item){


            var key =item.name.split("_")[1];
            if(key==0 && user.score>=9)
            {
                me.exchangeok(9,0)
            }
            else if(key==1 && user.score>=19)
            {
                me.exchangeok(19,1)
            }
            else if(key==2 && user.score>=29)
            {
                me.exchangeok(29,2)
            }
            else
            {
                alert('兑换失败')
            }
        });



        this.exWarp.addChild(userScore);


        this.lookmypack = this.add.button(game.world.centerX,this.world.height - 330,'atlas_ico',function(){
            game.state.start('Myspoil');
        },this);
        this.lookmypack.frameName = 'lookmypack.png';
        this.lookmypack.anchor.set(0.5,0);


        this.goon = this.add.button(game.world.centerX,this.world.height - 180,'atlas_ico',function(){
            game.state.start('Game');
        },this);
        this.goon.frameName = 'goon.png';
        this.goon.anchor.set(0.5,0);



        this.spoilbox = this.add.sprite(game.world.centerX, game.world.centerY-204,'spoilbox');
        this.spoilbox.anchor.set(0.5,0);

        this.address = this.add.text(0, 360,'', { font: "26px Microsoft YaHei", fill: "#caa4ff"});
        this.address.anchor.set(0.5,0);

        this.spoilname = this.add.text(0, 175,'', { font: "40px Microsoft YaHei", fill: "#fac05b"});
        this.spoilname.anchor.set(0.5,0);

        this.offer = this.add.text(0, 235,'', { font: "24px Microsoft YaHei", fill: "#caa4ff"});
        this.offer.anchor.set(0.5,0);

        this.closeBtn = this.add.button(250,20,'atlas_ico',function(){
            me.spoilbox.visible = false;
            me.exBtnGroup.setAll('inputEnabled', true);
        },this);
        this.closeBtn.frameName = 'close.png';
        this.closeBtn.anchor.set(1,0);

        this.spoilbox.addChild(this.closeBtn);
        this.spoilbox.addChild(this.address);
        this.spoilbox.addChild(this.spoilname);
        this.spoilbox.addChild(this.offer);

        this.spoilbox.visible = false;

        GameUI.cutscenes()
    },
    exchangeok : function(ex_num,wach){
        me.exBtnGroup.setAll('inputEnabled', false);
        me.spoilbox.visible = true;

        user.score -= ex_num;
        userScore.setText('当前阳光值：'+user.score+' 个');

        me.spoilname.setText(config.spoil[wach].spoilname)
        me.offer.setText(config.spoil[wach].offer)
        me.address.setText(config.spoil[wach].address)

    }
};