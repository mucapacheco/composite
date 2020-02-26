import IRun from "./IRun";

abstract class DecisionRun<T> implements IRun<T>{

    protected children:{[index:string]:IRun<T>[]} = {};

    constructor(children:{[index:string]:IRun<T>[]} = {}) {
        this.children = children;
    }

    getChildren() {
        return this.children;
    }

    run(bag: T) {
        bag["log"].process();
        let array = Object.keys(this.children);
        const randomElement = array[Math.floor(Math.random() * array.length)];
        let children:IRun<T>[] = this.children[randomElement];
        bag["log"].process(randomElement);
        children.forEach((item) =>item.run(bag));
    }

}

export default DecisionRun;
