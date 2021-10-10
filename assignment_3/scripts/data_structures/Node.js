class Node {
    // both node and list are implemented and I am little lazy to make these
    // class properties private (though it should be!)
    constructor(x, y, r = 0) {
        this.x = x;
        this.y = y;
        this.next = null;
        this.r = r;
    }
}