class Mountain {
    #start;
    #x_offset;
    #first_point;
    #min_height;
    #max_height;
    #noise_offset;
    #speed;
    #bumpy;
    #color;
    #motion;
    #vertex_list;
    #node_skip;

    constructor(min_height, max_height, noise_offset, speed, bumpy, color, motion, node_skip) {
        this.#start = 0;
        this.#x_offset = 0;
        this.#first_point = createVector(0, height * 100);
        this.#min_height = min_height;
        this.#max_height = max_height;
        this.#noise_offset = noise_offset;
        this.#speed = speed;
        this.#bumpy = bumpy;
        this.#color = color;
        this.#motion = motion;
        this.#vertex_list = new List();
        this.#node_skip = node_skip;
    }

    initialize_vertex_list() {
        for (let i = 0; i < width + 100; i += this.#speed) {
            let noisy_y = noise(this.#x_offset + this.#noise_offset) * height;
            let mapped_y = map(noisy_y, 0, height, this.#min_height, this.#max_height);
            this.#vertex_list.push_end(new Node(i, mapped_y));
            this.#x_offset += this.#bumpy;
        }
    }

    draw() {
        // calculate new point at end
        if (this.#motion) {
            let noisy_y = noise(this.#x_offset + this.#noise_offset) * height;
            let mapped_y = map(noisy_y, 0, height, this.#min_height, this.#max_height);
            this.#vertex_list.push_end(new Node(0, mapped_y));
            this.#vertex_list.remove_first();
        }

        stroke(this.#color);
        fill(this.#color);

        beginShape();

        this.#x_offset = this.#start;

        vertex(this.#first_point.x, this.#first_point.y);

        let current = this.#vertex_list.head_node;
        let canvas_x = 0;
        while (current !== null && canvas_x <= width) {
            vertex(canvas_x, current.y);
            current = current.next;
            if (current !== null) {      // TODO: is skipping necessary??
                current = current.next;
            }
            canvas_x += 1;
        }

        vertex(width, height);
        endShape();

        if (this.#motion) {
            this.#start += this.#bumpy;
        }
        else {
            this.#start += 0;
        }
    }

    // NOT MY FUNCTION
    // Needed to add alpha to hex
    // source: https://gist.github.com/bcardiff/3b39ba8e2d00fed68435
    colorAlpha(aColor, alpha) {
        var c = color(aColor);
        return color('rgba(' + [red(c), green(c), blue(c), alpha].join(',') + ')');
    }

    draw_alpha(alpha) {
        // calculate new point at end
        if (this.#motion) {
            let noisy_y = noise(this.#x_offset + this.#noise_offset) * height;
            let mapped_y = map(noisy_y, 0, height, this.#min_height, this.#max_height);
            this.#vertex_list.push_end(new Node(0, mapped_y));
            this.#vertex_list.remove_first();
        }

        noStroke();
        fill(this.colorAlpha(this.#color, alpha));

        beginShape();

        this.#x_offset = this.#start;

        vertex(this.#first_point.x, this.#first_point.y);

        let current = this.#vertex_list.head_node;
        let canvas_x = 0;
        while (current !== null && canvas_x <= width) {
            vertex(canvas_x, current.y);
            current = current.next;
            if (current !== null) {      // TODO: is skipping necessary??
                current = current.next;
            }
            canvas_x += 1;
        }

        vertex(width, height);
        endShape();

        if (this.#motion) {
            this.#start += this.#bumpy;
        }
        else {
            this.#start += 0;
        }
    }

    set motion_value(motion) {
        this.#motion = motion;
    }
}