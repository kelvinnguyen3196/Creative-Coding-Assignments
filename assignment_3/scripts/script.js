// TODO: It appears that the vertex list is too long i.e. calculating too many
// TODO: vertices. Can probably optimize storing less in the linked list
// TODO: Fix moon
// controls
let Q_KEY = 81;		// reset moon
let W_KEY = 87;		// reset stars
let E_KEY = 69;		// reset mountains

let A_KEY = 65;		// reset main color
let S_KEY = 83;		// reset contrast color
let L_KEY = 76;		// reset all colors

let ONE_KEY = 49;	// animate/play
let TWO_KEY = 50;	// decrease volume
let THREE_KEY = 51;	// increase volume
let ZERO_KEY = 48;	// change song

let P_KEY = 80;		// reset all visuals


// how many nodes to skip over when drawing mountains
// larger = less nodes = faster, but less smooth
// smaller = more nodes = slower, but more smooth
let node_skip = true;
// mountain slow amount
let ms0 = 2;
let ms1 = 3;
let ms2 = 4;
let ms3 = 5;
let ms4 = 6;
let ms5 = 7;
// mountain tracker
let mt0 = 0;
let mt1 = 0;
let mt2 = 0;
let mt3 = 0;
let mt4 = 0;
let mt5 = 0;

let motion = false;
let mountains_count = 4;
let random_offsets;
let back_mountain1;
let back_mountain2;
let mountain_layers;
let mountain_colors;
let extra_colors;

let stars_list;
let sparkled_stars;
let star_count = 300;
let sparkle_slow = 2;
let sparkle_tracker = 0;

let moon;
let moon_x;
let moon_y;
let moon_opacity;
let moon_size;

let gradient_maker;

let palette;

let music_player;
let music_playing = false;
let music_volume = 0.5;

function preload() {
	music_player = new Lofi();
	music_player.load_song();
}

function setup() {
	let width = 0;
	let height = 0;
	if (window.innerWidth < 600) {
		width = window.innerWidth * 0.9;
	}
	else {
		width = 600;
	}
	height = width;

	var canvas = createCanvas(width, height);
	canvas.parent('canvas-container');

	gradient_maker = new Gradient();

	palette = new Colors();
	palette.generate_colors(mountains_count);
	mountain_colors = palette.color_palette;
	extra_colors = palette.extra_color_palette;

	mountain_layers = new Array(mountains_count);
	stars_list = new Array(star_count);
	sparkled_stars = new Array(star_count);
	sparkled_stars.fill(0);

	initialize_stars_list();
	initialize_mountains();
	initialize_moon();

	populate_volume();
}

function draw() {
	let lighter1 = extra_colors[0];
	let lighter2 = extra_colors[1];
	let contrast_color = extra_colors[2];

	background(mountain_colors[3]);
	gradient_maker.draw_vertical(0, 0, width, height, color(mountain_colors[3]), color(contrast_color), 1);
	moon.draw(mountain_colors[3]);

	if (motion) {
		if (sparkle_tracker >= sparkle_slow) {
			sparkle_stars();
			sparkle_tracker = 0;
		}
		else {
			draw_stars();
			sparkle_tracker += 1;
		}
	}
	else {
		draw_stars();
	}

	if (motion) {
		if (music_playing === false) {
			music_player.current_track.setVolume(music_volume);
			music_player.current_track.loop();
			music_playing = true;
		}
	}
	else {
		music_player.current_track.pause();
		music_playing = false;
	}

	motion_check();

	back_mountain1.draw_alpha(0.9);
	// gradient_maker.draw_vertical(0, height - (height * 0.6), width, (height * 0.6), color(lighter2), color(contrast_color), 1);
	back_mountain2.draw_alpha(1);
	gradient_maker.draw_vertical(0, height - (height * 0.4), width, (height * 0.4), color(lighter1), color(contrast_color), 1);
	mountain_layers[0].draw();
	gradient_maker.draw_vertical(0, height - (height * 0.4), width, (height * 0.4), color(mountain_colors[0]), color(contrast_color), 1);
	mountain_layers[1].draw();
	gradient_maker.draw_vertical(0, height - (height * 0.25), width, (height * 0.25), color(mountain_colors[1]), color(contrast_color), 1);
	mountain_layers[2].draw();
	gradient_maker.draw_vertical(0, height - (height * 0.15), width, (height * 0.15), color(mountain_colors[2]), color(contrast_color), 1);
	mountain_layers[3].draw();

	halt_motion();

	// strokeWeight(1);
	// noStroke();
	// fill(255);
	// text(frameRate(), 20, 20);
}

