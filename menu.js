var platform = platform || {};

platform.Menu = function() {};

platform.Menu.prototype = {
    create: function() {
        this.game.stage.backgroundColor = '#707070';
        this.game.add.text(220,50, 'Welcome to ze Game!!!', {font:'20px Arial', fill: '#fff'});

        var frame2 = this.game.add.sprite(200,256, 'box');
        var frame3 = this.game.add.sprite(384, 256, 'box');
        frame2.scale.setTo(1.25, 1.25);
        frame3.scale.setTo(1.25, 1.25);

        frame2.events.onInputDown.add(this.update, this);

    },
    update: function() {
        platform.game.state.start('Game');
    }
};