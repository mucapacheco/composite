"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const RegistrarBoletoModel_1 = require("./Processos/RegistrarBoleto/bag/RegistrarBoletoModel");
const RegistrarBoleto_1 = require("./Processos/Pipeline/RegistrarBoleto");
const ValidarEntradaDeDados_1 = require("./Processos/Pipeline/ValidarEntradaDeDados");
const BuscarDadosDoRepositorio_1 = require("./Processos/Pipeline/BuscarDadosDoRepositorio");
const RegistrarNoBanco_1 = require("./Processos/Pipeline/RegistrarNoBanco");
const EnviarBoletoParaOUsuario_1 = require("./Processos/Pipeline/EnviarBoletoParaOUsuario");
const server = restify.createServer({
    name: 'RegistrarBanco',
    version: '1.0',
});
server.get('/', (request, response, next) => {
    const boletoModel = new RegistrarBoletoModel_1.default();
    const registrarBoleto = new RegistrarBoleto_1.default();
    registrarBoleto.add(model => (new ValidarEntradaDeDados_1.default()).validar(model));
    registrarBoleto.add(model => (new BuscarDadosDoRepositorio_1.default()).buscar(model));
    registrarBoleto.add(model => (new RegistrarNoBanco_1.default()).registrar(model));
    registrarBoleto.add(model => (new EnviarBoletoParaOUsuario_1.default()).enviar(model));
    registrarBoleto.registrar(boletoModel);
    response.json(model);
    return next;
});
server.use(function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
});
server.listen(4200);
