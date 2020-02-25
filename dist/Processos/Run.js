"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Run {
    constructor(children = []) {
        this.children = [];
        this.children = children;
    }
    run(bag) {
        bag["log"].process();
        this.children.forEach(run => run.run(bag));
    }
    getChildren() {
        return this.children;
    }
}
exports.default = Run;
