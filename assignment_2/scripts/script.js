// TODO: Move hard coded values in variables
let bg_layers = [];                         // stores bg layers
let bg_pos = 0;                             // moves the bg slowly
let parallax_values = [6, 5, 4, 3, 2, 1];   // rate of parallax
let parallax_offsets = [0, 0, 0, 0, 0, 0];  // offets to add for parallax

let dino = [];                              // stores dino sprites
let dino_sprite = 0;                        // displays dino from index of dino[]
let slow_dino = 5;                          // slows dino sprite change; larger = slower    
let current_dino = 0;                       // used for slowing dino

let size = 25;                              // scales the canvas and elements

let game_start = false;

let font_one;
let start_img;

function preload() {
    // loading dino sprites
    for(let i = 0; i < 8; i++) {
        let img = loadImage(`assets/Dino/dino${i + 1}.png`);
        dino.push(img);
    }
    // loading bg images
    for(let i = 0; i < 6; i++) {
        let img = loadImage(`assets/Layers/${i + 1}.png`);
        bg_layers.push(img);
    }
    // load start img
    start_img = loadImage('assets/original-dino-game-bg.png');
    // load fonts
    font_one = loadFont('assets/Fonts/PressStart2P-Regular.ttf');
}

function setup() {
    createCanvas(size * 32, size * 9, WEBGL);
    frameRate(60);
}

function draw() {
    translate(-width / 2, -height / 2);
    if(!game_start) {
        draw_start();
    }
    else {
        draw_bg(bg_pos);
        draw_dino();
        draw_fg(bg_pos);
        // moves the bg and fg
        bg_pos += 2;
        // add the parallax effect
        parallax_offsets = parallax_offsets.map((num, i) => {
            return num + parallax_values[i];
        });
        console.log(parallax_offsets);
        // TODO: calculate when bg goes off screen due to parallax moving faster
        if(bg_pos >= (size * 32)) { // bg and parallax offsets
            bg_pos = 0;
            parallax_offsets = [0, 0, 0, 0, 0, 0];
        }
        
    }
}

// draws the start menu
function draw_start() {
    textFont(font_one);
    textAlign(CENTER);
    textSize(40);
    fill('#525252');

    image(start_img, 0, 0, size * 32, size * 9);
    text('DINO RUN', width / 2, 75);
    textSize(20);
    text('Space to start', width / 2, height / 2);
}

// draws the background (behind dino)
function draw_bg(bg_pos) {
    for(let i = 0; i < 5; i++) {
        image(bg_layers[5 - i], 0 - bg_pos, 0, size * 32, size * 9);
    }
    for(let i = 0; i < 5; i++) {
        image(bg_layers[5 - i], 0 + (size * 32) - bg_pos, 0, size * 32, size * 9);
    }
}
// draws the foreground (in front of dino)
function draw_fg(bg_pos) {
    image(bg_layers[0], 0 - bg_pos - parallax_offsets[0], 0, size * 32, size * 9);
    image(bg_layers[0], 0 + (size * 32) - bg_pos - parallax_offsets[0], 0, size * 32, size * 9);
}

// draws dino
function draw_dino() {
    image(dino[dino_sprite], size * 9 - 150, size * 9 - 110, 100, 100);
    // increase sprite every slow_dino amount of frames
    if(current_dino === slow_dino) {
        dino_sprite++;
        dino_sprite %= 8;   // keeps 0 <= dino_sprite <= 7
        current_dino = 0;
    }
    else {  // increment current_dino
        current_dino++;
        current_dino %= slow_dino + 1;
    }
}

function keyPressed() {
    if(keyCode === 32) {
        if(!game_start) {
            game_start = true;
            return;
        }
    }
}