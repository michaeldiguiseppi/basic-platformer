var platform = platform || {};

platform.Preload = function() {};

platform.Preload.prototype = {
    preload: function() {
        // this.load.image('player', 'app/assets/tree.png');
        this.load.image('ground', 'app/assets/gray.png');
        this.load.image('box', 'app/assets/pipe.png');
        this.load.image('coin', 'app/assets/coin_01.png');
        this.load.spritesheet('hero', 'app/assets/Run.png', 33.6, 50, 8);
        this.load.image('jump-button', 'app/assets/jump-Button.png');
        this.load.image('flip-button', 'app/assets/flip-Button.png');
      },
    create: function() {
        this.state.start('Menu');
    }
};


// 67 by 100 high