function motion_check() {
	if (mt0 >= ms0) {
		mountain_layers[3].skip = false;
		mt0 = 0;
	}
	if (mt1 >= ms1) {
		mountain_layers[2].skip = false;
		mt1 = 0;
	}
	if (mt2 >= ms2) {
		mountain_layers[1].skip = false;
		mt2 = 0;
	}
	if (mt3 >= ms3) {
		mountain_layers[0].skip = false;
		mt3 = 0;
	}
	if (mt4 >= ms4) {
		back_mountain2.skip = false;
		mt4 = 0;
	}
	if (mt5 >= ms5) {
		back_mountain1.skip = false;
		mt5 = 0;
	}
	mt0 += 1;
	mt1 += 1;
	mt2 += 1;
	mt3 += 1;
	mt4 += 1;
	mt5 += 1;
}

function halt_motion() {
	for (let i = 0; i < mountains_count; i++) {
		mountain_layers[i].skip = true;
	}
	back_mountain1.skip = true;
	back_mountain2.skip = true;
}

function initialize_moon() {
	moon_x = Math.random() * (width * 0.5);
	moon_y = Math.random() * (height / 8);
	moon_opacity = Math.floor((Math.random() * 50) + 180);
	moon_size = Math.floor((Math.random() * 30) + 80);
	moon = new Moon(moon_x + (width * 0.25), moon_y, moon_opacity, moon_size);
}

function initialize_stars_list() {
	for (let i = 0; i < star_count; i++) {
		let rand_x = Math.random() * width;
		let rand_y = Math.random() * (height / 3);
		let rand_radius = Math.random() * 2;
		stars_list[i] = new Star(rand_x, rand_y, rand_radius);
	}
}

function sparkle_stars() {
	let random_star = Math.floor(Math.random() * star_count);
	while (sparkled_stars[random_star] != 0) {
		random_star = Math.floor(Math.random() * star_count);
	}
	sparkled_stars[random_star] = 1;
	let random_star_size = stars_list[random_star].r_val;
	stars_list[random_star].s_r_val = random_star_size + 1;

	draw_stars();

	for (let i = 0; i < star_count; i++) {
		if (sparkled_stars[i] > 0) {
			sparkled_stars[i] += 1;
		}
		if (sparkled_stars[i] === 10) {
			sparkled_stars[i] = 0;
			stars_list[i].s_r_val = stars_list[i].r_val - 1;
		}
	}
}

function initialize_mountains() {
	let lighter1 = extra_colors[0];
	let lighter2 = extra_colors[1];

	random_offsets = new Array(mountains_count);
	for (let i = 0; i < mountains_count; i++) {
		random_offsets[i] = Math.round(Math.random() * 40000) + 10000;
	}
	//constructor(min_height, max_height, noise_offset, speed, bumpy, color, motion)
	mountain_layers[0] = new Mountain(height * 0.4, height * 0.7, random_offsets[0], 0.025, 0.00325, mountain_colors[0], motion, node_skip);
	mountain_layers[1] = new Mountain(height * 0.5, height * 0.8, random_offsets[1], 0.025, 0.00325, mountain_colors[1], motion, node_skip);
	mountain_layers[2] = new Mountain(height * 0.75, height * 0.9, random_offsets[2], 0.025, 0.00325, mountain_colors[2], motion, node_skip);
	mountain_layers[3] = new Mountain(height * 0.85, height * 0.95, random_offsets[3], 0.025, 0.00325, mountain_colors[3], motion, node_skip);
	back_mountain1 = new Mountain(height * 0.2, height * 0.4, Math.round(Math.random() * 40000) + 10000, 0.5, 0.00125, lighter2, motion, node_skip);
	back_mountain2 = new Mountain(height * 0.3, height * 0.6, Math.round(Math.random() * 40000) + 10000, 0.5, 0.00125, lighter1, motion, node_skip);
	// initialize layers
	mountain_layers[0].initialize_vertex_list();
	mountain_layers[1].initialize_vertex_list();
	mountain_layers[2].initialize_vertex_list();
	mountain_layers[3].initialize_vertex_list();
	back_mountain1.initialize_vertex_list();
	back_mountain2.initialize_vertex_list();
}

