interface IRun<T>{
    run(bag : T);
    getChildren();
}

export default IRun;