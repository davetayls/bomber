/*
 a player
 */
function Player(nickname){
  this.nickname = nickname;
  // need a plane
  this.keys = keys;
  this.dropped = Date.now();
}
Player.prototype = {
  reload: 1000,
  step: function(){
    this.plane.step();
    if (this.keys.space.down){

      // don't drop a bomb right at the start
      if (Date.now() - gameStartTime > 500){
        // if it's long enough after last drop
        // drop bomb
        // record dropped time
      }
    }
  },
  draw: function(){
    // draw plane
  }
};
