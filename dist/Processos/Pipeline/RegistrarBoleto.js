"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegistrarBoleto {
    constructor() {
        this.process = [];
    }
    execute(bag) {
        this.process.forEach((process) => process());
    }
    addProcess(processo) {
        this.process.push(processo);
    }
}
exports.default = RegistrarBoleto;
