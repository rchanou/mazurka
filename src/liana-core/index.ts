import { types } from "mobx-state-tree";

const global = "g";

const access = ".";

const add = "+";
const subtract = "-";
const multiply = "*";
const divide = "/";
const mod = "%";

const ifOp = "?";
const switchOp = "s";
const forOp = "f";
const importOp = "m";
const newOp = "n";
const typeofOp = "t";
const instanceOfOp = "i";
const classOp = "c";
const thisOp = "h";

const lessThan = "<";
const greaterThan = ">";
const lessThanOrEqual = "<=";
const greaterThanOrEqual = ">=";
const equal = "==";
const strictEqual = "===";
const notEqual = "!=";
const notStrictEqual = "!==";

const swap = "@";

const Primitive = types.union(types.string, types.number, types.boolean);

const Op = types.enumeration("Op", [
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
]);

const Input = types.model("Input", { id: types.identifier(types.number) });

// const Node = types.model("Node", {
//   value: types.union(Primitive, Op, Input)
// });

const Node = types.union(Primitive, Op, Input);

const Link = types.model("Link", {
  id: types.identifier(types.number),
  from: types.array(Node)
});

export const Macro = types.model("Macro", {
  id: types.identifier(types.number),
  nodes: types.array(Link)
});
