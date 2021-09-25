let bg_layers = [];         // stores bg layers
let bg_pos = 0;             // moves the bg slowly

let dino = [];              // stores dino sprites
let dino_sprite = 0;        // displays dino from index of dino[]
let slow_dino = 1;          // slows dino sprite change     
let current_dino = 0;       // used for slowing dino

let size = 25;              // scales the canvas and elements

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

}

function setup() {
    createCanvas(size * 32, size * 9, WEBGL);
}

function draw() {

}