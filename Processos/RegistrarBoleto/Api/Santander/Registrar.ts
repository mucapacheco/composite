import Run from "../../../Run";
import RegistrarBoletoModel from "../../bag/RegistrarBoletoModel";
import DecisionRun from "../../../DecisionRun";
import IRun from "../../../IRun";

class RegistrarSantander extends DecisionRun<RegistrarBoletoModel>{

    run(bag: RegistrarBoletoModel) {
        bag.log.push(this.constructor.name);

        let ser = "pessoafisica";
        if(Math.round(Math.random() *10) % 2){
            ser = "pessoajuridica";
        }

        let children:IRun<RegistrarBoletoModel>[] = this.children[ser];
        bag.log.push(ser);

        children.forEach((item) =>item.run(bag));
    }
}


export default RegistrarSantander;