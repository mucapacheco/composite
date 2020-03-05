
    class RegistrarBoleto{

        private process = []

        public registrar(model){
            this.process.forEach((process) =>process(model));
        }

        public add(process){
            this.process.push(process);
        }

    }

    export default RegistrarBoleto;
