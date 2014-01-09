/*global TO_RADIANS:false */
var images = {
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
    // ...
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
