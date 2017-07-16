'use strict';

var HealthBar = require('../prefabs/HealthBar.js');

  function Play() {}
  Play.prototype = {
    preload: function() {
      this.game.load.spritesheet('button', 'assets/plus_minus.png', 31, 31);
    },

    create: function() {
      this.game.stage.backgroundColor = '#1D70EF';

      var barre1_x = 150;
      var barre1_y = 115;

      var barre2_x = 450;
      var barre2_y = 115;

      this.healthValue = 100;
      this.healthValue2 = 100;
      this.myHealthBar = new HealthBar(this.game, {x: barre1_x, y: barre1_y});
      this.myFlippedHealthBar = new HealthBar(this.game, {x: barre2_x, y: barre2_y, flipped: true});

      this.minusButton = this.game.add.button(barre1_x - 50, barre1_y + 30, 'button', this.onMinusClick, this, 1, 1, 1, 1);
      this.plusButton = this.game.add.button(barre1_x , barre1_y + 30, 'button', this.onPlusClick, this, 0);

      this.minusButton2 = this.game.add.button(barre2_x - 50, barre2_y + 30, 'button', this.onMinus2Click, this, 1, 1, 1, 1);
      this.plusButton2 = this.game.add.button(barre2_x , barre2_y + 30, 'button', this.onPlus2Click, this, 0);

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

      if(this.healthValue < 70) {
        this.myHealthBar.setBarColor('#fc9802');
      }
    },
    onPlus2Click: function(){
      this.healthValue2 = this.healthValue2 + 10;
      if(this.healthValue2 > 100) this.healthValue2 = 100;
      this.myFlippedHealthBar.setPercent(this.healthValue2);
    },
    onMinus2Click: function(){
      this.healthValue2 = this.healthValue2 - 10;
      if(this.healthValue2 < 0) this.healthValue2 = 0;
      this.myFlippedHealthBar.setPercent(this.healthValue2);
    }
  };
module.exports = Play;
