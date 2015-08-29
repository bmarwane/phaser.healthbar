'use strict';

var HealthBar = require('../prefabs/HealthBar.js');

  function Play() {}
  Play.prototype = {
    preload: function() {
      this.game.load.spritesheet('button', 'assets/plus_minus.png', 31, 31);
    },

    create: function() {
      this.game.stage.backgroundColor = '#1D70EF';

      this.healthValue = 100;
      this.myHealthBar = new HealthBar(this.game, {x: this.game.world.centerX, y: this.game.world.centerY -10});

      this.minusButton = this.game.add.button(this.game.world.centerX - 50, this.game.world.centerY + 30, 'button', this.onMinusClick, this, 1, 1, 1, 1);
      this.plusButton = this.game.add.button(this.game.world.centerX , this.game.world.centerY + 30, 'button', this.onPlusClick, this, 0);

    },

    onPlusClick: function(){
      this.healthValue = this.healthValue + 10;
      if(this.healthValue > 100) this.healthValue = 100;
      this.myHealthBar.setPercent(this.healthValue);
    },
    onMinusClick: function(){
      this.healthValue = this.healthValue - 10;
      if(this.healthValue < 0) this.healthValue = 0;
      this.myHealthBar.setPercent(this.healthValue);
    }
  };
module.exports = Play;
