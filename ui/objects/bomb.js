
function Bomb(x, y){
  this.img = new Sprite(sprites, 50, 75, [
    [0, 600],
    [50, 600],
    [100, 600],
    [150, 600],
    [200, 600]
  ]);
  this.explode = new Sprite(sprites, 50, 75, [
    [0, 675],
    [50, 675],
    [100, 675],
    [150, 675],
    [200, 675]
  ]);
  this.img.animate = 13;
  this.explode.animate = 15;
  this.x = x;
  this.y = y;
}
Bomb.prototype = {
  speedX: 2,
  speedY: 4,
  x: 0,
  y: 0,
  exploded: false,
  step: function(){
    if (this.y > h - 105){
      this.exploded = true;
    } else {
      this.x+=this.speedX;
      this.y+=this.speedY;
    }
  },
  draw: function(){
    if (this.exploded){
      this.explode.draw(Math.floor(this.x-10), Math.floor(this.y-35));
    } else {
      this.img.draw(Math.floor(this.x), Math.floor(this.y));
    }
  }
};

