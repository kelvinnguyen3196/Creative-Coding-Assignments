class Moon {
    #x;
    #y;
    #opacity;
    #moon_size;

    #cx_offset; // crescent x offset
    #cy_offset; // crescent y offset
    #cs_offset; // crescent size offset

    constructor(x, y, opacity, moon_size) {
        this.#x = x;
        this.#y = y;
        this.#opacity = opacity;
        this.#moon_size = moon_size;

        this.#cx_offset = (Math.random() * 50) + this.#x - 20;
        this.#cy_offset = (Math.random() * 20) + this.#y - 25;
        let scale_percent = Math.random();
        let scale_mapped = map(scale_percent, 0, 1, 0.8, 1);
        this.#cs_offset = scale_mapped * this.#moon_size;
    }

    draw(color) {
        noStroke();
        fill(255, 255, 255, this.#opacity);
        circle(this.#x, this.#y, this.#moon_size);
        fill(color);
        let x = this.#cx_offset;
        let y = this.#cy_offset;
        let size = this.#cs_offset;
        circle(x, y, size);
    }
}
