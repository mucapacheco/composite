import * as restify from "restify";
import RegistrarBoletoModel from "./Processos/RegistrarBoleto/bag/RegistrarBoletoModel";
import RegistrarBoleto from "./Processos/PipelineClass/RegistrarBoleto";
import ValidarEntradaDeDados from "./Processos/PipelineClass/ValidarEntradaDeDados";
import BuscarDadosDoRepositorio from "./Processos/PipelineClass/BuscarDadosDoRepositorio";
import RegistrarNoBanco from "./Processos/PipelineClass/RegistrarNoBanco";
import EnviarBoletoParaOUsuario from "./Processos/PipelineClass/EnviarBoletoParaOUsuario";



const server = restify.createServer({
    name:'RegistrarBanco',
    version:'1.0',
});


server.get('/',(request,response,next)=>{


    const boletoModel = new RegistrarBoletoModel();

    {
        const registrarBoleto = new RegistrarBoleto([
            new ValidarEntradaDeDados(),
            new BuscarDadosDoRepositorio(),
            new RegistrarNoBanco(),
            new EnviarBoletoParaOUsuario(),
        ]);
        registrarBoleto.execute(boletoModel);
    }





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
