"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DecisionRun_1 = require("../DecisionRun");
class RegistrarBoleto extends DecisionRun_1.default {
    run(bag) {
        bag.log.push(this.constructor.name);
        let ser = "itau";
        if (Math.round(Math.random() * 10) % 2) {
            ser = "santander";
        }
        let children = this.children[ser];
        bag.log.push(ser);
        children.forEach((item) => item.run(bag));
    }
}
exports.default = RegistrarBoleto;
