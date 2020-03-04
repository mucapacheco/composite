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
    const model = new RegistrarBoletoModel_1.default();
    try {
        const registrarBoleto = new RegistrarBoleto_1.default();
        registrarBoleto.addProcess((bag) => (new ValidarEntradaDeDados_1.default()).validar(bag));
        registrarBoleto.addProcess((bag) => (new BuscarDadosDoRepositorio_1.default()).buscar(bag));
        registrarBoleto.addProcess((bag) => (new RegistrarNoBanco_1.default()).registrar(bag));
        registrarBoleto.addProcess((bag) => (new EnviarBoletoParaOUsuario_1.default()).enviar(bag));
        registrarBoleto.execute(model);
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
