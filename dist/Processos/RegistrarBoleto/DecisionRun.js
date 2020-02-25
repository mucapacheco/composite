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
}
exports.default = DecisionRun;
