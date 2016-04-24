var mainState = {
  preload: function() {
    game.load.image('box', 'assets/bird.png');
    game.load.image('ground', 'assets/pipe.png');
  },
  create: function() {
    game.stage.backgroundColor = '#27d9d3';
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.box = game.add.sprite(100, 275, 'box');
    this.box.width = 50;
    this.box.height = 50;


    game.physics.arcade.enable(this.box);

    this.box.body.gravity.y = 1000;
    this.box.body.velocity.x = 100;
    this.box.anchor.setTo(0.5, 0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    this.game.world.width = 50000;
    this.ground = this.add.tileSprite(0, this.game.height-100, this.game.world.width, 50, 'ground');
    this.game.world.bringToTop(this.ground);

    this.game.physics.arcade.enable(this.ground);

    this.ground.body.velocity.x = -200;
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

  },
  update: function() {
    this.game.physics.arcade.collide(this.box, this.ground, this.playerHit, null, this);
  },
  playerHit: function() {

  },
  jump: function() {
    var animation = game.add.tween(this.box);

    animation.to({angle: 180}, 800);

    if (this.box.body.touching.down) {
      this.box.body.velocity.y = -500;
    }

    animation.start();
  },
}

var game = new Phaser.Game(480, 640, 'gameArea');

game.state.add('main', mainState, true);
