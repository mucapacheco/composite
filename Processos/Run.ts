import IRun from "./IRun";

class Run<T> implements IRun<T>{
    protected children:IRun<T>[] = [];

    constructor(children: IRun<T>[] = []) {
        this.children = children;
    }

    public run(bag : T){
        bag["log"].process();
        this.children.forEach(run => run.run(bag));
    }

    public getChildren() {
        return this.children;
    }
}

export default Run;