var game = game || {};

game.Preload = function() {};

game.Preload.prototype = {
    preload: function() {
        game.load.image('player', 'assets/bird.png');
        game.load.image('ground', 'assets/pipe.png');
        game.load.image('box', 'assets/pipe.png');
        game.load.tilemap('buildings', 'assets/basic_buildings.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tiles', 'assets/sheet.png');
    },
    create: function() {
        this.state.start('Menu');
    }
};