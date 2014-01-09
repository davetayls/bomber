
function Battleship(){
  this.noDamage = new Sprite(sprites, 250, 75, [
    [0, 150],
    [0, 225]
  ]);
  this.noDamage.animate = 10;
  this.hit = new Sprite(sprites, 250, 75, [
    [0, 300],
    [0, 375]
  ]);
  this.hit.animate = 10;
  var halfW = w/2;
  var qW = halfW/2;
  this.x = Math.floor(halfW + qW + (Math.random() * qW) - 250);
  this.y = h - 160;
}
Battleship.prototype = {
  damage: false,
  speed: 0.2,
  x: 0,
  y: 0,
  step: function(){
    if (!this.hit){
      this.x+=this.speed;
    }
  },
  draw: function(){
    if (this.damage){
      this.hit.draw(Math.floor(this.x), this.y);
    } else {
      this.noDamage.draw(Math.floor(this.x), this.y);
    }
  },
  left: function(){ return this.x + 35 },
  right: function(){ return this.x + 190 },
  top: function(){ return this.y + 45 },
  isHit: function(x, y){
    if (y > this.top()){
      if (x > this.left() && x < this.right()){
        this.damage = true;
      }
    }
    return this.damage;
  }
};