function draw_stars() {
	for (let i = 0; i < star_count; i++) {
		stars_list[i].draw();
	}
}

function populate_volume() {
	let fixed_percentage = music_volume.toFixed(1);
	let volume_percentage = fixed_percentage * 100;

	document.getElementById('volume-percent').innerHTML = volume_percentage + "%";
}

function keyPressed() {
	if (keyCode === ONE_KEY) {							// animate/play
		motion = !motion;
		for (let i = 0; i < mountain_layers.length; i++) {
			mountain_layers[i].motion_value = motion;
		}
		back_mountain1.motion_value = motion;
		back_mountain2.motion_value = motion;
		console.log(`motion: ${motion}`);
	}
	else if (keyCode === P_KEY) {						// reset all visuals
		setup();
	}
	else if (keyCode === Q_KEY) {						// reset moon
		initialize_moon();
	}
	else if (keyCode === W_KEY) {						// reset stars
		initialize_stars_list();
	}
	else if (keyCode === E_KEY) {						// reset mountains
		initialize_mountains();
	}
	else if (keyCode === L_KEY) {						// reset all colors
		palette.generate_colors(mountains_count);
		mountain_colors = palette.color_palette;
		extra_colors = palette.extra_color_palette;
		let lighter1 = extra_colors[0];
		let lighter2 = extra_colors[1];
		mountain_layers[0].new_color = mountain_colors[0];
		mountain_layers[1].new_color = mountain_colors[1];
		mountain_layers[2].new_color = mountain_colors[2];
		mountain_layers[3].new_color = mountain_colors[3];
		back_mountain1.new_color = lighter2;
		back_mountain2.new_color = lighter1;
	}
	else if (keyCode === A_KEY) {						// reset main colors
		palette.regenerate_color_palette();
		mountain_colors = palette.color_palette;
		extra_colors = palette.extra_color_palette;
		let lighter1 = extra_colors[0];
		let lighter2 = extra_colors[1];
		mountain_layers[0].new_color = mountain_colors[0];
		mountain_layers[1].new_color = mountain_colors[1];
		mountain_layers[2].new_color = mountain_colors[2];
		mountain_layers[3].new_color = mountain_colors[3];
		back_mountain1.new_color = lighter2;
		back_mountain2.new_color = lighter1;
	}
	else if (keyCode === S_KEY) {						// reset contrast color
		palette.regenerate_contrast_color();
	}
	else if (keyCode === TWO_KEY) {						// decrease volume
		if (music_volume > 0) {
			music_volume -= 0.1;
		}
		if (music_volume < 0) {
			music_volume = 0;
		}
		music_player.current_track.setVolume(music_volume);
		populate_volume();
	}
	else if (keyCode === THREE_KEY) {					// increase volume
		if (music_volume < 1) {
			music_volume += 0.1;
		}
		if (music_volume > 1) {
			music_volume = 1;
		}
		music_player.current_track.setVolume(music_volume);
		populate_volume();
	}
	else if (keyCode === ZERO_KEY) {
		music_player.change_song();
		music_player.current_track.setVolume(music_volume);
		music_player.current_track.loop();
	}
}
