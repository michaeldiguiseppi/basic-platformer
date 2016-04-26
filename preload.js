var platform = platform || {};

platform.Preload = function() {};

platform.Preload.prototype = {
    preload: function() {
        this.load.image('player', 'assets/bird.png');
        this.load.image('ground', 'assets/pipe.png');
        this.load.image('box', 'assets/pipe.png');
        this.load.tilemap('jsonFile', 'assets/buildings_basic.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('buildings', 'assets/sheet.png');
        this.load.image('coin', 'assets/coin_01.png');
      },
    create: function() {
        this.state.start('Menu');
    }
};
