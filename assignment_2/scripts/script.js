// TODO: list of features to implement
    // TODO: timer to stop cacti from spawning too often
    // TODO: timer to stop cacti from spawning too infrequently
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
let dino_size;
let dino_position;                          // stores dino position
let dino_sprite = 0;                        // displays dino from index of dino[]
let slow_dino = 4;                          // slows dino sprite change; larger = slower    
let current_dino = 0;                       // used for slowing dino
let dino_jump_height = 0;                   // dino jump height
let dino_jumped = false;                    // checks if dino has jumped

let cacti = [];                             // stores all different kinds of cacti
let active_cacti = [];                      // shift old cacti and push new cacti
let cacti_aspect_ratio = [];
let cacti_img_scale = 0.1;                  // multiply with cacti_aspect_ratio for size
let cacti_spawn_chance = 1;                 // percent chance for cacti to spawn
let cacti_spawn_range = 200;                // spawn_chance / cacti_spawn_range = true spawn chance

let size = 25;                              // scales the canvas and elements

let game_start = false;
let game_over = false;                      // true on collision
let start_score;                            // keeps track of when game start
let end_score;                              // filled when collision

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
    // loading cacti sprites
    for(let i = 0; i < 5; i++) {
        let img = loadImage(`assets/Cacti/cactus${i + 1}.png`);
        cacti.push(img);
    }
    // aspect ratio for cacti
    cacti_aspect_ratio = [
        createVector(241, 598),
        createVector(298, 581),
        createVector(325, 707),
        createVector(211, 529),
        createVector(411, 772)
    ];
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
    dino_size = createVector(100, 100);
}

