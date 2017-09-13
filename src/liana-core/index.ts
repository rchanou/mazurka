import { types } from "mobx-state-tree";

// export const parse = (prog, pragma = '/') => {
//   const parsed = {};

//   for (const key in prog) {
//     parsed[key] = prog[key].map(s => (typeof s === 'string' && s.startsWith(pragma) ? [B, s.slice(1)] : s));
//   }

//   return parsed;
// };

// const Op = types.enumeration(['global', 'input', 'pipe', 'merge', 'group', 'push', '']);

// const Token = types.union();

const ADD = "ADD";
const REMOVE = "REMOVE";
const MARK = "MARK";
const INSTANCE = "INSTANCE";
const BRANCH = "BRANCH";
const FORK = "FORK";

const Input = types.model(types.identifier(types.number));

const Node = types.union(Input);

const Label = types.reference(Node);

const Action = types.enumeration([ADD, REMOVE, MARK, INSTANCE, BRANCH, FORK]);

const Commit = types.array(Action);

const commitSchema = {
  id: types.identifier(types.number),
  title: types.string,
  description: types.string
};

export const Add = types.model("Add", commitSchema);
export const Copy = types.model("Copy", commitSchema);

// console.log(Label, Commit, test);
