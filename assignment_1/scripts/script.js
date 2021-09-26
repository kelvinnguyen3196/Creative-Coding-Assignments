let color;  // color of the ball
let position;  // position of the ball
let velocity;  // velocity of the ball
let bounced = false;
let color_index = 0;

function setup() {
    createCanvas(400, 400);
    position = createVector(100, 100);
    velocity = createVector(2, 3);

    color = ['#55FEFE', '#F78303', '#2227FF', '#F52602', '#F5038C', '#BE01FF'];
    fill(color[color_index]);
}

function draw() {
    background(0);
    circle(position.x, position.y, 100);

    position.x += velocity.x;
    position.y += velocity.y;

    if (position.x >= 400 || position.x <= 0) {
        velocity.x = -velocity.x;
        bounced = true;
    }
    if (position.y >= 400 || position.y <= 0) {
        velocity.y = -velocity.y;
        bounced = true;
    }

    if (bounced) {
        bounced = false;
        color_index += 1;
        color_index %= 6;
        fill(color[color_index]);
    }
}