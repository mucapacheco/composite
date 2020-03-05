"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const RegistrarBoletoModel_1 = require("./Processos/RegistrarBoleto/bag/RegistrarBoletoModel");
const RegistrarBoleto_1 = require("./Processos/PipelineClass/RegistrarBoleto");
const ValidarEntradaDeDados_1 = require("./Processos/PipelineClass/ValidarEntradaDeDados");
const BuscarDadosDoRepositorio_1 = require("./Processos/PipelineClass/BuscarDadosDoRepositorio");
const RegistrarNoBanco_1 = require("./Processos/PipelineClass/RegistrarNoBanco");
const EnviarBoletoParaOUsuario_1 = require("./Processos/PipelineClass/EnviarBoletoParaOUsuario");
const server = restify.createServer({
    name: 'RegistrarBanco',
    version: '1.0',
});
server.get('/', (request, response, next) => {
    const boletoModel = new RegistrarBoletoModel_1.default();
    {
        const registrarBoleto = new RegistrarBoleto_1.default([
            new ValidarEntradaDeDados_1.default(),
            new BuscarDadosDoRepositorio_1.default(),
            new RegistrarNoBanco_1.default(),
            new EnviarBoletoParaOUsuario_1.default(),
        ]);
        registrarBoleto.execute(boletoModel);
    }
    response.json(model);
    return next;
});
server.use(function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
});
server.listen(4200);
