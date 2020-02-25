import * as restify from "restify";
import Run from "./Processos/Run";
import RegistrarBoletoModel from "./Processos/RegistrarBoleto/bag/RegistrarBoletoModel";
import TratarRequest from "./Processos/RegistrarBoleto/TratarRequest";
import BuscaDoBanco from "./Processos/RegistrarBoleto/BuscaDoBanco";
import BuscaEndereco from "./Processos/RegistrarBoleto/BuscaEndereco";
import BuscaDadosBasicos from "./Processos/RegistrarBoleto/BuscaDadosBasicos";
import BuscaDevedor from "./Processos/RegistrarBoleto/BuscaDevedor";
import BuscaTelefone from "./Processos/RegistrarBoleto/BuscaTelefone";
import RegistrarBoleto from "./Processos/RegistrarBoleto/RegistrarBoleto";
import LoginItau from "./Processos/RegistrarBoleto/Api/Itau/Login";
import BuscarIndentificadorUnicoItau from "./Processos/RegistrarBoleto/Api/Itau/BuscarIndentificadorUnico";
import LoginSantander from "./Processos/RegistrarBoleto/Api/Santander/Login";
import RegistrarSantander from "./Processos/RegistrarBoleto/Api/Santander/Registrar";
import ExtractTree from "./Processos/ExtractTree";
import PessoaFisicaSantander from "./Processos/RegistrarBoleto/Api/Santander/Registrar/PessoaFisica";
import PessoaJuridicaSantander from "./Processos/RegistrarBoleto/Api/Santander/Registrar/PessoaJuridica";
import RegistrarItau from "./Processos/RegistrarBoleto/Api/Itau/Registrar";
import RegistrarBoletoService from "./Processos/RegistrarBoletoService";
const server = restify.createServer({
    name:'RegistrarBanco',
    version:'1.0',
});


server.get('/',(request,response,next)=>{
    const model = new RegistrarBoletoModel();
    const registrarNoBanco = new RegistrarBoletoService([
        new TratarRequest(),
        new BuscaDoBanco([
            new BuscaDevedor(),
            new BuscaDadosBasicos([
                    new BuscaEndereco(),
                    new BuscaTelefone()
                ]
            )
        ]),
        new RegistrarBoleto({
            itau:[
                new LoginItau(),
                new BuscarIndentificadorUnicoItau(),
                new RegistrarItau(),
            ],
            santander:[
                new LoginSantander(),
                new RegistrarSantander({
                    pessoafisica:[
                        new PessoaFisicaSantander()
                    ],
                    pessoajuridica:[
                        new PessoaJuridicaSantander()
                    ],
                }),
            ],
        })
    ]);

    let result = {
        estrutura: ExtractTree.get(registrarNoBanco),
        log: model.log
    };

    registrarNoBanco.run(model);

    response.json(result);
    return next;
});
server.use(
    function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
)
server.listen(3000);