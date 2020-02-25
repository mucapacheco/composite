import Run from "../Run";
import RegistrarBoletoModel from "./bag/RegistrarBoletoModel";
import IRun from "../IRun";
import DecisionRun from "../DecisionRun";

class RegistrarBoleto extends DecisionRun<RegistrarBoletoModel>{

    run(bag: RegistrarBoletoModel) {
        bag.log.push(this.constructor.name);
        let ser = "itau";
        if(Math.round(Math.random() *10) % 2){
            ser = "santander";
        }

        let children:IRun<RegistrarBoletoModel>[] = this.children[ser];

        bag.log.push(ser);

        children.forEach((item) =>item.run(bag));
    }
}

export default RegistrarBoleto;