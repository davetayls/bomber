/**
 * Keyboard helpers
 */
function Key(code){
	this.code = code;
}
Key.prototype = {
	down: false
};

function KeySet(){
	this.up =    new Key(38);
	this.down =  new Key(40);
	this.left =  new Key(37);
	this.right = new Key(39);
	this.space = new Key(32);
}

var keys = new KeySet();

function getKey(code){
	for (var key in keys){
		if (keys.hasOwnProperty(key)){
			if (keys[key].code === code){
				return keys[key];
			}
		}
	}
}

// Keyboard event listeners
window.addEventListener('keydown', function(e){
	var key = getKey(e.which);
	if (key){
		key.down = true;
		e.preventDefault();
	}
});
window.addEventListener('keyup', function(e){
	// console.log('keyup', e.which);
	var key = getKey(e.which);
	if (key){
		key.down = false;
		e.preventDefault();
	}
});

//var btnShoot = document.getElementById('btn-shoot'),
//	btnLeft = document.getElementById('btn-left'),
//	btnRight = document.getElementById('btn-right');
//
//btnShoot.addEventListener('touchstart', function(e){
//	keys.space.down = true;
//	e.preventDefault();
//});
//btnShoot.addEventListener('touchend', function(e){
//	keys.space.down = false;
//	e.preventDefault();
//});
//
//btnLeft.addEventListener('touchstart', function(e){
//	keys.left.down = true;
//	e.preventDefault();
//});
//btnLeft.addEventListener('touchend', function(e){
//	keys.left.down = false;
//	e.preventDefault();
//});
//
//btnRight.addEventListener('touchstart', function(e){
//	keys.right.down = true;
//	e.preventDefault();
//});
//btnRight.addEventListener('touchend', function(e){
//	keys.right.down = false;
//	e.preventDefault();
//});

