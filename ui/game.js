/*global keys,images,measuring,TO_RADIANS,Sprite, Ship, Invader, InvaderLine, InvaderLineCollection, INVADER_SPRITES */

var canvas  = document.getElementById('canvas'),
  c       = canvas.getContext('2d'),
  w       = canvas.width,
  h       = canvas.height,

  cleanup = { bullets: [], invaders: [] }
;
// share the context
images.context = measuring.context = c;

// setup sprites
var sprites = images.getImage('ui/img/sprites.png')
  , logo = new Sprite(sprites, 250, 150, [
    [0, 0]
  ])
  ;

// elements
var players = [new Player('bob')]
  , ship = null
  , bullets = []
  ;

// score
var score = 0,
  gameStartTime,
  gameEndTime,
  maxTime = 75000
;

// state
var states = {
    NOT_STARTED: 'NOT_STARTED',
    PLAYING: 'PLAYING',
    WON: 'WON',
    LOST: 'LOST'
  },
  state = states.NOT_STARTED
;

function frame() {
  window.requestAnimationFrame(frame);
  step(); // work out what is happening
  draw(); // draw the current state
}

// set up environment
function step() {

  switch (state){
    case states.NOT_STARTED:
      if (players.length){
        if (players[0].keys.space.down){
          gameStartTime = Date.now();
          state = states.PLAYING;
        }
      }
      break;
    case states.PLAYING:
      // controls
      players.forEach(function(player){
        if (player.keys.space.down){
        }
      });

      // check if you have won
      if (false){
        state = states.WON;
        gameEndTime = new Date().getTime();
      }

      // check if you have lost
      if (false){
        state = states.LOST;
        gameEndTime = new Date().getTime();
      }
      break;
  }

}

// draw environment
function draw () {
  c.clearRect(0, 0, w, h);
  c.fillStyle = '#000';
  c.fillRect(0,0,w,h);
  switch (state){
    case states.NOT_STARTED:
      logo.draw(0, (w/2)-170, 100);
      drawTextLeft('Press space to start', '16px');
      break;
    case states.PLAYING:
      drawTextLeft('Time: '+ gameTime())
      players.forEach(function(player){
        player.draw();
      });
      bullets.forEach(function(bullet, i){
        bullet.draw();
      });
      break;
    case states.WON:
      var win = winningPlayer();
      logo.draw(0, (w/2)-170, 100);
      drawTextLeft(win.nickname +' has WON! Your score is '+ win.ship.points +'. time: '+ finalTime(), '18px');
      break;
    case states.LOST:
      logo.draw(0, (w/2)-170, 100);
      drawTextLeft('You have LOST!', '18px');
      break;
  }
}

// start the game
frame();


// helpers
function drawTextLeft(s, fSize, btm){
  btm = btm || 20;
  fSize = fSize || '12px';
  c.textAlign = 'left';
  c.font = fSize + ' Arial';
  c.fillStyle = '#fff';
  c.fillText(s, 10, h-btm);
}
function gameTimeMilliseconds(){
  return new Date().getTime() - gameStartTime;
}
function gameTime(ms){
  var t = ms || gameTimeMilliseconds();
  t = new Date(t);
  return t.getMinutes() + ':' + t.getSeconds();
}
function finalTime(){
  return gameTime(gameEndTime - gameStartTime);
}
function addScore(points){
  var timeDecay = (1 - (gameTimeMilliseconds()/maxTime));
  timeDecay = timeDecay < 0.3 ? 0.3 : timeDecay;
  score += Math.ceil(points * timeDecay);
}
function winningPlayer(){
  var winning, points = 0;
  players.forEach(function(player){
    if (player.ship.points > points){
      winning = player;
    }
  });
  return winning;
}
function eachClean(arr, fn){
  var ln = arr.length;
  while (ln--){
    if (fn.call(arr, arr[ln], ln) === true){
      arr.splice(ln, 1);
    }
  }
}
Array.prototype.eachClean = function(fn){
  return eachClean(this, fn);
};
