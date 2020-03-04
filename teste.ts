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
    const model = new RegistrarBoletoModel();

    try {
        const registrarBoleto = new RegistrarBoleto();
        registrarBoleto.addProcess((bag)=>(new ValidarEntradaDeDados()).validar(bag));
        registrarBoleto.addProcess((bag)=>(new BuscarDadosDoRepositorio()).buscar(bag));
        registrarBoleto.addProcess((bag)=>(new RegistrarNoBanco()).registrar(bag));
        registrarBoleto.addProcess((bag)=>(new EnviarBoletoParaOUsuario()).enviar(bag));
        registrarBoleto.execute(model);
    }catch (e) {
        result.success = false;
    }

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
server.listen(4200);
