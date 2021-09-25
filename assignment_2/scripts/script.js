let bg_layers = [];         // stores bg layers
let bg_pos = 0;             // moves the bg slowly

let dino = [];              // stores dino sprites
let dino_sprite = 0;        // displays dino from index of dino[]
let slow_dino = 1;          // slows dino sprite change     
let current_dino = 0;       // used for slowing dino

let size = 25;              // scales the canvas and elements

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
        bg_pos++;
        if(bg_pos === (size * 32)) {
            bg_pos = 0;
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

// draws the background
function draw_bg(offset) {
    for(let i = 0; i < 6; i++) {
        image(bg_layers[5 - i], 0 - offset, 0, size * 32, size * 9);
    }
    for(let i = 0; i < 6; i++) {
        image(bg_layers[5 - i], 0 + (size * 32) - offset, 0, size * 32, size * 9);
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