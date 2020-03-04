import IRun from "./IRun";

class ExtractTree{

    static get<T>(father: IRun<T>){
        let children = father.getChildren();

        let name = father.constructor.name;
        if(father['name']){
            name = father['name']
        }

        let result   = {
            name,
            children:[]
        };
        if(Array.isArray(children)){
            result.children = children.map((item) => {
                return ExtractTree.get(item)
            });
            result['type'] = "horizontal";
        }else if(typeof children === 'object'){
            result.children = Object.keys(children).map((name) => {
                let c = children[name].map((item) => {
                    return ExtractTree.get(item)
                });

                return {
                    type:"horizontal",
                    name,
                    children:c
                }
            });
            result['type'] = "vertical";
        }

        return result;
    }
}

export default ExtractTree;
