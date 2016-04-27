var platform = platform || {};

platform.Preload = function() {};

platform.Preload.prototype = {
    preload: function() {
        this.load.image('player', 'app/assets/bird.png');
        this.load.image('ground', 'app/assets/pipe.png');
        this.load.image('box', 'app/assets/pipe.png');
        this.load.tilemap('jsonFile', 'app/assets/buildings_basic.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('buildings', 'app/assets/sheet.png');
        this.load.image('coin', 'app/assets/coin_01.png');
        this.load.image('menu', 'app/assets/lazy_menu.png')
      },
    create: function() {
        this.state.start('Menu');
    }
};
