import Run from "./Run";
import RegistrarBoletoModel from "./RegistrarBoleto/bag/RegistrarBoletoModel";
import IRun from "./IRun";

abstract class DecisionRun<T> implements IRun<T>{

    protected children:{[index:string]:IRun<T>[]} = {};

    constructor(children:{[index:string]:IRun<T>[]} = {}) {
        this.children = children;
    }

    getChildren() {
        return this.children;
    }

    abstract run(bag: T);

}

export default DecisionRun;