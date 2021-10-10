// TODO: It appears that the vertex list is too long i.e. calculating too many
// TODO: vertices. Can probably optimize storing less in the linked list
// TODO: Make some stars sparkle
let M_KEY = 77;		// reset moon
let R_KEY = 82;		// reset mountains
let A_KEY = 65;		// animate
let S_KEY = 83;		// reset stars
let SPACE_BAR = 32;	// reset mountains
// how many nodes to skip over when drawing mountains
// larger = less nodes = faster, but less smooth
// smaller = more nodes = slower, but more smooth
let node_skip = 5;

let motion = false;
let mountains_count = 4;
let mountain_layers;
let mountain_colors;

let stars_list;
let star_count = 300;

let moon;
let moon_x;
let moon_y;
let moon_opacity;
let moon_size;

function setup() {
	var canvas = createCanvas(500, 500);
	canvas.parent('canvas-container');

	let palette = new Colors();
	palette.generate_colors(mountains_count);
	mountain_colors = palette.color_palette;

	mountain_layers = new Array(mountains_count);
	stars_list = new Array(star_count);

	initialize_stars_list();
	initialize_mountains();
	initialize_moon();
}

function draw() {
	// noLoop();
	background(mountain_colors[3]);

	moon.draw(mountain_colors[3]);

	draw_stars();

	mountain_layers[0].draw();
	mountain_layers[1].draw();
	mountain_layers[2].draw();
	mountain_layers[3].draw();

	// strokeWeight(1);
	// noStroke();
	// fill(255);
	// text(frameRate(), 20, 20);

	noLoop();
}

function initialize_moon() {
	moon_x = Math.random() * (width * 0.8);
	moon_y = Math.random() * (height / 4);
	moon_opacity = Math.floor((Math.random() * 50) + 180);
	moon_size = Math.floor((Math.random() * 30) + 80);
	moon = new Moon(moon_x, moon_y, moon_opacity, moon_size);
}

function initialize_stars_list() {
	for (let i = 0; i < star_count; i++) {
		let rand_x = Math.random() * width;
		let rand_y = Math.random() * (height / 2);
		let rand_radius = Math.random() * 2;
		stars_list[i] = new Star(rand_x, rand_y, rand_radius);
	}
}

function initialize_mountains() {
	let random_offsets = new Array(mountains_count);
	for (let i = 0; i < mountains_count; i++) {
		random_offsets[i] = Math.round(Math.random() * 40000) + 10000;
	}
	//constructor(min_height, max_height, noise_offset, speed, bumpy, color, motion)
	mountain_layers[0] = new Mountain(50, 300, random_offsets[0], 0.025, 0.00325, mountain_colors[0], motion, node_skip);
	mountain_layers[1] = new Mountain(150, 400, random_offsets[1], 0.025, 0.00325, mountain_colors[1], motion, node_skip);
	mountain_layers[2] = new Mountain(300, 400, random_offsets[2], 0.025, 0.00325, mountain_colors[2], motion, node_skip);
	mountain_layers[3] = new Mountain(350, 500, random_offsets[3], 0.025, 0.00325, mountain_colors[3], motion, node_skip);
	// initialize layers
	mountain_layers[0].initialize_vertex_list();
	mountain_layers[1].initialize_vertex_list();
	mountain_layers[2].initialize_vertex_list();
	mountain_layers[3].initialize_vertex_list();
}

function draw_stars() {
	for (let i = 0; i < star_count; i++) {
		stars_list[i].draw();
	}
}

function keyPressed() {
	if (keyCode === A_KEY) {
		motion = !motion;
		for (let i = 0; i < mountain_layers.length; i++) {
			mountain_layers[i].motion_value = motion;
		}
		console.log(`motion: ${motion}`);
	}
	else if (keyCode === R_KEY) {
		setup();
	}
	else if (keyCode === M_KEY) {
		initialize_moon();
	}
	else if (keyCode === S_KEY) {
		initialize_stars_list();
	}
	else if (keyCode === SPACE_BAR) {
		initialize_mountains();
	}
}

