import RegistrarBoletoInterface from "./RegistrarBoletoInterface";
import RegistrarBoletoModel from "../RegistrarBoleto/bag/RegistrarBoletoModel";

    class BuscarDadosDoRepositorio implements RegistrarBoletoInterface{

        private process:RegistrarBoletoInterface[] = []

        constructor(process: RegistrarBoletoInterface[] = []) {
            this.process = process;
        }

        public execute(model:RegistrarBoletoModel){
            this.process.forEach((process) =>process.execute(model));
        }

        public add(process:RegistrarBoletoInterface){
            this.process.push(process);
        }

    }

    export default BuscarDadosDoRepositorio;
