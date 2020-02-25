class LogRegistrarBoleto{

    private log = {};
    private processos = [];

    public push(msg){
        let service = this.process();
        this.log[service].push(msg);
    }

    public getProcessName() {
        let re = /at (.+)\.run/;
        let aRegexResult = re.exec(new Error().stack);
        return  (aRegexResult && aRegexResult[1]) || 'global';
    }

    public addProcess(txt){
        this.processos.push(txt);
    }

    public process(txt = null){
        if(txt){
            this.addProcess(txt);
            return txt;
        }

        let service = this.getProcessName();

        if(!this.log[service]){
            this.addProcess(service);
            this.log[service] = [];
        }

        return service;
    }

}

export default LogRegistrarBoleto;