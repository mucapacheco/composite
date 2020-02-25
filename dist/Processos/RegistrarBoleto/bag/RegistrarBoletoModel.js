"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogRegistrarBoleto_1 = require("../../Log/LogRegistrarBoleto");
class RegistrarBoletoModel {
    constructor() {
        this.request = {};
        this.log = new LogRegistrarBoleto_1.default();
    }
}
exports.default = RegistrarBoletoModel;
