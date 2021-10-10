class Gradient {
    constructor() {

    }

    // draws from bot to top
    // y controls where it stops
    // h controls
    draw_vertical(x, y, w, h, c1, c2) {
        noFill();
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    }
}