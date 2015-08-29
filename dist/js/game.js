(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(600, 280, Phaser.AUTO, 'demo');

  // Game States
  game.state.add('play', require('./states/play'));
  

  game.state.start('play');
};

},{"./states/play":3}],2:[function(require,module,exports){
/**
   Copyright (c) 2015 Belahcen Marwane (b.marwane@gmail.com)

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.
 */

var HealthBar = function(game, providedConfig) {
  this.game = game;

  this.setupConfiguration(providedConfig);
  this.setPosition(this.config.x, this.config.y);
  this.drawBackground();
  this.drawHealthBar();
};
HealthBar.prototype.constructor = HealthBar;
module.exports = HealthBar;

HealthBar.prototype.setupConfiguration = function (providedConfig) {
  this.config = this.mergeWithDefaultConfiguration(providedConfig);
};

HealthBar.prototype.mergeWithDefaultConfiguration = function(newConfig) {
  var defaultConfig= {
    width: 250,
    height: 40,
    x: 0,
    y: 0,
    bg: {
      color: '#651828'
    },
    bar: {
      color: '#FEFF03'
    }
  };

  return mergeObjetcs(defaultConfig, newConfig);
};

function mergeObjetcs(targetObj, newObj) {
  for (var p in newObj) {
    try {
      targetObj[p] = newObj[p].constructor==Object ? mergeObjetcs(targetObj[p], newObj[p]) : newObj[p];
    } catch(e) {
      targetObj[p] = newObj[p];
    }
  }
  return targetObj;
}

HealthBar.prototype.drawBackground = function() {

  var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
  bmd.ctx.fillStyle = this.config.bg.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, this.config.width, this.config.height);
  bmd.ctx.fill();

  this.bgSprite = this.game.add.sprite(this.x, this.y, bmd);
  this.bgSprite.anchor.set(0.5);
};

HealthBar.prototype.drawHealthBar = function() {
  var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
  bmd.ctx.fillStyle = this.config.bar.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, this.config.width, this.config.height);
  bmd.ctx.fill();

  this.barSprite = this.game.add.sprite(this.x - this.bgSprite.width/2, this.y, bmd);
  this.barSprite.anchor.y = 0.5;
};

HealthBar.prototype.drawHealthBar = function() {
  var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
  bmd.ctx.fillStyle = this.config.bar.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, this.config.width, this.config.height);
  bmd.ctx.fill();

  this.barSprite = this.game.add.sprite(this.x - this.bgSprite.width/2, this.y, bmd);
  this.barSprite.anchor.y = 0.5;
};

HealthBar.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;

  if(this.bgSprite !== undefined & this.barSprite !== undefined){
    this.bgSprite.position.x = x;
    this.bgSprite.position.y = y;

    this.barSprite.position.x = x - this.config.width/2;
    this.barSprite.position.y = y;
  }
};


HealthBar.prototype.setPercent = function(newValue){
  if(newValue < 0) newValue = 0;
  if(newValue > 100) newValue = 100;

  var newWidth =  (newValue * this.config.width) / 100;

  this.setWidth(newWidth);
};

HealthBar.prototype.setWidth = function(newWidth){
  this.barSprite.width = newWidth;
};

},{}],3:[function(require,module,exports){
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

},{"../prefabs/HealthBar.js":2}]},{},[1])