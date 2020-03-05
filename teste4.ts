import * as restify from "restify";
import RegistrarBoletoModel from "./Processos/RegistrarBoleto/bag/RegistrarBoletoModel";
import RegistrarBoleto from "./Processos/CompositeClass/RegistrarBoleto";
import ValidarEntradaDeDados from "./Processos/CompositeClass/ValidarEntradaDeDados";
import BuscarDadosDoRepositorio from "./Processos/CompositeClass/BuscarDadosDoRepositorio";
import RegistrarNoBanco from "./Processos/CompositeClass/RegistrarNoBanco";
import EnviarBoletoParaOUsuario from "./Processos/CompositeClass/EnviarBoletoParaOUsuario";
import BuscarContaAReceber from "./Processos/CompositeClass/BuscarContaAReceber";
import BuscarDadosBasicos from "./Processos/CompositeClass/BuscarDadosBasicos";
import BuscarEndereco from "./Processos/CompositeClass/BuscarEndereco";
import BuscarDocumentos from "./Processos/CompositeClass/BuscarDocumentos";
import RegistrarNoBancoDecisao from "./Processos/CompositeClass/RegistrarNoBancoDecisao";
import LoginNoItau from "./Processos/CompositeClass/LoginNoItau";
import BuscarIdentificador from "./Processos/CompositeClass/BuscarIdentificador";
import RegistrarNoItau from "./Processos/CompositeClass/RegistrarNoItau";
import LoginNoSantander from "./Processos/CompositeClass/LoginNoSantander";
import RegistrarNoSantander from "./Processos/CompositeClass/RegistrarNoSantander";
import PessoaFisicaSantander from "./Processos/CompositeClass/PessoaFisicaSantander";
import PessoaJuridicaSantander from "./Processos/CompositeClass/PessoaJuridicaSantander";



const server = restify.createServer({
    name:'RegistrarBanco',
    version:'1.0',
});


server.get('/',(request,response,next)=>{



    const boletoModel = new RegistrarBoletoModel();
    {
        const registrarBoleto = new RegistrarBoleto([
            new ValidarEntradaDeDados(),
            new BuscarDadosDoRepositorio([
                new BuscarContaAReceber(),
                new BuscarDadosBasicos(),
                new BuscarEndereco(),
                new BuscarDocumentos(),
            ]),
            new RegistrarNoBancoDecisao({
                itau: [
                    new LoginNoItau(),
                    new BuscarIdentificador(),
                    new RegistrarNoItau(),
                ],
                santander: [
                    new LoginNoSantander(),
                    new RegistrarNoSantander({
                        pessoaFisica: [new PessoaFisicaSantander()],
                        pessoaJurica: [new PessoaJuridicaSantander()]
                    }),
                ]
            }),
            new EnviarBoletoParaOUsuario(),
        ]);
        registrarBoleto.execute(boletoModel);
    }






    response.json(boletoModel);
    return next;
});
server.use(
    function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        return next();
    }
)
server.listen(4200);
