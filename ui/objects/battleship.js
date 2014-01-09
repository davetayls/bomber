
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
  this.x = Math.floor(halfW + (Math.random() * halfW) - 250);
  this.y = h - 160;
}
Battleship.prototype = {
  hit: false,
  speed: 0.1,
  x: 0,
  y: 0,
  step: function(){
    if (!this.hit){
      this.x+=this.speed;
    }
  },
  draw: function(){
    if (this.hit){
      this.hit.draw(Math.floor(this.x), this.y);
    } else {
      this.noDamage.draw(Math.floor(this.x), this.y);
    }
  },
  isHit: function(x, y){
    if (y > h - 160){
      if (x > this.x && x < this.x + 250){
        this.hit = true;
      }
    }
    return this.hit;
  }
};
