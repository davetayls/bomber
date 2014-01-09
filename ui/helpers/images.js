/*global TO_RADIANS:false */
var images = {
  drawRotatedImage: function (image, x, y, angle){

    // save the current co-ordinate system
    // before we screw with it
    this.context.save();

    // move to the middle of where we want to draw our image
    this.context.translate(x, y);

    // rotate around that point, converting our
    // angle from degrees to radians
    this.context.rotate(angle * TO_RADIANS);

    // draw it up and to the left by half the width
    // and height of the image
    this.context.drawImage(image, -(image.width / 2), -(image.height / 2));

    // and restore the co-ords to how they were when we began
    this.context.restore();
  },

  drawDot: function (x, y){
    this.context.fillRect(x, y, 1, 1);
  },

  images:   {},
  getImage: function (src, cb){
    var self = this;
    var img = self.images[src];
    if (img && cb){
      cb.call(img);
      return img;
    } else {
      img = new Image();
      img.onload = cb;
      img.src = src;
      self.images[src] = img;
      return img;
    }
  },
  preload:  function (sources, cb){
    var self = this
      , ln = sources.length
      ;
    sources.forEach(function (src){
      self.getImage(src, function (){
        if (--ln === 0 && cb){
          cb.call(self, sources);
        }
      });
    });
  },

  drawSprite: function (img, left, top, width, height, x, y){
    this.context.drawImage(img, left, top, width, height, x, y, width, height);
  }

};

function Sprite(img, width, height, positions){
  this.img = img;
  this.width = width;
  this.height = height;
  this.positions = positions;
}
Sprite.prototype = {
  animate: 0,
  frames: 0,
  pos: 0,
  draw: function (x, y, position){
    if (typeof position !== 'undefined'){
      this.pos = position;
    } else {
      if (this.animate){
        if (this.frames === 0){
          this.frames = this.animate;
          this.pos = this.pos === 0 ? this.positions.length-1 : this.pos -1;
        } else {
          this.frames--;
        }
      } else {
        this.pos = 0;
      }
    }
    var pos = this.positions[this.pos];
    images.drawSprite(this.img, pos[0], pos[1], this.width, this.height, x, y);
  }
};
