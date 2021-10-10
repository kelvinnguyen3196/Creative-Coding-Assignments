class DEV_Horizontal_Line {
    #y;
    constructor(y) {
        this.#y = y;
    }

    draw() {
        beginShape();
        noFill();
        stroke(255);
        strokeWeight(2);
        for(let i = 0; i < width; i++) {
            point(i, this.#y);
        }
        endShape();
    }
}