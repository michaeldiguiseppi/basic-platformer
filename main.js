

var mainState = {
  preload: function() {
    game.load.image('player', 'assets/bird.png');
    game.load.image('ground', 'assets/pipe.png');
    game.load.image('box', 'assets/pipe.png');
  },
  create: function() {

    if (game.device.desktop === false) {
      // set the scaling mode to SHOW_ALL to show all the game
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

      // set a minimum and maximum size for the game
      // here the minimum is half the game size
      // and the maximum is the original game size
      game.scale.setMinMax(game.width/2, game.height/2, game.width, game.height);

    }

    // center the game horizontally and vertically
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;



    game.stage.backgroundColor = '#27d9d3';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.player = game.add.sprite(100, 220, 'player');
    this.player.width = 50;
    this.player.height = 50;


    game.physics.arcade.enable(this.player);

    this.player.body.gravity.y = 800;
    this.player.anchor.setTo(0.5, 0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    this.game.world.width = 50000;
    this.ground = this.add.tileSprite(0, this.game.height-220, this.game.world.width, 50, 'ground');
    this.game.world.bringToTop(this.ground);

    this.game.physics.arcade.enable(this.ground);

    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    this.timer = game.time.events.loop(1500, this.addBoxes, this);

    this.boxes = game.add.group();

  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.ground, null, null, this);
    game.physics.arcade.overlap(this.player, this.boxes, this.playerHit, null, this);

  },
  playerHit: function() {
    game.time.events.remove(this.timer);
   this.boxes.forEach(function(box) {
     box.body.velocity.x = 0;
   }, this);
   this.restartGame();
  },
  jump: function() {
    var animation = game.add.tween(this.player);

    animation.to({angle: this.player.angle + 180}, 300);

    if (this.player.body.touching.down) {
      this.player.body.velocity.y = -400;
      animation.start();
    }
  },
  addBox: function(x, y) {
    var box = game.add.sprite(x, y, 'box');

    this.boxes.add(box);

    game.physics.arcade.enable(box);

    box.body.velocity.x = -200;

    box.checkWorldBounds = true;
    box.outOfBoundsKill = true;
  },
  addBoxes: function() {
    this.addBox(650, this.game.height-270);
  },
  restartGame: function() {
    game.state.start('main');
  },
};

var game = new Phaser.Game(640, 480, 'gameArea');

game.state.add('main', mainState, true);