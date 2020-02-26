import Run from "../../Run";
import RegistrarBoletoModel from "../bag/RegistrarBoletoModel";

class ValidarTelefone extends Run<RegistrarBoletoModel>{


    run(bag: RegistrarBoletoModel) {
        if(Math.random()*10 > 5){
            bag.log.push("Telefone inválido");
            throw new Error('Telefone inválido');
        }

        super.run(bag);
    }
}

export default ValidarTelefone;
