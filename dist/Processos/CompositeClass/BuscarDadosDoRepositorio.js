"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BuscarDadosDoRepositorio {
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
exports.default = BuscarDadosDoRepositorio;
