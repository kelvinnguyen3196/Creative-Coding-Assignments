class Colors {
    #color_count;
    #colors;

    constructor(color_count) {
        this.#color_count = color_count;
        this.#colors = new Array(this.#color_count);
    }

    convert_hex_to_rgb(r, g, b) {
        let hex = '#' + ((r << 16) + (g << 8) + b).toString(16);
        return hex;
    }

    generate_colors() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        this.#colors[0] = this.convert_hex_to_rgb(r + 20, g + 20, b + 20);
        this.#colors[1] = this.convert_hex_to_rgb(r, g, b);
        this.#colors[2] = this.convert_hex_to_rgb(r - 20, g - 20, b - 20);
        this.#colors[3] = this.convert_hex_to_rgb(r - 40, g - 40, b - 40);
        this.#colors[4] = this.convert_hex_to_rgb(r - 60, g - 60, b - 60);

        document.getElementById('color1').style.backgroundColor = this.#colors[0];
        document.getElementById('color2').style.backgroundColor = this.#colors[1];
        document.getElementById('color3').style.backgroundColor = this.#colors[2];
        document.getElementById('color4').style.backgroundColor = this.#colors[3];
        document.getElementById('color5').style.backgroundColor = this.#colors[4];
    }

    get color_palette() {
        return this.#colors;
    }
}