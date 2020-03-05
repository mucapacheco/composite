"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegistrarBoleto {
    constructor(process = []) {
        this.process = [];
        this.process = process;
    }
    execute(model) {
        this.process.forEach((process) => process.execute(model));
    }
    add(process) {
        this.process.push(process);
    }
}
exports.default = RegistrarBoleto;
