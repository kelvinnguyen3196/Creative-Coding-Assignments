class Colors {
    #color_count;
    #colors;
    #extra_palette; // contains two back mountains and extra color

    constructor(color_count) {
        this.#color_count = color_count;
        this.#colors = new Array(this.#color_count);
        this.#extra_palette = new Array(3);
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
        let hue_rand = Math.floor(Math.random() * 361);         // 0 - 360
        let sat_rand = Math.floor(Math.random() * 11) + 70;     // 70 - 80
        let light_rand = Math.floor(Math.random() * 11) + 30;   // 30 - 40
        // for color palette
        let lighter = this.convert_hsl_to_hex(hue_rand - 10, sat_rand - 20, light_rand + 20);
        let orig = this.convert_hsl_to_hex(hue_rand, sat_rand, light_rand);
        let dark1 = this.convert_hsl_to_hex(hue_rand + 10, sat_rand + 10, light_rand - 15);
        let dark2 = this.convert_hsl_to_hex(hue_rand + 20, sat_rand + 10, light_rand - 30);
        this.#colors[0] = lighter;
        this.#colors[1] = orig;
        this.#colors[2] = dark1;
        this.#colors[3] = dark2;
        // for extra color palette
        let lighter1 = this.convert_hsl_to_hex(hue_rand - 20, sat_rand - 30, light_rand + 30);
        let lighter2 = this.convert_hsl_to_hex(hue_rand - 30, sat_rand - 40, light_rand + 40);
        this.#extra_palette[0] = lighter1;
        this.#extra_palette[1] = lighter2;
        // for extra contrast color
        let contrast_hue_rand = Math.floor(Math.random() * 361);         // 0 - 360
        let contrast_sat_rand = Math.floor(Math.random() * 11) + 70;     // 70 - 80
        let contrast_light_rand = Math.floor(Math.random() * 11) + 30;   // 30 - 40
        this.#extra_palette[2] = this.convert_hsl_to_hex(contrast_hue_rand, contrast_sat_rand, contrast_light_rand);
    }

    regenerate_color_palette() {
        let hue_rand = Math.floor(Math.random() * 361);         // 0 - 360
        let sat_rand = Math.floor(Math.random() * 11) + 70;     // 70 - 80
        let light_rand = Math.floor(Math.random() * 11) + 30;   // 30 - 40
        // for color palette
        let lighter = this.convert_hsl_to_hex(hue_rand - 10, sat_rand - 20, light_rand + 20);
        let orig = this.convert_hsl_to_hex(hue_rand, sat_rand, light_rand);
        let dark1 = this.convert_hsl_to_hex(hue_rand + 10, sat_rand + 10, light_rand - 15);
        let dark2 = this.convert_hsl_to_hex(hue_rand + 20, sat_rand + 10, light_rand - 30);
        this.#colors[0] = lighter;
        this.#colors[1] = orig;
        this.#colors[2] = dark1;
        this.#colors[3] = dark2;
        // for extra color palette
        let lighter1 = this.convert_hsl_to_hex(hue_rand - 20, sat_rand - 30, light_rand + 30);
        let lighter2 = this.convert_hsl_to_hex(hue_rand - 30, sat_rand - 40, light_rand + 40);
        this.#extra_palette[0] = lighter1;
        this.#extra_palette[1] = lighter2;
    }

    regenerate_contrast_color() {
        // for extra contrast color
        let contrast_hue_rand = Math.floor(Math.random() * 361);         // 0 - 360
        let contrast_sat_rand = Math.floor(Math.random() * 11) + 70;     // 70 - 80
        let contrast_light_rand = Math.floor(Math.random() * 11) + 30;   // 30 - 40
        this.#extra_palette[2] = this.convert_hsl_to_hex(contrast_hue_rand, contrast_sat_rand, contrast_light_rand);
    }

    get color_palette() {
        return this.#colors;
    }

    get extra_color_palette() {
        return this.#extra_palette;
    }
}