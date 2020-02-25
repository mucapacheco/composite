"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExtractTree {
    static get(father) {
        let children = father.getChildren();
        let result = {
            name: father.constructor.name,
            children: []
        };
        if (Array.isArray(children)) {
            result.children = children.map((item) => {
                return ExtractTree.get(item);
            });
            result['type'] = "horizontal";
        }
        else if (typeof children === 'object') {
            result.children = Object.keys(children).map((name) => {
                let c = children[name].map((item) => {
                    return ExtractTree.get(item);
                });
                return {
                    type: "horizontal",
                    name,
                    children: c
                };
            });
            result['type'] = "vertical";
        }
        return result;
    }
}
exports.default = ExtractTree;
