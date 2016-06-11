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
  this.setFixedToCamera(this.config.isFixedToCamera);
};
HealthBar.prototype.constructor = HealthBar;

HealthBar.prototype.setupConfiguration = function (providedConfig) {
  this.config = this.mergeWithDefaultConfiguration(providedConfig);
  this.flipped = this.config.flipped;
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
    },
    animationDuration: 200,
    flipped: false,
    isFixedToCamera: false
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

  if(this.flipped){
    this.bgSprite.scale.x = -1;
  }
};

HealthBar.prototype.drawHealthBar = function() {
  var bmd = this.game.add.bitmapData(this.config.width, this.config.height);
  bmd.ctx.fillStyle = this.config.bar.color;
  bmd.ctx.beginPath();
  bmd.ctx.rect(0, 0, this.config.width, this.config.height);
  bmd.ctx.fill();

  this.barSprite = this.game.add.sprite(this.x - this.bgSprite.width/2, this.y, bmd);
  this.barSprite.anchor.y = 0.5;

  if(this.flipped){
    this.barSprite.scale.x = -1;
  }
};

HealthBar.prototype.setPosition = function (x, y) {
  this.x = x;
  this.y = y;

  if(this.bgSprite !== undefined && this.barSprite !== undefined){
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
  if(this.flipped) {
    newWidth = -1 * newWidth;
  }
  this.game.add.tween(this.barSprite).to( { width: newWidth }, this.config.animationDuration, Phaser.Easing.Linear.None, true);
};

HealthBar.prototype.setFixedToCamera = function(fixedToCamera) {
  this.bgSprite.fixedToCamera = fixedToCamera;
  this.barSprite.fixedToCamera = fixedToCamera;
};

//Call to kill the healthBar if you want to make it disappear after character dies
HealthBar.prototype.kill = function() {
  this.bgSprite.kill();
  this.barSprite.kill();
};

module.exports = HealthBar;

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

      this.myHealthBar.kill()
    },
    onMinusClick: function(){
      this.healthValue = this.healthValue - 10;
      if(this.healthValue < 0) this.healthValue = 0;
      this.myHealthBar.setPercent(this.healthValue);
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

},{"../prefabs/HealthBar.js":2}]},{},[1])