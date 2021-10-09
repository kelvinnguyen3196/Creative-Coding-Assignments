// TODO: Change from drawing every frame to saving values into a linked list
	// TODO: This may improve performance
// TODO: Create a developer class for drawing a line
let SPACE_BAR = 32;

let motion = false;
let mountains_count = 5;
let bg_layers = new Array(mountains_count);

function setup() {
	createCanvas(500, 500);
	bg_layers[0] = new Mountain(50, 300, 40000, 0.001, 0.125, 'purple', motion);
	bg_layers[1] = new Mountain(150, 400, 30000, 0.001, 0.125,'yellow', motion);
	bg_layers[2] = new Mountain(300, 400, 20000, 0.001, 0.125, 'green', motion);
	bg_layers[3] = new Mountain(350, 500, 10000, 0.001, 0.125,'blue', motion);
	bg_layers[4] = new Mountain(450, 500, 0, 0.001, 0.125, 'red', motion);
}

function draw() {
	background(0);
	bg_layers[0].draw();
	bg_layers[1].draw();
	bg_layers[2].draw();
	bg_layers[3].draw();
	bg_layers[4].draw();

	// beginShape();
	// stroke(255);
	// for(let i = 0; i < width; i++) {
	// 	vertex(i, 200);
	// }
	// endShape();
	// beginShape();
	// stroke(255);
	// for(let i = 0; i < width; i++) {
	// 	vertex(i, 400);
	// }
	// endShape();
}

function keyPressed() {
	if(keyCode === SPACE_BAR) {
		motion = !motion;
		for(let i = 0; i < bg_layers.length; i++) {
			bg_layers[i].motion_value = motion;
		}
		console.log(`motion: ${motion}`);
	}
}