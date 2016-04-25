

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

    this.ground = this.add.tileSprite(0, this.game.height- 240, this.game.world.width, 50, 'ground');
    this.game.world.bringToTop(this.ground);

    this.game.physics.arcade.enable(this.ground);

    this.ground.body.immovable = true;
    this.ground.body.allowGravity = false;

    function randTimer(){
      return Math.random() * ( 2000 - 1000 ) + 1000;
    }

    var interval = randTimer();

    this.timer = game.time.events.loop(200, this.addTopBoxes, this);
    // var weighting = 1000;
    // this.timer = game.time.events.repeat(weighting, 50, this.addTopBoxes, this);
    // function updateWeight(){ if(weighting > 700){
    //   weighting -= 100;
    //   timer.delay = weighting;
    //   scoreText.text = timer.delay;
    //   }
    // }
    // this.timer =
    // var addTop = this.addTopBoxes;
    // var innerThis = this;
    // setInterval(function(){
    //     innerThis.addTopBoxes();
    //     console.log("Haldo!");
    //   }, randTimer());

    // this.timer2 = game.time.events.loop(1000, this.addBottomBoxes, this);


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
    this.game.time.events.add();

    game.physics.arcade.enable(box);

    box.body.velocity.x = -200;

    box.checkWorldBounds = true;
    box.outOfBoundsKill = true;
  },

  incrementer: 0,
  addTopBoxes: function() {
    this.incrementer++;
    console.log(this.incrementer);
    var decrement = Math.floor(Math.random() * 10);
    if (decrement > 5 && this.incrementer > 5){
      this.incrementer = 0;
      this.addBox(650, this.game.height-290);
    }
  },
  addBottomBoxes: function() {
    this.addBox(650, this.game.height-190);
  },
  restartGame: function() {
    game.state.start('main');
  },
};

var game = new Phaser.Game(640, 480, 'gameArea');

game.state.add('main', mainState, true);
