var bouncecount = 0;
var velocity = 0;
var gravity = 0.3;
var horizontalvelo = 0;
var sprite1;

Scratch.init(document.getElementById('canvas'));
Scratch.importImage("right", "img/right.png");
Scratch.importImage("left", "img/left.png");
Scratch.loadImages(start);

function start() {
	sprite1 = new Sprite("right");
	sprite1.goto(0, -100);
	setInterval(loop, 20);
	console.log(Scratch.game);
}

function loop(){
	if(sprite1.y > Scratch.height / 2 - sprite1.height){
		if(bouncecount < 2){
			velocity = velocity * -1;
			sprite1.changeYBy(velocity);
			velocity = velocity / 5;
			bouncecount++;
		} else {
			velocity = 0;
		}
	} else {
		velocity = velocity + gravity;
		sprite1.changeYBy(velocity);
	}
	if(Scratch.iskeydown[38]){
		if(sprite1.y > Scratch.height / 2 - sprite1.height){
			velocity = -8;
			bouncecount = 0;
			sprite1.changeYBy(velocity);
		}
	}
	sprite1.changeXBy(horizontalvelo);
	if(Scratch.iskeydown[37]){
		horizontalvelo = -4;
		sprite1.changeImage("left");
	}
	if(Scratch.iskeydown[39]){
		horizontalvelo = 4;
		sprite1.changeImage("right");
	}
	if(Scratch.iskeydown[37] === false && Scratch.iskeydown[39] === false){
		horizontalvelo = horizontalvelo * 0.92;
	}
}