function draw() {
    translate(-width / 2, -height / 2);
    if(!game_start) {   // start menu
        draw_start();
    }
    else {  // game loop
        collision_check();
        draw_bg();
        draw_dino();
        draw_cacti();
        draw_fg();
        spawn_cacti();
        purge_old_cacti();
        draw_score();
        draw_end();
        // moves the bg and fg
        bg_pos = bg_pos.map((num) => {
            if(!game_over) {
                return num += 2;
            }
            else {
                return num;
            }
        });
        // add the parallax effect
        parallax_offsets = parallax_offsets.map((num, i) => {
            if(!game_over) {
                return num + parallax_values[i];
            }
            else {
                return num;
            }
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
            dino_jump_height -= 5;
        }
    }

    image(dino[dino_sprite], dino_position.x, dino_position.y - dino_jump_height, dino_size.x, dino_size.y);
    // increase sprite every slow_dino amount of frames
    if(!dino_jumped && dino_jump_height === 0) {
        if(current_dino === slow_dino) {
            dino_sprite++;
            dino_sprite %= 8;   // keeps 0 <= dino_sprite <= 7
            current_dino = 0;
        }
        else {  // increment current_dino
            if(!game_over) {
                current_dino++;
            }
            current_dino %= slow_dino + 1;
        }
    }
    else {

    }
}
// spawn cacti randomly
function spawn_cacti() {
    let cacti_pull = Math.floor(Math.random() * cacti_spawn_range);
    let cacti_sprite = Math.floor(Math.random() * 5);
    
    if(cacti_pull <= cacti_spawn_chance) {
        let new_cacti = {sprite: cacti_sprite, coordinates: createVector(width, dino_position.y)};
        active_cacti.push(new_cacti);
    }
}
// draw cacti
function draw_cacti() {
    for(let i = 0; i < active_cacti.length; i++) {
        let c_sprite = cacti[active_cacti[i].sprite];
        if(!game_over) {
            active_cacti[i].coordinates.x -= 7; // hardcoded eyeball value to match pace of bg
        }
        let cactus_aspect_x = cacti_aspect_ratio[active_cacti[i].sprite].x;
        let cactus_aspect_y = cacti_aspect_ratio[active_cacti[i].sprite].y;
        image(c_sprite, active_cacti[i].coordinates.x, dino_position.y + 25, cacti_img_scale * cactus_aspect_x, cacti_img_scale * cactus_aspect_y);
    }
} 
// removes old cacti that are off screen
function purge_old_cacti() {    // checks and removes oldest cactus i.e. first element
    if(active_cacti.length > 0) {
        if(active_cacti[0].coordinates.x <= -120) {  // leave some room for it to full disappear from screen
            active_cacti.shift();
        }
    }
}
// checks for collision
function collision_check() {
    let x_collision = false;
    let y_collision = false;

    for(let i = 0; i < active_cacti.length; i++) {
        // check x
        let curr_cac_x_len = cacti_aspect_ratio[active_cacti[i].sprite].x * cacti_img_scale;
        if(active_cacti[i].coordinates.x <= dino_position.x && (active_cacti[i].coordinates.x + curr_cac_x_len) >= dino_position.x) {
            x_collision = true;
        }

        if((dino_position.y + dino_size.y - dino_jump_height) >= active_cacti[i].coordinates.y && active_cacti[i].coordinates.y <= (dino_position.y - dino_jump_height)) {
            y_collision = true;
        }
        if(y_collision && x_collision) {    // more efficient to check y before x
            game_over = true;
        }
        //console.log(`${dino_position.y + dino_size.y - dino_jump_height} <= ${active_cacti[i].coordinates.y} <= ${(dino_position.y - dino_jump_height)}`);
    }
}
// draws score
function draw_score() {
    let time_now = new Date();

    if(game_over && end_score === undefined) {
        end_score = time_now;
    }
    fill('black');
    if(!game_over) {
        text(Math.floor((time_now - start_score) / 10), 100, 50);
    }
}
// draws end screen
function draw_end() {
    if(game_over) {
        translate(width / 2, height / 2);
        colorMode(RGB, 255);
        noStroke();
        rectMode(CENTER);
        fill(255, 224, 138, 200);
        rect(0, 0, width * 0.8, height * 0.8);
        
        textSize(40);
        fill('#525252');
        text('GAME OVER', 0, 0);
        textSize(20);
        text('Score: ' + Math.floor((end_score - start_score) / 10), 0, 50);
    }
}
// handles space bar for jumping
function keyPressed() {
    if(keyCode === 32) {
        if(!game_start) {
            game_start = true;
            start_score = new Date();
            return;
        }
        if(!dino_jumped && dino_jump_height <= 10 && !game_over) {    // <= 10 allows for slightly earlier jumping for smoother gameplay
            dino_jumped = true;
        }
    }
    // easter eggs to load specific dino
    if(keyCode === 66) {    // loads blue dino
        dino = dino.map((num, idx) => {
            return loadImage(`assets/Dino/${dino_asset_base[0]}_dino/dino${idx + 1}.png`);
        });
        game_start = true;
        return;
    }
    if(keyCode === 71) {    // loads green dino
        dino = dino.map((num, idx) => {
            return loadImage(`assets/Dino/${dino_asset_base[1]}_dino/dino${idx + 1}.png`);
        });
        game_start = true;
        return;
    }
    if(keyCode === 79) {    // loads orange dino
        dino = dino.map((num, idx) => {
            return loadImage(`assets/Dino/${dino_asset_base[2]}_dino/dino${idx + 1}.png`);
        });
        game_start = true;
        return;
    }
    if(keyCode === 80) {    // loads purple dino
        dino = dino.map((num, idx) => {
            return loadImage(`assets/Dino/${dino_asset_base[3]}_dino/dino${idx + 1}.png`);
        });
        game_start = true;
        return;
    }
    if(keyCode === 82) {    // loads red dino
        dino = dino.map((num, idx) => {
            return loadImage(`assets/Dino/${dino_asset_base[4]}_dino/dino${idx + 1}.png`);
        });
        game_start = true;
        return;
    }
    if(keyCode === 89) {    // loads yellow dino
        dino = dino.map((num, idx) => {
            return loadImage(`assets/Dino/${dino_asset_base[5]}_dino/dino${idx + 1}.png`);
        });
        game_start = true;
        return;
    }
}