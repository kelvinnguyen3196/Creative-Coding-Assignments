class List {
    // private class variables
    #head;
    #tail;
    #size;
    constructor() {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    push_end(node) {
        if(this.#head === null) {
            this.#head = node;
            this.#tail = node;
        }
        else {  // if this.head !== null
            this.#tail.next = node;
            this.#tail = node;
        }
        this.#size += 1;
    }

    remove_first() {
        if(this.#head !== null) {
            this.#head = this.#head.next;
        }
        if(this.#size !== 0) {
            this.#size -= 1;
        }
    }

    print() {
        let current = this.#head;
        while(current != null) {
            console.log(`(${current.x}, ${current.y}) -> `);
            current = current.next;
        }
    }

    get head_node() {
        return this.#head;
    }
    
    get list_size() {
        return this.#size;
    }
}