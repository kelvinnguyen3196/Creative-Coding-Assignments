// note about aspect ratio
    // since aspect_ratio.x is a lot longer than using a hardcoded 32
    // I think it would be more beneficial to mention that aspect
    // ratio here and instead use a hardcoded number for better readability
    // since some of the lines where aspect ratio is used is rather long

let bg_layers = [];                         // stores bg layers
let bg_pos = [0, 0, 0, 0, 0, 0];            // moves each bg layer slowly
let parallax_values = [6, 5, 4, 3, 2, 1];   // rate of parallax
let parallax_offsets = [0, 0, 0, 0, 0, 0];  // offets to add for parallax

let dino = [];                              // stores dino sprites
let dino_position;                          // stores dino position
let dino_sprite = 0;                        // displays dino from index of dino[]
let slow_dino = 4;                          // slows dino sprite change; larger = slower    
let current_dino = 0;                       // used for slowing dino
let dino_jump_height = 0;                   // dino jump height
let dino_jumped = false;                    // checks if dino has jumped

let size = 25;                              // scales the canvas and elements

let game_start = false;

let font_one;
let start_img;
let random_dino = Math.floor(Math.random() * 6);    // picks a random dino
let dino_asset_base = ['blue', 'green', 'orange', 'purple', 'red', 'yellow'];

function preload() {
    // loading dino sprites
    for(let i = 0; i < 8; i++) {
        let img = loadImage(`assets/Dino/${dino_asset_base[random_dino]}_dino/dino${i + 1}.png`);
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
    // set up vectors
    dino_position = createVector(size * 9 - 150, size * 9 - 110);
}

function draw() {
    translate(-width / 2, -height / 2);
    if(!game_start) {   // start menu
        draw_start();
    }
    else {  // game loop
        draw_bg();
        draw_dino();
        draw_fg();

        // moves the bg and fg
        bg_pos = bg_pos.map((num) => {
            return num += 2;
        });
        // add the parallax effect
        parallax_offsets = parallax_offsets.map((num, i) => {
            return num + parallax_values[i];
        });
        // check each layer independenly if time to reset
        for(let i = 0; i < bg_pos.length; i++) {
            if((bg_pos[i] + parallax_offsets[i]) > (size * 32)) {
                bg_pos[i] = 0;
                parallax_offsets[i] = 0;
            }
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
function draw_bg() {
    // background gradient does not need to parallax
    image(bg_layers[5], 0, 0, size * 32, size * 9);
    // move the layers behind dino with bg_pos offset and parallax offset for parallax effect
    for(let i = 4; i > 0; i--) {
        image(bg_layers[i], 0 - bg_pos[i] - parallax_offsets[i], 0, size * 32, size * 9);
        image(bg_layers[i], 0 + (size * 32) - bg_pos[i] - parallax_offsets[i], 0, size * 32, size * 9);
    }
}
// draws the foreground (in front of dino)
function draw_fg() {
    image(bg_layers[0], 0 - bg_pos[0] - parallax_offsets[0], 0, size * 32, size * 9);
    image(bg_layers[0], 0 + (size * 32) - bg_pos[0] - parallax_offsets[0], 0, size * 32, size * 9);
}
// draws dino
function draw_dino() {
    if(dino_jumped) {   // jump was triggered
        if(dino_jump_height >= 150) {
            dino_jumped = false;
        }
        else {
            dino_jump_height += 10; // increase dino height
        }
    }
    if(!dino_jumped) {    // reached jump height or has not jumped yet
        if(dino_jump_height <= 0) {
            dino_jump_height = 0;
        }
        else {
            dino_jump_height -= 4;
        }
    }

    image(dino[dino_sprite], dino_position.x, dino_position.y - dino_jump_height, 100, 100);
    // increase sprite every slow_dino amount of frames
    if(!dino_jumped && dino_jump_height === 0) {
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
    else {

    }
}
// handles space bar for jumping
function keyPressed() {
    if(keyCode === 32) {
        if(!game_start) {
            game_start = true;
            return;
        }
        if(!dino_jumped && dino_jump_height === 0) {
            dino_jumped = true;
        }
    }
}