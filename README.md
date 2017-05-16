# scratcher.js #
A friendly HTML5 canvas API based on the block-based programming language Scratch

## Getting Started ##
**Download scratch.min.js and link it.**

	<script type="text/javascript" src="/js/scratch.min.js"></script>

**Initiate the API (main.js):**

	Scratch.init(document.getElementById('canvas'));

This will target a canvas and load media.

**Creating a sprite:**

	var sprite1 = new Sprite("doge");

**Importing an image and loading it.**

From Link:

	Scratch.importImage("doge", "http://68.media.tumblr.com/6322cf081c0e010a79c25b9e7867cd04/tumblr_inline_mxqwb8GTV41supt2z.png");
	Scratch.loadImages();

From Folder:

	Scratch.importImage("doge", "/img/doge.png");
	Scratch.loadImages();

From Base64:
	
	Scratch.importImage("doge", "data:image/png;base64,iVBORw0KGgoAAAA..........uu3LYqamN89n8mLYGZoufBfCK/oNkoFBFUAAAAASUVORK5CYII=");
	Scratch.loadImages();

**Accessing a Sprites Functions:**

	sprite1.changeXBy(10);
