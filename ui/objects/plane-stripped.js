
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
  speed: 3,
  x: 0,
  y: 0,
  step: function(){
    this.x+=this.speed;
    this.bombs.forEach(stepObj);
  },
  draw: function(){
    this.flying.draw(Math.floor(this.x), this.y);
    this.bombs.forEach(drawObj);
  },
  dropBomb: function(){
    this.bombs.push(new Bomb(this.x + 125, this.y + 50));
  }
};

