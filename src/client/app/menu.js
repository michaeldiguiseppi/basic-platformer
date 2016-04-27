var platform = platform || {};

platform.Menu = function() {};

var lawnchair = new Lawnchair({table:'localScores', adaptor:'webkit'}, function(){
    // Lawnchair setup!
});



platform.Menu.prototype = {
    create: function() {
        lawnchair.get('player_1', function(obj) {
            if (obj) {
                lastSync = obj.lastSync;
                dataList = obj.dataList;
                console.log(dataList);
            }
        });
        this.game.stage.backgroundColor = '#707070';
        this.game.add.text(220,50, 'Welcome to ze Game!!!', {font:'20px Arial', fill: '#fff'});

        this.game.add.button(200,256, 'box', this.startGame, this, 2, 1, 0);
        this.game.add.button(384,256, 'box', this.startGame, this, 2, 1, 0);

    },
    update: function() {

    },
    startGame: function() {
        console.log("Click registered");
        platform.game.state.start('Game');
    }
};