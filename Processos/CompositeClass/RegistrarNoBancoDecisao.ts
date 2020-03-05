import RegistrarBoletoInterface from "./RegistrarBoletoInterface";
import RegistrarBoletoModel from "../RegistrarBoleto/bag/RegistrarBoletoModel";

    class RegistrarNoBancoDecisao implements RegistrarBoletoInterface{

        private process:{[index:string]:RegistrarBoletoInterface[]} = {}

        constructor(process:{[index:string]:RegistrarBoletoInterface[]} = {}) {
            this.process = process;
        }

        public execute(model:RegistrarBoletoModel){

            let processos = this.process.itau;

            if(Math.round(Math.random()) === 1){
                processos = this.process.santander;
            }

            processos.forEach((process) =>process.execute(model));
        }
    }

    export default RegistrarNoBancoDecisao;
