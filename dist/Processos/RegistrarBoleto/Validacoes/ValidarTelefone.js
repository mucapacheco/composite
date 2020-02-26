"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Run_1 = require("../../Run");
class ValidarTelefone extends Run_1.default {
    run(bag) {
        if (Math.random() * 10 > 5) {
            bag.log.push("Telefone inválido");
            throw new Error('Telefone inválido');
        }
        super.run(bag);
    }
}
exports.default = ValidarTelefone;
