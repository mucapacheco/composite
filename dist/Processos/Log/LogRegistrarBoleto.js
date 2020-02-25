"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogRegistrarBoleto {
    constructor() {
        this.log = {};
        this.processos = [];
    }
    push(msg) {
        let service = this.process();
        this.log[service].push(msg);
    }
    getProcessName() {
        let re = /at (.+)\.run/;
        let aRegexResult = re.exec(new Error().stack);
        return (aRegexResult && aRegexResult[1]) || 'global';
    }
    addProcess(txt) {
        this.processos.push(txt);
    }
    process(txt = null) {
        if (txt) {
            this.addProcess(txt);
            return txt;
        }
        let service = this.getProcessName();
        if (!this.log[service]) {
            this.addProcess(service);
            this.log[service] = [];
        }
        return service;
    }
}
exports.default = LogRegistrarBoleto;
