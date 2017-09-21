import { types, getEnv, getChildType, getType, process } from "mobx-state-tree";
import * as _ from "lodash";

const { curry } = _;

export const lodash = "_";

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
  },
  [add](...nums) {
    let sum = 0;
    for (const num of nums) {
      sum += num;
    }
    return sum;
  },
  [array](...items) {
    return items;
  },
  [lodash]() {
    return _;
  },
  ifOp(condition, trueVal, falseVal) {
    return condition ? trueVal : falseVal;
  },
  switchOp(context, switcher, ...casePairs) {
    for (let i = 0; i < casePairs.length; i += 2) {
      if (switcher === casePairs[i]) {
        return casePairs[i + 1](context);
      }
    }
  }
};

export const Val = types
  .model("Val", {
    val: types.union(types.string, types.number, types.boolean, types.null)
  })
  .views(self => ({
    with() {
      return self.val;
    }
  }));

export const Op = types
  .model("Op", {
    op: types.enumeration("OpEnum", [
      lodash,
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
    },
    with() {
      return self.val;
    }
  }));

export const Package = types
  .model("Package", {
    id: types.identifier(types.number),
    path: types.string,
    resolved: false
  })
  .actions(self => {
    const { system } = getEnv(self);

    return {
      afterCreate: process(function*() {
        yield system.import(self.path);
        // TODO: error handling (retry?)
        self.resolved = true;
      })
    };
  })
  .views(self => {
    const { system } = getEnv(self);

    return {
      get val() {
        if (self.resolved) {
          return system.get(self.path);
        }
        return Package;
      },
      with() {
        return self.val;
      }
    };
  });

export const PackageRef = types
  .model("PackageRef", {
    pkg: types.reference(Package)
  })
  .views(self => ({
    get val() {
      return self.pkg.val;
    },
    with() {
      return self.val;
    }
  }));

export const Input = types
  .model("Input", {
    in: types.string
  })
  .views(self => ({
    get val() {
      return Input;
    },
    with() {
      return self.val;
    }
  }));

curry.placeholder = Input;

export const Param = types
  .model("Param", {
    param: types.identifier(types.string)
  })
  .views(self => ({
    with(params) {
      // debugger;
      return params.get(self.param).val;
    }
  }));

export const Node = types.union(Val, Op, Input, Param, types.late(() => LinkRef), types.late(() => SubRef), PackageRef);

const identity = x => x;

export const Link = types
  .model("Link", {
    id: types.identifier(types.string),
    link: types.array(Node)
  })
  .views(self => {
    return {
      get val() {
        const nodeVals = self.link.map(node => node.val);
        if (nodeVals.indexOf(Package) !== -1) {
          return Package;
        }

        const [head, ...params] = nodeVals;
        if (typeof head === "function") {
          const inputs = params.filter(param => param === Input);
          if (inputs.length) {
            const curried = curry(head, params.length);
            return _.ary(curried(...params), inputs.length);
          }
          return head(...params);
        } else {
          return head;
        }
      },
      with(params) {
        // const nodeTypes = self.link.map(getType);
        // if (nodeTypes.indexOf(Param) !== -1) {
        //   console.log("dat type doe");

        // }

        const nodeVals = self.link.map(node => node.with(params));

        if (nodeVals.indexOf(Package) !== -1) {
          return Package;
        }

        const [head, ...nodeParams] = nodeVals;
        if (typeof head === "function") {
          const inputs = nodeParams.filter(param => param === Input);
          if (inputs.length) {
            const curried = curry(head, nodeParams.length);
            return _.ary(curried(...nodeParams), inputs.length);
          }
          return head(...nodeParams);
        } else {
          return head;
        }
      }
    };
  });

export const LinkRef = types.model("LinkRef", { ref: types.reference(Link) }).views(self => ({
  get val() {
    return self.ref.val;
  },
  with() {
    return self.val;
  }
}));

export const Call = types
  .model("Call", {
    id: types.identifier(types.string),
    link: types.reference(Link),
    params: types.map(types.reference(Link))
  })
  .views(self => ({
    get val() {
      const linkVal = self.link.with(self.params);
      // TODO: handle case of not all params fulfilled
      return linkVal;
    },
    with() {
      return self.val;
    }
  }));

export const SubParam = types
  .model("SubInput", {
    param: types.number
  })
  .views(self => ({
    get val() {
      return self.param;
    },
    with() {
      return self.val;
    }
  }));

export const SubLink = types
  .model("SubLink", {
    subLink: types.number
  })
  .views(self => ({
    get val() {
      return self.subLink;
    },
    with() {
      return self.val;
    }
  }));

export const SubNode = types.union(Val, Op, Input, LinkRef, SubParam, SubLink, types.late(() => SubRef));

export const Sub = types
  .model("Sub", {
    id: types.identifier(types.string),
    sub: types.map(types.array(SubNode))
  })
  .views(self => ({
    get val() {
      return self;
    },
    with() {
      return self.val;
    }
  }));

export const SubRef = types
  .model("SubRef", {
    subRef: types.reference(Sub)
  })
  .views(self => ({
    get val() {
      return self.subRef;
    },
    with() {
      return self.val;
    }
  }));

export const Graph = types
  .model("Graph", {
    packages: types.optional(types.map(Package), {}),
    links: types.optional(types.map(Link), {}),
    calls: types.optional(types.map(Call), {}),
    subs: types.optional(types.map(Sub), {})
  })
  .actions(self => {
    return {
      expandSub(subId, baseId, ...params) {
        const { sub } = self.subs.get(subId);
        const { links } = self;

        let inputCounter = 0;
        sub.forEach((subLink, i) => {
          const link = subLink.map(node => {
            const nodeType = getType(node);
            const { val } = node;
            switch (nodeType) {
              case SubParam:
                return params[val];
              case SubLink:
                return { ref: `${baseId}-${val}` };
              case LinkRef:
                const retVal = { ref: node.ref.id };
                return retVal;
              default:
                return val;
            }
          });

          links.put({ id: `${baseId}-${i}`, link });
        });
      }
    };
  });

export const GraphView = types
  .model("GraphView", {
    graph: Graph
  })
  .actions(self => {
    const evaluate = linkId => {
      const link = self.graph.links.get(linkId);
    };

    return {
      evaluate
    };
  });
