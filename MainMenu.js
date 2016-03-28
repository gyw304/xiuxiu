MyGame.MainMenu = function(game) {};
MyGame.MainMenu.prototype = {
    create: function() {
        this.stage.backgroundColor = '#dedede';
    },
    startGame: function() {
        this.state.start('Game');
    }
};