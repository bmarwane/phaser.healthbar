# Phaser.Healthbar

An attempt to create a simple and customizable healthbar for Phaser.js games.

I made a tutorial in French that explain how to create this health bar from scratch, you can check it out [here](http://apprendre-le-js.com/phaser-js-healthbar-tutorial/ "apprendre-le-js.com healthbar tutorial").

## Demo

[Demo](http://apprendre-le-js.com/tuto_examples/healthbar/4/)

## Usage

### 1 - Import HealthBar file

If you are using a CommonJS implementation (Browserify) :

```javascript
var HealthBar = require('path/to/HealthBar.js');
```

if not, just include the HealthBar.standalone.js in the html file.
example : 
``` html
<script src="path/to/HealthBar.standalone.js"></script>
```

### 2 - create a healthBar :

in the game/state create function instantiate a Healthbar like this: 

```javascript
create: function() {	
	var barConfig = {x: 200, y: 100};
	this.myHealthBar = new HealthBar(this.game, barConfig);
}
```
## Configuration

![](https://raw.githubusercontent.com/bmarwane/phaser.healthbar/master/phaser.healthbar.config.png)

- **width**
- **height**
- **x:** initial x position 
- **y:** initial y position
- **bg.color:** background color
- **bar.color:** color of the actual bar
- **animationDuration:** control the animation when the bar value is changed
- **flipped:** if true the bar will change size from left to right

this is the default configuration : 
```javascript
{
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
    flipped: false
  };
```

## Methods

### setPercent(value):

set the width of the bar to the passed percentage value.

**example:**

```javascript
 this.myHealthBar = new HealthBar(this.game, {x: 200, y: 200, width: 120});

 // the width will be set to 50% of the actual size so the new value will be 60
 this.myHealthBar.setPercent(50); 
 ```
 
### setPosition(x, y): 
 change the position of the bar to the provided coordinates.

### setFixedToCamera(fixedToCamera);
 fixedToCamera must be true or false value (boolean type).
 method allows fixed to camera.

### kill();
 will kill the healthbar.

 
 

