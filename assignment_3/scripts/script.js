// TODO: It appears that the vertex list is too long i.e. calculating too many
	// TODO: vertices. Can probably optimize storing less in the linked list
// TODO: Make some stars sparkle
let M_KEY = 77;
let R_KEY = 82;
// how many nodes to skip over when drawing mountains
// larger = less nodes = faster, but less smooth
// smaller = more nodes = slower, but more smooth
let node_skip = 5;

let motion = false;
let mountains_count = 5; 
let mountain_layers;

let stars_list;
let star_count = 300;

let moon;
let moon_x;
let moon_y;
let moon_opacity;
let moon_size;

function setup() {
	createCanvas(500, 500);

	mountain_layers = new Array(mountains_count);
	stars_list = new Array(star_count);

	initialize_stars_list();

	//constructor(min_height, max_height, noise_offset, speed, bumpy, color, motion)
	mountain_layers[0] = new Mountain(50, 300, 40000, 0.025, 0.00325, '#e6b0ff', motion, node_skip);
	mountain_layers[1] = new Mountain(150, 400, 30000, 0.025, 0.00325,'#d29c36', motion, node_skip);
	mountain_layers[2] = new Mountain(300, 400, 20000, 0.025, 0.00325, '#d29ceb', motion, node_skip);
	mountain_layers[3] = new Mountain(350, 500, 10000, 0.025, 0.00325,'#6e38ff', motion, node_skip);
	mountain_layers[4] = new Mountain(450, 500, 0, 0.025, 0.00325, '#6e38cd', motion, node_skip);

	// initialize layers
	mountain_layers[0].initialize_vertex_list();
	mountain_layers[1].initialize_vertex_list(); 
	mountain_layers[2].initialize_vertex_list();
	mountain_layers[3].initialize_vertex_list(); 
	mountain_layers[4].initialize_vertex_list(); 

	moon_x = Math.random() * (width * 0.8);
	moon_y = Math.random() * (height / 4);
	moon_opacity = Math.floor((Math.random() * 50) + 180);
	moon_size = Math.floor((Math.random() * 30) + 80);
	moon = new Moon(moon_x, moon_y, moon_opacity, moon_size);
}

function draw() {
	// noLoop();
	background('#060224');

	moon.draw();

	draw_stars();

	mountain_layers[0].draw();
	mountain_layers[1].draw();
	mountain_layers[2].draw();
	mountain_layers[3].draw();
	mountain_layers[4].draw();

	// let line50 = new DEV_Horizontal_Line(50);
	// line50.draw();

	// let line300 = new DEV_Horizontal_Line(300);
	// line300.draw();

	// strokeWeight(1);
	// noStroke();
	// fill(255);
	// text(frameRate(), 20, 20);


}

function initialize_stars_list() {
	for(let i = 0; i < star_count; i++) {
		let rand_x = Math.random() * width;
		let rand_y = Math.random() * (height / 2);
		let rand_radius = Math.random() * 2;
		stars_list[i] = new Star(rand_x, rand_y, rand_radius);
	}
}

function draw_stars() {
	for(let i = 0; i < star_count; i++) {
		stars_list[i].draw();
	}
}

function keyPressed() {
	if(keyCode === M_KEY) {
		motion = !motion;
		for(let i = 0; i < mountain_layers.length; i++) {
			mountain_layers[i].motion_value = motion;
		}
		console.log(`motion: ${motion}`);
	}
	if(keyCode === R_KEY) {
		setup();
	}
}