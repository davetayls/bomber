
function Plane(){
  this.flying = new Sprite(sprites, 250, 75, [
    [0, 450],
    [0, 525]
  ]);
  this.flying.animate = 13;
  this.y = 20;
  this.bombs = [];
}
Plane.prototype = {
  speed: 1,
  x: 0,
  y: 0,
  draw: function(){
    this.flying.draw(this.x, this.y);
  }
};
5
