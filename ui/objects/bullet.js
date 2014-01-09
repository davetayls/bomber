/*global Sprite,sprites,w,h*/
function Bullet(opt){
	this.sprite = new Sprite(sprites, this.w, this.h, [[46, 816]]);
	this.x = opt.x || this.x;
	this.y = opt.y || this.y;
	this.ship = opt.ship;
}
Bullet.prototype = {
	x: 0,
	y: 0,
	w: 28,
	h: 12,
	jump: 4,
	destroyed: false,

	getXY: function(){
		return { x: this.x, y: this.y };
	},
	offset: function(){
		return {
			x: Math.floor(this.w/2),
			y: Math.floor(this.h/2)
		};
	},
	draw: function(){
		if (!this.destroyed){
			var o = this.offset();
			this.sprite.draw(0, this.x - o.x, this.y - o.y);
		}
	},
	move: function(){
		this.y-=this.jump;
		this.y = this.y < -50 ? -50 : this.y;
	},
	inView: function(){
		return this.y > -50;
	}
};