"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const RegistrarBoletoModel_1 = require("./Processos/RegistrarBoleto/bag/RegistrarBoletoModel");
const TratarRequest_1 = require("./Processos/RegistrarBoleto/TratarRequest");
const BuscaDoBanco_1 = require("./Processos/RegistrarBoleto/BuscaDoBanco");
const BuscaEndereco_1 = require("./Processos/RegistrarBoleto/BuscaEndereco");
const BuscaDadosBasicos_1 = require("./Processos/RegistrarBoleto/BuscaDadosBasicos");
const BuscaDevedor_1 = require("./Processos/RegistrarBoleto/BuscaDevedor");
const BuscaTelefone_1 = require("./Processos/RegistrarBoleto/BuscaTelefone");
const RegistrarBoleto_1 = require("./Processos/RegistrarBoleto/RegistrarBoleto");
const Login_1 = require("./Processos/RegistrarBoleto/Api/Itau/Login");
const BuscarIndentificadorUnico_1 = require("./Processos/RegistrarBoleto/Api/Itau/BuscarIndentificadorUnico");
const Login_2 = require("./Processos/RegistrarBoleto/Api/Santander/Login");
const Registrar_1 = require("./Processos/RegistrarBoleto/Api/Santander/Registrar");
const ExtractTree_1 = require("./Processos/ExtractTree");
const PessoaFisica_1 = require("./Processos/RegistrarBoleto/Api/Santander/Registrar/PessoaFisica");
const PessoaJuridica_1 = require("./Processos/RegistrarBoleto/Api/Santander/Registrar/PessoaJuridica");
const Registrar_2 = require("./Processos/RegistrarBoleto/Api/Itau/Registrar");
const RegistrarBoletoService_1 = require("./Processos/RegistrarBoletoService");
const server = restify.createServer({
    name: 'RegistrarBanco',
    version: '1.0',
});
server.get('/', (request, response, next) => {
    const model = new RegistrarBoletoModel_1.default();
    const registrarNoBanco = new RegistrarBoletoService_1.default([
        new TratarRequest_1.default(),
        new BuscaDoBanco_1.default([
            new BuscaDevedor_1.default(),
            new BuscaDadosBasicos_1.default([
                new BuscaEndereco_1.default(),
                new BuscaTelefone_1.default()
            ])
        ]),
        new RegistrarBoleto_1.default({
            itau: [
                new Login_1.default(),
                new BuscarIndentificadorUnico_1.default(),
                new Registrar_2.default(),
            ],
            santander: [
                new Login_2.default(),
                new Registrar_1.default({
                    pessoafisica: [
                        new PessoaFisica_1.default()
                    ],
                    pessoajuridica: [
                        new PessoaJuridica_1.default()
                    ],
                }),
            ],
        })
    ]);
    let result = {
        estrutura: ExtractTree_1.default.get(registrarNoBanco),
        log: model.log
    };
    registrarNoBanco.run(model);
    response.json(result);
    return next;
});
server.use(function crossOrigin(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
});
server.listen(3000);
