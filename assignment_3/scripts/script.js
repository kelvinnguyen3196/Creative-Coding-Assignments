
let mountains_count = 5;
let bg_layers = new Array(mountains_count);

function setup() {
	createCanvas(500, 500);
	bg_layers[0] = new Mountain(50, 300, 40000, 0.001, 0.125, 'purple');
	bg_layers[1] = new Mountain(150, 400, 30000, 0.001, 0.125,'yellow');
	bg_layers[2] = new Mountain(300, 400, 20000, 0.001, 0.125, 'green');
	bg_layers[3] = new Mountain(350, 500, 10000, 0.001, 0.125,'blue');
	bg_layers[4] = new Mountain(450, 500, 0, 0.001, 0.125, 'red');
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