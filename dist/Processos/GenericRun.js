"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Run_1 = require("./Run");
class GenericRun extends Run_1.default {
    constructor(Name, children = []) {
        super(children);
        this.name = "";
        this.name = Name;
        this.children = children;
    }
    run(bag) {
        bag["log"].process(this.name);
        this.children.forEach(run => run.run(bag));
    }
}
exports.default = GenericRun;
