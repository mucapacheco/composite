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
const ValidarDados_1 = require("./Processos/RegistrarBoleto/Validacoes/ValidarDados");
const ValidarDevedor_1 = require("./Processos/RegistrarBoleto/Validacoes/ValidarDevedor");
const ValidarEndereco_1 = require("./Processos/RegistrarBoleto/Validacoes/ValidarEndereco");
const ValidarEmail_1 = require("./Processos/RegistrarBoleto/Validacoes/ValidarEmail");
const ValidarTelefone_1 = require("./Processos/RegistrarBoleto/Validacoes/ValidarTelefone");
const EnviarBoletoPorEmail_1 = require("./Processos/RegistrarBoleto/EnviarBoletoPorEmail");
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
        new ValidarDados_1.default([
            new ValidarDevedor_1.default(),
            new ValidarEndereco_1.default(),
            new ValidarTelefone_1.default(),
            new ValidarEmail_1.default(),
        ]),
        new RegistrarBoleto_1.default({
            Itau: [
                new Login_1.default(),
                new BuscarIndentificadorUnico_1.default(),
                new Registrar_2.default(),
            ],
            Santander: [
                new Login_2.default(),
                new Registrar_1.default({
                    PessoaFisica: [
                        new PessoaFisica_1.default()
                    ],
                    PessoaJuridica: [
                        new PessoaJuridica_1.default()
                    ],
                }),
            ],
        }),
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
