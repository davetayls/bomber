/*
 a player
 */
function Player(nickname){
  this.nickname = nickname;
  this.ship = new Ship();
  this.keys = new KeySet();
}
Player.prototype = {
  draw: function(){
    if (this.ship){
      this.ship.draw();
    }
    c.font = '12px Arial';
    c.fillStyle = '#fff';
    c.textAlign = 'center';
    c.fillText(this.nickname, this.ship.x, h-10);
  }
}
