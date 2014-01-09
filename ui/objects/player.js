/*
 a player
 */
function Player(nickname){
  this.nickname = nickname;
  this.plane = new Plane();
  this.keys = keys;
  this.dropped = Date.now();
}
Player.prototype = {
  reload: 1000,
  step: function(){
    this.plane.step();
    if (this.keys.space.down){
      if (Date.now() - this.dropped > this.reload){
        this.plane.dropBomb();
        this.dropped = Date.now();
      }
    }
  },
  draw: function(){
    if (this.plane){
      this.plane.draw();
    }
//    c.font = '12px Arial';
//    c.fillStyle = '#fff';
//    c.textAlign = 'center';
//    c.fillText(this.nickname, this.ship.x, h-10);
  }
}
