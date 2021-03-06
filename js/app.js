// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = Math.random();
    return this;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*player.level*0.5*100*dt;
    if(this.x > 700) this.x = -100;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//functinal shared pattern
var Player = function(){
     this.level = 1;
     this.max = 1;
     this.sprite = 'images/char-boy.png';
     this.x = 200;
     this.y = 400;

};
Player.prototype.handleInput = function(key){
    if(key === 'right') {this.x = this.x+101; if(this.x >=404) this.x = 404;}
    if(key === 'left') {this.x = this.x-101; if(this.x <= 0) this.x = 0;}
    if(key === 'up') {this.y = this.y-83; if(this.y < 60) {this.y = 404;this.level++;this.max = Math.max(this.level,this.max);}}
    if(key === 'down') {this.y = this.y+83; if(this.y >= 404) this.y = 404;}
};
Player.prototype.update = function(){
    var obj = this;
    allEnemies.forEach(function(enemy) {
            if(enemy.x < (obj.x+50) && (obj.x+50) < (enemy.x+100) &&
                (obj.y+42.5)>enemy.y && (obj.y+42.5) < (enemy.y+85)){
                obj.level = 1;
                obj.x = 200;
                obj.y = 400;
            }
        });
};
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.


var allEnemies = [];
allEnemies.push(new Enemy(0,60));
allEnemies.push(new Enemy(100,145));
allEnemies.push(new Enemy(300,145));
allEnemies.push(new Enemy(200,230));
var player =  new Player();
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
