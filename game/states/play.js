'use strict';

var HealthBar = require('../prefabs/HealthBar.js');

  function Play() {}
  Play.prototype = {
    create: function() {
      this.game.stage.backgroundColor = '#1D70EF';

      this.myHealthBar = new HealthBar(this.game, {x: this.game.world.centerX, y: this.game.world.centerY -10});
    }
  };
module.exports = Play;
