

    import RegistrarBoletoModel from "../RegistrarBoleto/bag/RegistrarBoletoModel";
    import RegistrarBoletoInterface from "./RegistrarBoletoInterface";

    class RegistrarBoleto implements RegistrarBoletoInterface{

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

    export default RegistrarBoleto;






