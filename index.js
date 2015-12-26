var game = new Phaser.Game('100%', '100%', Phaser.AUTO, '', null, false, false);

game.state.add('boot', {
  init: function() {
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.scale.pageAlignVertically = true;
    game.scale.pageAlignHorizontally = true;
    game.stage.backgroundColor = '#003344';
  },
  preload: function() {
    game.load.spritesheet('rudolpo', 'assets/sprites/rudolpo.png', 24, 16);
    game.load.spritesheet('santa', 'assets/sprites/santa.png', 24, 16);
    game.load.image('snowflake', 'assets/sprites/snowflake.png');
    game.load.image('sparkle', 'assets/sprites/sparkle.png');
    game.load.audio('bg', 'assets/audio/bg.ogg');
  },
  create: function() {
    this.backSnow = game.add.emitter(game.world.centerX, -32, 600);
    this.backSnow.makeParticles('snowflake');
    this.backSnow.minParticleAlpha = 0.1;
    this.backSnow.maxParticleAlpha = 0.5;
    this.backSnow.minParticleScale = 1;
    this.backSnow.maxParticleScale = 1.5;
    this.backSnow.minRotation = 0;
    this.backSnow.maxRotation = 90;
    this.backSnow.gravity = 0;
    this.backSnow.setXSpeed(20, 40);
    this.backSnow.setYSpeed(40, 80);
    this.backSnow.width = game.world.width * 1.5;
    this.backSnow.start(false, 28000, 50);

    this.rudolpo = game.add.sprite(
      game.world.width / 2,
      game.world.height / 2,
      'rudolpo');
    this.rudolpo.scale.set(8);
    this.rudolpo.anchor.set(1, 0.5);
    this.rudolpo.animations.add('run');
    this.rudolpo.animations.play('run', 10, true);

    this.santa = game.add.sprite(
      game.world.centerX,
      game.world.centerY,
      'santa');
    this.santa.scale.set(8);
    this.santa.anchor.set(0, 0.5);
    this.santa.animations.add('run');
    this.santa.animations.play('run', 5, true);

    this.frontSnow = game.add.emitter(game.world.centerX, -32, 600);
    this.frontSnow.makeParticles('snowflake');
    this.frontSnow.minParticleScale = 1;
    this.frontSnow.maxParticleScale = 2;
    this.frontSnow.minRotation = 0;
    this.frontSnow.maxRotation = 90;
    this.frontSnow.gravity = 0;
    this.frontSnow.setXSpeed(40, 80);
    this.frontSnow.setYSpeed(50, 100);
    this.frontSnow.width = game.world.width * 1.5;
    this.frontSnow.start(false, 14000, 100);

    this.sparkles = game.add.emitter(
      game.world.centerX - this.rudolpo.width / 2,
      game.world.centerY + this.rudolpo.height / 2,
      500);
    this.sparkles.makeParticles('sparkle');
    this.sparkles.minParticleAlpha = 0.1;
    this.sparkles.maxParticleAlpha = 1;
    this.sparkles.minParticleScale = 1;
    this.sparkles.maxParticleScale = 2;
    this.sparkles.minRotation = 180;
    this.sparkles.maxRotation = 360;
    this.sparkles.gravity = 0;
    this.sparkles.setXSpeed(100, 200);
    this.sparkles.setYSpeed(-20, 20);
    this.sparkles.width = this.rudolpo.width;
    this.sparkles.start(false, 5000, 50);

    game.add.audio('bg', 1, true).play();
  },
  update: function() {
    this.rudolpo.y = game.world.centerY + 4 * Math.cos(game.time.now / 500);
    this.santa.y = game.world.centerY + 4 * Math.sin(game.time.now / 500);
  },
});

game.state.start('boot');
