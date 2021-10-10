// TODO: It appears that the vertex list is too long i.e. calculating too many
// TODO: vertices. Can probably optimize storing less in the linked list
let SPACE_BAR = 32;
// how many nodes to skip over when drawing mountains
// larger = less nodes = faster, but less smooth
// smaller = more nodes = slower, but more smooth
let node_skip = 5;

let motion = false;
let mountains_count = 5; 
let bg_layers = new Array(mountains_count);

function setup() {
	createCanvas(500, 500);
	//constructor(min_height, max_height, noise_offset, speed, bumpy, color, motion)
	bg_layers[0] = new Mountain(50, 300, 40000, 0.025, 0.00325, 'purple', motion, node_skip);
	bg_layers[1] = new Mountain(150, 400, 30000, 0.025, 0.00325,'yellow', motion, node_skip);
	bg_layers[2] = new Mountain(300, 400, 20000, 0.025, 0.00325, 'green', motion, node_skip);
	bg_layers[3] = new Mountain(350, 500, 10000, 0.025, 0.00325,'blue', motion, node_skip);
	bg_layers[4] = new Mountain(450, 500, 0, 0.025, 0.00325, 'red', motion, node_skip);

	bg_layers[0].initialize_vertex_list();
	bg_layers[1].initialize_vertex_list(); 
	bg_layers[2].initialize_vertex_list();
	bg_layers[3].initialize_vertex_list(); 
	bg_layers[4].initialize_vertex_list(); 
}

function draw() {
	// noLoop();
	background(0);
	bg_layers[0].new_draw();
	bg_layers[1].new_draw();
	bg_layers[2].new_draw();
	bg_layers[3].new_draw();
	bg_layers[4].new_draw();

	let line50 = new DEV_Horizontal_Line(50);
	line50.draw();

	let line300 = new DEV_Horizontal_Line(300);
	line300.draw();

	strokeWeight(1);
	text(frameRate(), 20, 20);
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