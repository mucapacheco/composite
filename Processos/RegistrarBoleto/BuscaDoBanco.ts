import Run from "../Run";
import RegistrarBoletoModel from "./bag/RegistrarBoletoModel";

class BuscaDoBanco extends Run<RegistrarBoletoModel>{

    run(bag: RegistrarBoletoModel) {
        super.run(bag);
    }
}

export default BuscaDoBanco;