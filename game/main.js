'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(600, 280, Phaser.AUTO, 'demo');

  // Game States
  game.state.add('play', require('./states/play'));
  

  game.state.start('play');
};
