MyGame.Myspoil = function(game) {};

MyGame.Myspoil.prototype = {
    create: function() {

        this.add.image(0,0,'ex_bg');

        this.MyspoilBox = this.add.sprite(game.world.centerX,50,'myspoil');
        this.MyspoilBox.anchor.set(0.5,0);


        for(var i=0;i<=config.myspoil.length-1;i++)
        {

            this.ss = this.add.sprite(80,i*213+190,'atlas_ico');
            this.ss.frameName = 'ss.png';

            this.spoilname = this.add.text(150, i*215+190,config.myspoil[i].spoilname, { font: "40px Microsoft YaHei", fill: "#fac05b"}).anchor.set(0,0);

            this.offer = this.add.text(150, i*215+245,config.myspoil[i].offer, { font: "24px Microsoft YaHei", fill: "#b56a09"});

            this.address = this.add.text(150, i*215+285,config.myspoil[i].address.replace(/(.{22})/g,'$1\n'), { font: "26px Microsoft YaHei", fill: "#ffffff"});
            this.address.addColor('#bd95fa', 5);
        }





        this.backexchange = this.add.button(game.world.centerX,this.world.height - 330,'atlas_ico',function(){
            game.state.start('Exchange');
        },this);
        this.backexchange.frameName = 'backexchange.png';
        this.backexchange.anchor.set(0.5,0);


        this.backhome = this.add.button(game.world.centerX,this.world.height - 180,'atlas_ico',function(){
            game.state.start('Game');
        },this);
        this.backhome.frameName = 'backhome.png';
        this.backhome.anchor.set(0.5,0);



        GameUI.cutscenes()
    }
};