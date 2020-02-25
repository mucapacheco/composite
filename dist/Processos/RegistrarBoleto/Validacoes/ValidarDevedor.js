"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Run_1 = require("../../Run");
class ValidarDevedor extends Run_1.default {
    run(bag) {
        bag.log.push("O devedor é uma pessoa jurídica");
        super.run(bag);
    }
}
exports.default = ValidarDevedor;
