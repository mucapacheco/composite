"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Run_1 = require("../../Run");
class ValidarEmail extends Run_1.default {
    run(bag) {
        bag.log.push("Email: mucapacheco@hotmail.com");
        super.run(bag);
    }
}
exports.default = ValidarEmail;
