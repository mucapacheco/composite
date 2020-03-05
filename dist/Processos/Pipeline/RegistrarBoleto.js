"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegistrarBoleto {
    constructor() {
        this.process = [];
    }
    registrar(model) {
        this.process.forEach((process) => process(model));
    }
    add(process) {
        this.process.push(process);
    }
}
exports.default = RegistrarBoleto;
