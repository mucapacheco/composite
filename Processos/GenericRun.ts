import Run from "./Run";
import IRun from "./IRun";

class GenericRun<T> extends Run<T>{

    name = "";

    constructor(Name,children: IRun<T>[] = []) {
        super(children);
        this.name = Name;
        this.children = children;
    }

    public run(bag : T){
        bag["log"].process(this.name);
        this.children.forEach(run => run.run(bag));
    }

}

export default GenericRun;
