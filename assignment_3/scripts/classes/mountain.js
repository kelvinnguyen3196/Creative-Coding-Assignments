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

    constructor(min_height, max_height, noise_offset, speed, bumpy, color, motion) {
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
    }

    draw() {
        stroke(this.#color);
        fill(this.#color);

        beginShape();

        this.#x_offset = this.#start;

        vertex(this.#first_point.x, this.#first_point.y);
        for(let i = 0; i < width + 100; i += this.#speed) {
            let noisy_y = noise(this.#x_offset + this.#noise_offset) * height;
            let mapped_y = map(noisy_y, 0, height, this.#min_height, this.#max_height);
            vertex(i, mapped_y);
            this.#x_offset += this.#bumpy;
        }
        vertex(width, height);
        endShape();

        if(this.#motion) {
            this.#start += this.#bumpy;
        }
        else {
            this.#start += 0;
        }
    }

    initialize_vertex_list() {
        for(let i = 0; i < width + 100; i += this.#speed) {
            let noisy_y = noise(this.#x_offset + this.#noise_offset) * height;
            let mapped_y = map(noisy_y, 0, height, this.#min_height, this.#max_height);
            this.#vertex_list.push_end(new Node(i, mapped_y));
            this.#x_offset += this.#bumpy;
        }
    }

    new_draw() {
        // calculate new point at end
        if(this.#motion) {
            let noisy_y = noise(this.#x_offset + this.#noise_offset) * height;
            let mapped_y = map(noisy_y, 0, height, this.#min_height, this.#max_height);
            this.#vertex_list.push_end(new Node(0 , mapped_y));
            this.#vertex_list.remove_first();
        }

        stroke(this.#color);
        fill(this.#color);

        beginShape();

        this.#x_offset = this.#start;

        vertex(this.#first_point.x, this.#first_point.y);
        
        let current = this.#vertex_list.head_node;
        let canvas_x = 0;
        while(current !== null) {
            vertex(canvas_x, current.y);
            current = current.next;
            canvas_x += 1;
        }

        vertex(width, height);
        endShape();

        if(this.#motion) {
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