import Run from "../../Run";
import RegistrarBoletoModel from "../bag/RegistrarBoletoModel";

class ValidarDevedor extends Run<RegistrarBoletoModel>{


    run(bag: RegistrarBoletoModel) {

        bag.log.push("O devedor é uma pessoa jurídica");

        super.run(bag);
    }
}

export default ValidarDevedor;