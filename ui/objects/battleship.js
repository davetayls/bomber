
function Battleship(){
  this.noDamage = new Sprite(sprites, 250, 75, [
    [0, 150],
    [0, 225]
  ]);
  this.noDamage.animate = 10;
  var halfW = w/2;
  this.x = Math.floor(halfW + (Math.random() * halfW) - 250);
  this.y = h - 165;
}
Battleship.prototype = {
  speed: 1,
  damage: 0,
  x: 0,
  y: 0,
  draw: function(){
    this.noDamage.draw(this.x, this.y);
  }
};
