
function Bomb(x, y){
  this.img = new Sprite(sprites, 50, 75, [
    [0, 600],
    [50, 600],
    [100, 600],
    [150, 600],
    [200, 600]
  ]);
  this.img.animate = 13;
  this.x = x;
  this.y = y;
}
Bomb.prototype = {
  speedX: 0.5,
  speedY: 2,
  x: 0,
  y: 0,
  step: function(){
    this.x+=this.speedX;
    this.y+=this.speedY;
  },
  draw: function(){
    this.img.draw(Math.floor(this.x), Math.floor(this.y));
  }
};

