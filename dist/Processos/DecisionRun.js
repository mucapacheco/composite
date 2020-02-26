"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DecisionRun {
    constructor(children = {}) {
        this.children = {};
        this.children = children;
    }
    getChildren() {
        return this.children;
    }
    run(bag) {
        bag["log"].process();
        let array = Object.keys(this.children);
        const randomElement = array[Math.floor(Math.random() * array.length)];
        let children = this.children[randomElement];
        bag["log"].process(randomElement);
        children.forEach((item) => item.run(bag));
    }
}
exports.default = DecisionRun;
