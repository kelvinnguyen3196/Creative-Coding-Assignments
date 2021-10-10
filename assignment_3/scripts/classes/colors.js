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

    // NOT MY FUNCTION
    // from: https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
    // by icl7126
    convert_hsl_to_hex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    generate_colors() {
        let lighter = this.convert_hsl_to_hex(247, 61, 79);
        let orig = this.convert_hsl_to_hex(257, 70, 70);
        let dark1 = this.convert_hsl_to_hex(267, 70, 43);
        let dark2 = this.convert_hsl_to_hex(273, 78, 26);

        this.#colors[0] = lighter;
        this.#colors[1] = orig;
        this.#colors[2] = dark1;
        this.#colors[3] = dark2;
    }

    get color_palette() {
        return this.#colors;
    }
}