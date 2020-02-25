import Run from "../../Run";
import RegistrarBoletoModel from "../bag/RegistrarBoletoModel";

class ValidarEmail extends Run<RegistrarBoletoModel>{

    run(bag: RegistrarBoletoModel) {

        bag.log.push("Email: mucapacheco@hotmail.com");

        super.run(bag);
    }
}

export default ValidarEmail;