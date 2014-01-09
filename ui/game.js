
var canvas  = document.getElementById('canvas')
  , c = canvas.getContext('2d')
  , w = canvas.width
  , h = canvas.height
  ;
// share the context
images.context = measuring.context = c;

// setup images
var logo
  , sprites
  , bg
  , preload = [
    'ui/img/sprites.png',
    'ui/img/bg.gif'
  ]
  ;

// objects
var players = []
  , ships = []
  ;

// score
var score = 0
  , gameStartTime
  , gameEndTime
  , maxTime = 75000
;

// state
var states = {
    NOT_STARTED: 'NOT_STARTED',
    PLAYING: 'PLAYING',
    WON: 'WON',
    LOST: 'LOST'
  }
  , state = states.NOT_STARTED
;

/**
 * With canvas we need to preload the images
 * before we can draw them
 */
images.preload(preload, init);

/**
 * Once the images have been preloaded we are ready to set
 * up the initial state of the game
 */
function init(){
  sprites = images.getImage('ui/img/sprites.png');
  bg = new Sprite(images.getImage('ui/img/bg.gif'), 900, 700, [[0,0]]);
  logo = new Sprite(sprites, 250, 150, [
    [0, 0]
  ]);

  players.push(new Player('bob'));
  ships.push(new Battleship());

  // start the game loop
  frame();
}

function frame() {
  window.requestAnimationFrame(frame);
  step(); // move the scene around and check logic
  draw(); // draw the current state of the scene
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
      ships.forEach(stepObj);
      players.forEach(stepObj);
      players.map(getBombs).reduce(flatten).forEach(checkHit);

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
  bg.draw(0, 0, 0);
  switch (state){
    case states.NOT_STARTED:
      logo.draw((w/2)-125, 100, 0);
      players.forEach(drawObj);
      ships.forEach(drawObj);
      drawTextLeft('Press space to start', '16px');
      break;
    case states.PLAYING:
      drawTextLeft('Time: '+ gameTime());
      players.forEach(drawObj);
      ships.forEach(drawObj);
      break;
    case states.WON:
      var win = winningPlayer();
      logo.draw((w/2)-170, 100, 0);
      drawTextLeft(win.nickname +' has WON! Your score is '+ win.ship.points +'. time: '+ finalTime(), '18px');
      break;
    case states.LOST:
      logo.draw((w/2)-170, 100, 0);
      drawTextLeft('You have LOST!', '18px');
      break;
  }
}



// functional
function stepObj(obj){ obj.step(); }
function drawObj(obj){ obj.draw(); }

function getBombs(player){
  return player.plane.bombs
}
function flatten(prev, current, i, arr){
  if (typeof prev === 'undefined'){
    prev = [];
  }
  return prev.concat(current);
}
function checkHit(bomb){
  ships.forEach(function(ship){
    ship.isHit(bomb.x, bomb.y);
  });
}





// helpers
function drawTextLeft(s, fSize, btm){
  btm = btm || 40;
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
