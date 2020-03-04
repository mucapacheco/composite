class RegistrarBoleto{

    private process = []

    public execute(bag){
        this.process.forEach((process) =>process());
    }

    public addProcess(processo){
        this.process.push(processo);
    }

}

export default RegistrarBoleto;
