"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const RegistrarBoletoModel_1 = require("./Processos/RegistrarBoleto/bag/RegistrarBoletoModel");
const RegistrarBoleto_1 = require("./Processos/CompositeClass/RegistrarBoleto");
const ValidarEntradaDeDados_1 = require("./Processos/CompositeClass/ValidarEntradaDeDados");
const BuscarDadosDoRepositorio_1 = require("./Processos/CompositeClass/BuscarDadosDoRepositorio");
const RegistrarNoBanco_1 = require("./Processos/CompositeClass/RegistrarNoBanco");
const EnviarBoletoParaOUsuario_1 = require("./Processos/CompositeClass/EnviarBoletoParaOUsuario");
const BuscarContaAReceber_1 = require("./Processos/CompositeClass/BuscarContaAReceber");
const BuscarDadosBasicos_1 = require("./Processos/CompositeClass/BuscarDadosBasicos");
const BuscarEndereco_1 = require("./Processos/CompositeClass/BuscarEndereco");
const BuscarDocumentos_1 = require("./Processos/CompositeClass/BuscarDocumentos");
const server = restify.createServer({
    name: 'RegistrarBanco',
    version: '1.0',
});
server.get('/', (request, response, next) => {
    const boletoModel = new RegistrarBoletoModel_1.default();
    {
        const registrarBoleto = new RegistrarBoleto_1.default([
            new ValidarEntradaDeDados_1.default(),
            new BuscarDadosDoRepositorio_1.default([
                new BuscarContaAReceber_1.default(),
                new BuscarDadosBasicos_1.default(),
                new BuscarEndereco_1.default(),
                new BuscarDocumentos_1.default(),
            ]),
            new RegistrarNoBanco_1.default(),
            new EnviarBoletoParaOUsuario_1.default(),
        ]);
        registrarBoleto.execute(boletoModel);
    }
    response.json(boletoModel);
    return next;
});
server.use(function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
});
server.listen(4200);
