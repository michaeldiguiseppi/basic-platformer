
//function preload() {//Load the tilemap file    game.load.tilemap('myGame', 'assets/tmx1.json', null, Phaser.Tilemap.TILED_JSON);//Load the spritesheet for the tilemap    game.load.image('tiles', 'assets/main.png');//Load other assets, the playergame.load.spritesheet('player', 'assets/sprites/male_hero_1.png', 16, 16, 4);}var map;var layer;function create() {    map = game.add.tilemap('myGame');//'main' is the name of the spritesheet inside of Tiled Map Editor    map.addTilesetImage('main', 'tiles');//'Grass 1' is the name of a layer inside of Tiled Map Editor    layer = map.createLayer('Grass 1');    layer.resizeWorld();//Add playergame.add.sprite(300, 200, 'player');}function update() {}

var mainState = {
  preload: function() {
    game.load.image('player', 'assets/bird.png');
    game.load.image('ground', 'assets/pipe.png');
    game.load.image('box', 'assets/pipe.png');
    game.load.tilemap('buildings', 'assets/basic_buildings.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/sheet.png');
  },
  velocity: -300,
  gravity: 1000,
  jumpHeight: 400,
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


    this.player = game.add.sprite(100, 100, 'player');
    this.player.width = 50;
    this.player.height = 50;


    game.physics.arcade.enable(this.player);

    this.player.body.gravity.y = this.gravity;
    this.player.anchor.setTo(0.5, 0.5);

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    spaceKey.onDown.add(this.jump, this);
    downKey.onDown.add(this.flip, this);

    this.game.world.width = 50000;

    this.ground = this.add.tileSprite(0, this.game.height- 240, this.game.world.width, 50, 'ground');
    this.game.world.bringToTop(this.ground);

    this.game.physics.arcade.enable(this.ground);

    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    this.timer = game.time.events.loop(100, this.addBoxes, this);
    // this.bottomTimer = game.time.events.loop(100, this.addBottomBoxes, this);

    this.boxes = game.add.group();
    this.increaseTimer = game.time.events.loop(15000, this.increaseVelocity, this);

  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.ground, null, null, this);
    // game.physics.arcade.overlap(this.player, this.boxes, this.playerHit, null, this);

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
      this.player.body.velocity.y = -(this.jumpHeight);
      animation.start();
    } else if ( this.player.body.touching.up) {
      this.player.body.velocity.y = this.jumpHeight;
      animation.start();
    }
  },
  flip: function() {
    if ( this.player.body.touching.down ){
      this.player.x = 100;
      this.player.y = 315;
      this.player.body.gravity.y = -(this.gravity);
    } else if ( this.player.body.touching.up ){
      this.player.x = 100;
      this.player.y = 215;
      this.player.body.gravity.y = this.gravity;
    }
  },
  addBox: function(x, y, velocity) {
    var box = game.add.sprite(x, y, 'box');

    this.boxes.add(box);

    game.physics.arcade.enable(box);

    box.body.velocity.x = this.velocity;

    box.checkWorldBounds = true;
    box.outOfBoundsKill = true;
  },
  incrementer: 0,
  increaseVelocity: function() {
    this.velocity -= 100;
    console.log('Velocity', this.velocity);
    this.gravity += 200;
    console.log('Gravity', this.gravity);
    this.jumpHeight += 50;
    console.log('jumpHeight', this.jumpHeight);
  },
  addBoxes: function() {
    this.incrementer++;
    var rand = Math.floor(Math.random() * 10);
    if ( rand > 7 && this.incrementer > 5){
      this.incrementer = 0;
      var randHeight = Math.floor(Math.random() * 3);
      this.addBox(650, this.game.height-this.heights[randHeight], this.velocity);
    }
  },
  heights: [290, 190, 350, 130],
  restartGame: function() {
    game.state.start('main');
  },
};

var game = new Phaser.Game(640, 480, 'gameArea');

game.state.add('main', mainState, true);
