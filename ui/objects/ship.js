/*global Bullet,bullets,Sprite,KeySet,sprites,w,h*/

var shipCount = 0;

function Ship(){
	this.x = Math.floor(w/2);
	this.y = Math.floor(h*0.95);
    this.points = 0;

    var spr = [
        [272, 551], // blue
        [276, 228], // green
        [393, 387], // dark green
        [186, 627], // little blue thing
        [283, 699]
    ];
	this.sprite = new Sprite(sprites, this.w, this.h, spr);

    this.spriteIndex = shipCount % spr.length;
    console.log(this.spriteIndex);
    this.playerNumber = shipCount;
    shipCount++;
}
Ship.prototype = {
	x: 0,
	y: 0,
	w: 28,
	h: 16,
	jump: 4,
	lastBullet: new Date().getTime(),
	timeBetweenBullets: 500,
    spriteIndex: 0,

	draw: function(){
		var o = this.offset();
		this.sprite.draw(this.spriteIndex, this.x - o.x, this.y - o.y);
	},
	offset: function(){
		return {
			x: Math.floor(this.w/2),
			y: Math.floor(this.h/2)
		};
	},
	jumpLeft: function(){
		this.x-=this.jump;
		this.x = this.x < 10 ? 10 : this.x;
	},
	jumpRight: function(){
		var maxR = w - this.w - 10;
		this.x+=this.jump;
		this.x = this.x > maxR ? maxR : this.x;
	},
	canShoot: function(){
		return (new Date().getTime() - this.lastBullet) > this.timeBetweenBullets;
	},
	shoot: function(){
		this.lastBullet = new Date().getTime();
		bullets.push(new Bullet({
			x: this.x,
			y: this.y,
			ship: this
		}));
	}
};


