import { types } from "mobx-state-tree";

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

const Primitive = types.union(types.string, types.number, types.boolean);

export const Op = types.model("Op", {
  value: types.enumeration("Op", [
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
  id: types.identifier(types.number)
});

export const Node = types.union(Primitive, Op, Input);

export const Link = types.union(types.array(Node));

export const Macro = types.map(Link);

export const Graph = types.map(types.union(Link, Macro));
