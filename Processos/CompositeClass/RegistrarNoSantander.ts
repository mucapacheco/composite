import RegistrarBoletoInterface from "./RegistrarBoletoInterface";
import RegistrarBoletoModel from "../RegistrarBoleto/bag/RegistrarBoletoModel";

class RegistrarNoSantander implements RegistrarBoletoInterface{

    private process:{[index:string]:RegistrarBoletoInterface[]} = {}

    constructor(process:{[index:string]:RegistrarBoletoInterface[]} = {}) {
        this.process = process;
    }

    public execute(model:RegistrarBoletoModel){

        let array = Object.keys(this.process);
        const randomElement = array[Math.floor(Math.random() * array.length)];
        let processos = this.process[randomElement];

        processos.forEach((process) =>process.execute(model));
    }
}

export default RegistrarNoSantander;
