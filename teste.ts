import * as restify from "restify";
import RegistrarBoletoModel from "./Processos/RegistrarBoleto/bag/RegistrarBoletoModel";
import RegistrarBoleto from "./Processos/Pipeline/RegistrarBoleto";
import ValidarDados from "./Processos/RegistrarBoleto/Validacoes/ValidarDados";
import ValidarEntradaDeDados from "./Processos/Pipeline/ValidarEntradaDeDados";
import BuscarDadosDoRepositorio from "./Processos/Pipeline/BuscarDadosDoRepositorio";
import RegistrarNoBanco from "./Processos/Pipeline/RegistrarNoBanco";
import EnviarBoletoParaOUsuario from "./Processos/Pipeline/EnviarBoletoParaOUsuario";


const server = restify.createServer({
    name:'RegistrarBanco',
    version:'1.0',
});


server.get('/',(request,response,next)=>{









    const boletoModel = new RegistrarBoletoModel();

    const registrarBoleto = new RegistrarBoleto();

    registrarBoleto.add(model=>(new ValidarEntradaDeDados()).validar(model));
    registrarBoleto.add(model=>(new BuscarDadosDoRepositorio()).buscar(model));
    registrarBoleto.add(model=>(new RegistrarNoBanco()).registrar(model));
    registrarBoleto.add(model=>(new EnviarBoletoParaOUsuario()).enviar(model));
    registrarBoleto.registrar(boletoModel);




















    response.json(model);
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
