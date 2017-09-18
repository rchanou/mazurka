import { types, getEnv, getChildType, getType } from "mobx-state-tree";
const curry = require("lodash.curry");

export const global = "g";

export const access = ".";

export const array = "[";
export const object = "{";

export const add = "+";
export const subtract = "-";
export const multiply = "*";
export const divide = "/";
export const mod = "%";

export const ifOp = "?";
export const switchOp = "s";
export const forOp = "f";
export const importOp = "m";
export const newOp = "n";
export const typeofOp = "t";
export const instanceOfOp = "i";
export const classOp = "c";
export const thisOp = "h";

export const lessThan = "<";
export const greaterThan = ">";
export const lessThanOrEqual = "<=";
export const greaterThanOrEqual = ">=";
export const equal = "==";
export const strictEqual = "===";
export const notEqual = "!=";
export const notStrictEqual = "!==";

export const swap = "@";

const opFuncs = {
  [global](val) {
    return window[val];
    // return eval(val);
  },
  [access](obj, key) {
    return obj[key];
  }
};

export const Val = types.model("Val", {
  val: types.union(types.string, types.number, types.boolean, types.null)
});

export const Op = types
  .model("Op", {
    op: types.enumeration("OpEnum", [
      global,
      access,
      array,
      object,
      add,
      subtract,
      multiply,
      divide,
      mod,
      ifOp,
      switchOp,
      forOp,
      importOp,
      newOp,
      typeofOp,
      instanceOfOp,
      classOp,
      thisOp,
      lessThan,
      greaterThan,
      lessThanOrEqual,
      greaterThanOrEqual,
      equal,
      strictEqual,
      notEqual,
      notStrictEqual,
      swap
    ])
  })
  .views(self => ({
    get val() {
      return opFuncs[self.op];
    }
  }));

export const Input = types
  .model("Input", {
    id: types.identifier(types.number)
  })
  .views(self => ({
    get val() {
      return Input;
    }
  }));

curry.placeholder = Input;

export const Node = types.union(
  // Primitive,
  Val,
  Op,
  Input,
  types.late(() => LinkRef),
  types.late(() => SubRef)
);

export const Link = types
  .model("Link", {
    id: types.identifier(types.string),
    link: types.array(Node)
  })
  .views(self => {
    // const env = getEnv(self) || {};

    return {
      get val() {
        const nodeVals = self.link.map(node => node.val);

        const [head, ...params] = nodeVals;
        if (typeof head === "function") {
          if (params.some(param => param === Input)) {
            const curried = curry(head, params.length);
            return curried(...params);
          }

          return head(...params);
        } else {
          return head;
        }
      }
    };
  });

export const LinkRef = types
  .model("LinkRef", { ref: types.reference(Link) })
  .views(self => ({
    get val() {
      return self.ref.val;
    }
  }));

export const SubInput = types.model("SubInput", {
  subInput: types.number
});

export const SubLink = types.model("SubLink", {
  subLink: types.number
});

export const SubNode = types.union(
  // Primitive,
  Val,
  Op,
  Input,
  LinkRef,
  SubInput,
  SubLink,
  types.late(() => SubRef)
);

export const Sub = types
  .model("Sub", {
    id: types.identifier(types.string),
    sub: types.map(types.array(SubNode))
  })
  .views(self => ({
    with(...nodes: any[]) {
      return;
    }
  }));

export const SubRef = types.model("SubRef", {
  subRef: types.reference(Sub)
});

export const Graph = types
  .model("Graph", {
    links: types.map(Link),
    subs: types.map(Sub)
  })
  .actions(self => {
    return {
      expandSub(subId: string, ...params: any[]) {
        const sub = self.subs.get(subId);
        params.forEach(param => {});
      }
    };
  });

export const GraphView = types
  .model("GraphView", {
    graph: Graph
  })
  .actions(self => {
    const evaluate = (linkId: string) => {
      const link = self.graph.links.get(linkId);
    };

    return {
      evaluate
    };
  });
