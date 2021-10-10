class Star {
    #x;
    #y;
    #r;

    constructor(x, y, r) {
        this.#x = x;
        this.#y = y;
        this.#r = r;
    }

    draw() {
        fill(255);
        stroke(255);
        circle(this.#x, this.#y, this.#r);
    }

    get x_val() {
        return this.#x;
    }

    get y_val() {
        return this.#y;
    }

    get r_val() {
        return this.#r;
    }

    set s_r_val(r) {
        this.#r = r;
    }
}
