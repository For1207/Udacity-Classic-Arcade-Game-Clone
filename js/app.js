// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/enemy-bug.png';
  // this.block = 101;
  this.speed = speed;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  if(this.x < 505) { // condition to let enemies move away from the board
    this.x += this.speed * dt;
  }
  else { // return enemis to the start
    this.x = -101;
//Randomise enemies position by Y-axis;
    const rows = [62, 145, 228];
    const randomRow= Math.floor(Math.random()*3);
    this.y = rows[randomRow];
  }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Add class Hero
class Hero {
  constructor() {
    this.x = 202; // defines hero's  x initial position on the board
    this.y = 394 ; // defines hero's  y initial position on the board
    this.sprite = 'images/char-boy.png';
    this.youWin = false;
  }
  update() {
    for(let enemy of allEnemies) {
      if(this.y === enemy.y &&  (enemy.x + 77 > this.x && enemy.x < this.x + 77)) {
        this.reset();
      }
      if(this.y < 0) {
        this.youWin = true;
        this.y = 394;

      }
    }
  };

  reset() {
    this.x = 202;
    this.y = 394;
  };


  // add the hero to an initial position
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

// Updat hero's x/y coordidates accordingly to pressed key and width/height of game board blocks
  handleInput(position) {
    switch(position) {
      case 'left':
        if (this.x > 0) { // this and follow conditions keep the hero inside the gaming board
          this.x -= 101;
        }
        break;
      case 'up':
        if (this.y > 0) {
          this.y -= 83;
        }
        break;
      case 'right':
        if (this.x < 404) {
        this.x += 101;
        }
        break;
      case 'down':
        if (this.y < 394) {
        this.y += 83;
        }
        break;
    }

  }
}

const player = new Hero(); //instatiate the Hero object
const enemy1 = new Enemy(-101, 62, 101);//instatiate the Enemy objects
const enemy2 = new Enemy(-101, 62, 152);
const enemy3 = new Enemy(-101, 145, 203);
const enemy4 = new Enemy(-101, 145, 254);
const enemy5 = new Enemy(-101, 228, 305);
const enemy6 = new Enemy(-101, 228, 356);
const allEnemies = [enemy1, enemy2, enemy3, enemy4,  enemy5, enemy6];

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
