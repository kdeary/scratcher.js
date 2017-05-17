var sprites = [];
var Scratch = {
	targetelem: null,
	game: null,
	images: {},
	sounds: {},
	width: 640,
	height: 480,
	autorender: true,
	iskeydown: [],
	ismousedown: false,
	mousex: 0,
	mousey: 0,
	stage: {
		image: "#FFFFFF"
	},
	setContext: function(el) {
		Scratch.targetelem = el;
		Scratch.game = el.getContext("2d");
		Scratch.width = el.width;
		Scratch.height = el.height;
		Scratch.game.translate(el.width / 2, el.height / 2);
		return el.getContext("2d");
	},
	loadImages: function(callback){
		var counter = 0;
		var keys = Object.keys(Scratch.images);
		next();
		function next() {
			var image = document.createElement("IMG");
			image.setAttribute("id", keys[counter]);
			image.setAttribute("src", Scratch.images[keys[counter]]);
			document.getElementById("images").appendChild(image);
		    document.getElementById(keys[counter]).onload = function(){
		    	if((counter + 1) === keys.length){
		    		if(typeof undefined === 'undefined'){
		    			callback();
		    		}
		    	} else {
		    		counter++;
		    		next();
		    	}
		    };
		};
	},
	render: function(){
		if(Scratch.stage.image.indexOf("#") >= 0) {
			Scratch.game.fillStyle = Scratch.stage.image;
			Scratch.game.fillRect(-Scratch.width / 2, -Scratch.height / 2, Scratch.width, Scratch.height);
		} else {
			Scratch.game.fillStyle = "#FFFFFF";
			Scratch.game.fillRect(-Scratch.width / 2, -Scratch.height / 2, Scratch.width, Scratch.height);
			Scratch.game.drawImage(document.querySelector("#images #" + Scratch.stage.image), -Scratch.width / 2, -Scratch.height / 2, Scratch.width, Scratch.height);
		}	
		
		sprites.forEach(function(item){
			if(item.visible) {
				// Scratch.game.rotate(Math.PI / item.angle);
				// Scratch.game.drawImage(document.querySelector("#images #" + item.image), item.x, item.y);
				// Scratch.game.rotate(0);
				Scratch.game.drawImage(document.querySelector("#images #" + item.image), item.x, item.y);
			}
		});
	},
	importImage: function(name, img){
		Scratch.images[name] = img;
	},
	importSound: function(name, snd){
		Scratch.sounds[name] = snd;
	},
	init: function(elem){
		var imagediv = document.createElement("DIV");
		imagediv.setAttribute("id", "images");
		imagediv.setAttribute("style", "display: none");
		document.body.appendChild(imagediv);
		Scratch.setContext(elem);
	}
}

function Sprite(image) {
	if (!Scratch.images.hasOwnProperty(image)) {
	    throw "Scratch.images does not contain '" + image + "'.";
	}
	this.image = image;
	this.visible = true;
	this.x = 0;
	this.y = 0;
	this.angle = 0;
	this.width = document.querySelector("#images #" + this.image).naturalWidth;
	this.height = document.querySelector("#images #" + this.image).naturalHeight;
	this.draw = function(){
		Scratch.game.drawImage(document.querySelector("#images #" + this.image), this.x, this.y);
	}
	this.changeXBy = function(ex){
		this.x = this.x + ex;
		if(Scratch.autorender) Scratch.render();
	}
	this.changeYBy = function(ex){
		this.y = this.y + ex;
		if(Scratch.autorender) Scratch.render();
	}
	this.goto = function(ex, ey){
		this.x = ex;
		this.y = ey;
		if(Scratch.autorender) Scratch.render();
	}
	this.hide = function(){
		this.visible = false;
		if(Scratch.autorender) Scratch.render();
	}
	this.show = function(){
		this.visible = true;
		if(Scratch.autorender) Scratch.render();
	}
	this.playSound = function(sound){
		if (!Scratch.sounds.hasOwnProperty(sound)) {
		    throw "Scratch.sounds does not contain '" + sound + "'.";
		}
		var audio = new Audio(Scratch.sounds[sound]);
		audio.play();
	}
	this.changeImage = function(img){
		if (!Scratch.images.hasOwnProperty(img)) {
		    throw "Scratch.images does not contain '" + img + "'.";
		}
		this.image = img;
		if(Scratch.autorender) Scratch.render();
	}
	this.touching = function(sprite){
		return !( sprite.x           > (this.x + this.width) || 
             (sprite.x + sprite.width) <  this.x           || 
              sprite.y           > (this.y + this.height) ||
             (sprite.y + sprite.height) <  this.y);
	}
	this.pointInDirection = function(ed){
		// this.angle = ed;
		// if(Scratch.autorender) Scratch.render();
	}
	sprites.push(this);
}

window.addEventListener("keydown", function (e) {
  Scratch.iskeydown[e.keyCode] = true;
});
window.addEventListener("keyup", function (e) {
  Scratch.iskeydown[e.keyCode] = false;
});
window.addEventListener("mousedown", function (e) {
  Scratch.ismousedown = true;
});
window.addEventListener("mouseup", function (e) {
  Scratch.ismousedown = false;
});
window.addEventListener("mousemove", function (e) {
  Scratch.mousex = e.clientX;
  Scratch.mousey = e.clientY;
});