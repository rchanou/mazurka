import { types, getEnv, getType } from "mobx-state-tree";

export const global = "g";

export const access = ".";

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

const Primitive = types.union(
  types.string,
  types.number,
  types.boolean,
  types.null,
  types.undefined
);

export const Op = types.model("Op", {
  do: types.enumeration("Op", [
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
});

export const Input = types.model("Input", {
  key: types.number
});

export const Node = types.union(
  Primitive,
  Op,
  Input,
  types.late(() => LinkRef)
);

export const Link = types
  .model("Link", {
    id: types.identifier(types.string),
    link: types.refinement(types.array(Node), value => value.length <= 3)
  })
  .views(self => {
    const cache = getEnv(self).cache || {};

    return {
      get value() {
        return 1;
      }
    };
  });

export const LinkRef = types.model("LinkRef", { ref: types.reference(Link) });

export const Macro = types
  .model("Macro", {
    id: types.identifier(types.string),
    macro: types.map(types.array(types.union(Primitive, Op, Input, LinkRef)))
  })
  .actions(self => {
    const cache = getEnv(self).cache || {};

    return {
      expand(...inputIds: string[]) {
        return 1;
      }
    };
  });

export const Graph = types.model("Graph", {
  links: types.map(Link),
  macros: types.map(Macro)
});

export const GraphView = types
  .model("GraphView", {
    graph: Graph
  })
  .actions(self => {
    const cache = getEnv(self).cache || {}; // move to afterCreate hook?

    const evaluate = (linkId: string) => {
      const link = self.graph.links.get(linkId);
    };

    return {
      evaluate
    };
  });
