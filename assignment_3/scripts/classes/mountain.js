class Mountain {
    #start;
    #x_offset;
    #first_point;
    #min_height;
    #max_height;
    #noise_offset;
    #bumpy;
    #speed;
    #color;

    constructor(min_height, max_height, noise_offset, bumpy, speed, color) {
        this.#start = 0;
        this.#x_offset = 0;
        this.#first_point = createVector(0, height * 100);
        this.#min_height = min_height;
        this.#max_height = max_height;
        this.#noise_offset = noise_offset;
        this.#bumpy = bumpy;
        this.#speed = speed;
        this.#color = color;
    }

    draw() {
        stroke(this.#color);
        fill(this.#color);

        beginShape();
        this.#x_offset = this.#start;
        vertex(this.#first_point.x, this.#first_point.y);
        for(let i = 0; i < width; i += this.#speed) {
            let noisy_y = noise(this.#x_offset + this.#noise_offset) * height;
            let mapped_y = map(noisy_y, 0, height, this.#min_height, this.#max_height);
            vertex(i, mapped_y);
            this.#x_offset += this.#bumpy;
        }
        vertex(width, height);
        endShape();

        this.#start += this.#bumpy;
    }
}