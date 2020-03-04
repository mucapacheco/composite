"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const RegistrarBoletoModel_1 = require("./Processos/RegistrarBoleto/bag/RegistrarBoletoModel");
const TratarRequest_1 = require("./Processos/RegistrarBoleto/TratarRequest");
const BuscaDoBanco_1 = require("./Processos/RegistrarBoleto/BuscaDoBanco");
const RegistrarBoleto_1 = require("./Processos/RegistrarBoleto/RegistrarBoleto");
const ExtractTree_1 = require("./Processos/ExtractTree");
const RegistrarBoletoService_1 = require("./Processos/RegistrarBoletoService");
const ValidarDados_1 = require("./Processos/RegistrarBoleto/Validacoes/ValidarDados");
const EnviarBoletoPorEmail_1 = require("./Processos/RegistrarBoleto/EnviarBoletoPorEmail");
const server = restify.createServer({
    name: 'RegistrarBanco',
    version: '1.0',
});
server.get('/', (request, response, next) => {
    const model = new RegistrarBoletoModel_1.default();
    const registrarNoBanco = new RegistrarBoletoService_1.default([
        new TratarRequest_1.default(),
        new BuscaDoBanco_1.default(),
        new ValidarDados_1.default(),
        new RegistrarBoleto_1.default(),
        new EnviarBoletoPorEmail_1.default()
    ]);
    let result = {
        estrutura: ExtractTree_1.default.get(registrarNoBanco),
        log: model.log,
        success: true
    };
    try {
        registrarNoBanco.run(model);
    }
    catch (e) {
        result.success = false;
    }
    response.json(result);
    return next;
});
server.use(function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
});
server.listen(4200);
