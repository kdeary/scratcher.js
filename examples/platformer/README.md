# Platformer Example

![](https://github.com/Hydrosaur/scratch.js/blob/master/examples/platformer/platformer.gif?raw=true)

### This is a great first example for newcomers to the API and basic-intermediate JS knowledge.

Creating a game with canvas with just the vanilla canvas functions has traditionally been very hard. It involves a lot of unnecessary functions and it’s a lot slower than it should be.

Canvas API's have been the solution which most projects use. scratch.js makes building canvas projects smaller and quicker to make.

You will be creating a platform game engine in under 60 lines of code.

### Setup
Create a folder and put an index.html file inside of it. Inside the folder create another folder called 'js'. Put scratch.min.js inside.

### index.html
	<!DOCTYPE html>
	<html>
	<head>
	    <title>Scratch.js</title>
	</head>
	<body>
	    <canvas id="canvas" width="640" height="480" style="border: 1px solid black"></canvas>
	    <script type="text/javascript" src="js/scratch.min.js"></script>
	    <script type="text/javascript" src="js/main.js"></script>
	</body>
	</html>

This will create a canvas that 640x480 pixels and link our javascript.

### main.js

Create a main.js file inside the js folder.

Let's start with making the character.

We will be using a megaman character: ![](https://github.com/Hydrosaur/scratch.js/blob/master/examples/platformer/img/right.png?raw=true)

First we'll initiate the API and then import images.
	
	var sprite1;
	
	Scratch.init(document.getElementById('canvas'));
	Scratch.importImage("char", "https://github.com/Hydrosaur/scratch.js/blob/master/examples/platformer/img/right.png?raw=true");
	Scratch.loadImages(start);

Scratch.init() locates the canvas using a DOM function and sets up the Scratch object.

Scratch.importImages() can also take local directories and base64.

Scratch.loadImages() allows the images to be used on the canvas. It also takes a callback function.

A variable is also made to hold the sprite.

Next let's create the start function. This will be run once the images have been loaded.

	function start() {
	    sprite1 = new Sprite("char");
	    sprite1.goto(0, -100);
	}

This will store the Sprite inside the sprite1 variable and then make it show at -100 on the y-axis when the images have been loaded.

Open index.html in the browser and you'll see a ![](https://github.com/Hydrosaur/scratch.js/blob/master/examples/platformer/img/right.png?raw=true) in the canvas.

Now let's create the first game loop.

Add a setInterval() to your start function:

	function start() {
	    sprite1 = new Sprite("char");
	    sprite1.goto(0, -100);
	    setInterval(loop, 20);
	}

This will call the loop() function every 20 milliseconds.

Let's create the loop() function:

	function loop() {
	    if(sprite1.y > Scratch.height / 2 - sprite1.height){
            velocity = 0;
        } else {
	        velocity = velocity + gravity;
	        sprite1.changeYBy(velocity);
        }
	}

Then below where the sprite1 variable is create velocity and gravity varibles.

	var sprite1;
	var velocity = 0;
	var gravity = 0.3;

This calculates if the character is touching the bottom of the canvas:

    sprite1.y > Scratch.height / 2 - sprite1.height

This makes the sprite fall:

	velocity = velocity + gravity;
    sprite1.changeYBy(velocity);

Open index.html in the browser and you'll see the character falling down to the bottom of the canvas.

Now lets add some bounce when the character falls.

Create another variable at the top called bouncecount.

	var sprite1;
	var velocity = 0;
	var gravity = 0.3;
	var bouncecount = 0;

Add an if else statement to the function:

    if(sprite1.y > Scratch.height / 2 - sprite1.height){
        if(bouncecount > 2){
            
        } else {
            velocity = 0;
        }
    } else {
        velocity = velocity + gravity;
        sprite1.changeYBy(velocity);
    }

Then inside the if else statement add this:

    if(bouncecount < 2){
        velocity = velocity * -1;
        sprite1.changeYBy(velocity);
        velocity = velocity / 5;
        bouncecount++;
    } else {
        velocity = 0;
    }

I'll break down line by line how it works.

These lines make the character bounce.

    velocity = velocity * -1;
	sprite1.changeYBy(velocity);

This line makes the character bounce lower anytime it does.

    velocity = velocity / 5;

This line controls how many times the character bounces

    bouncecount++;

Now when you open index.html in your browser the character falls and then bounces.

We'll make the character jump when we press the up arrow now.

Put this inside the loop function.

    if(Scratch.iskeydown[38]){
        if(sprite1.y > Scratch.height / 2 - sprite1.height){
            velocity = -8;
            bouncecount = 0;
            sprite1.changeYBy(velocity);
        }
    }

Scratch.iskeydown[38] checks if the up arrow key is pressed. You can get all the [Key Codes](http://keycode.info) there.

This checks if the sprite is touching the ground.

    sprite1.y > Scratch.height / 2 - sprite1.height

This makes the sprite jump:

    velocity = -8;
    bouncecount = 0;
    sprite1.changeYBy(velocity);

Try pressing the up arrow on index.html and the sprite will jump.

Now let's add the left and right arrow keys.

    if(Scratch.iskeydown[37]){
        horizontalvelo = -4;
    }
    if(Scratch.iskeydown[39]){
        horizontalvelo = 4;
    }

This tests when the left or right arrow is pressed.

Above those two if statements put this:

    sprite1.changeXBy(horizontalvelo);

Try press the left and right arrow keys on index.html and you'll see that
this will make the sprite move left and right. But it will keep moving.
Let's fix that.

Under the two if statements put this:

    if(Scratch.iskeydown[37] === false && Scratch.iskeydown[39] === false){
        horizontalvelo = horizontalvelo * 0.92;
    }

This will slow down the character when the left and right arrow keys are not pressed.

We are almost done. But the character doesn't turn when we press the left arrow.

Import another image and rename "char" to "right" and name the other "left".

    Scratch.init(document.getElementById('canvas'));
    Scratch.importImage("right", "https://github.com/Hydrosaur/scratch.js/blob/master/examples/platformer/img/right.png?raw=true");
    Scratch.importImage("left", "https://github.com/Hydrosaur/scratch.js/blob/master/examples/platformer/img/left.png?raw=true");
    Scratch.loadImages(start);

Then change "char" to "right":

    function start() {
        sprite1 = new Sprite("right");
        sprite1.goto(0, -100);
        setInterval(loop, 20);
    }

Then add a Scratch.changeImage() function to the left and right arrow key if statements like this:

    if(Scratch.iskeydown[37]){
        horizontalvelo = -4;
        sprite1.changeImage("left");
    }
    if(Scratch.iskeydown[39]){
        horizontalvelo = 4;
        sprite1.changeImage("right");
     }

**That's It!**

**You have just created a platformer game engine!**

You can download the example on this page.